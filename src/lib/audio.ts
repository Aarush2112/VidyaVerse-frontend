export function playAlertSound() {
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext
        if (!AudioContext) return

        const ctx = new AudioContext()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.type = "sawtooth"
        osc.frequency.value = 440 // A4
        gain.gain.setValueAtTime(0.1, ctx.currentTime)

        // Siren effect
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.5)
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 1.0)

        osc.start()
        osc.stop(ctx.currentTime + 1.0)
    } catch (e) {
        console.error("Audio play failed", e)
    }
}
