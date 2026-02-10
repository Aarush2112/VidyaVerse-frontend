"use client"

import { useWizard } from "./context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Trophy, AlertTriangle } from "lucide-react"

export function WizardStep3Contest() {
    const { form } = useWizard()
    const mode = form.watch("mode")
    const liveRanking = form.watch("liveRanking")

    if (mode !== "CONTEST") return null

    return (
        <Card className="bg-amber-950/10 border-amber-900/30 animate-in fade-in slide-in-from-right-4 duration-500">
            <CardHeader>
                <CardTitle className="text-amber-100 flex items-center">
                    <Trophy className="mr-2 h-5 w-5 text-amber-500" /> Contest Specifics
                </CardTitle>
                <CardDescription className="text-amber-400/60">Configure the competitive environment.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">

                <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-amber-900/20">
                    <div className="space-y-1">
                        <Label className="text-amber-100 font-medium text-lg">Live Leaderboard</Label>
                        <p className="text-sm text-amber-400/60">
                            Students can see their rank update in real-time via WebSockets.
                        </p>
                    </div>
                    <Switch
                        checked={liveRanking}
                        onCheckedChange={(checked) => form.setValue("liveRanking", checked)}
                        className="data-[state=checked]:bg-amber-600"
                    />
                </div>

                {liveRanking && (
                    <div className="p-4 bg-black/20 rounded-lg border border-amber-900/20 animate-in slide-in-from-top-2">
                        <div className="flex items-center gap-4">
                            <div className="flex-1 space-y-1">
                                <Label className="text-amber-200">Freeze Leaderboard (Minutes before end)</Label>
                                <p className="text-xs text-amber-400/60">Stop updates near the end to build suspense.</p>
                            </div>
                            <Input
                                type="number"
                                {...form.register("freezeLeaderboard")}
                                className="w-24 bg-black/40 border-amber-900/30 text-amber-100"
                                placeholder="e.g. 15"
                            />
                        </div>
                    </div>
                )}

                <div className="flex gap-4 p-4 bg-amber-900/10 rounded border border-amber-900/30 text-amber-200 text-sm items-start">
                    <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />
                    <div>
                        <strong>Contest Rules:</strong> By default, contests use ACM/ICPC style scoring (Points - Time Penalties).
                        Students are ranked primarily by problems solved, then by entry time.
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}
