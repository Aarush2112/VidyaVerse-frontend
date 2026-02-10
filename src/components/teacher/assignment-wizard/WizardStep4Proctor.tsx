"use client"

import { useWizard } from "./context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShieldAlert } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export function WizardStep4Proctor() {
    const { form } = useWizard()

    const toggleStrict = (key: "blockCopyPaste" | "forceFullscreen" | "preventTabSwitch", val: boolean) => {
        form.setValue(`strictMode.${key}`, val)
    }

    const strictMode = form.watch("strictMode") || {}

    return (
        <Card className="bg-red-950/10 border-red-900/30 animate-in fade-in slide-in-from-right-4 duration-500">
            <CardHeader>
                <CardTitle className="text-red-100 flex items-center">
                    <ShieldAlert className="mr-2 h-5 w-5 text-red-500" /> Proctoring & Security
                </CardTitle>
                <CardDescription className="text-red-400/60">Configure anti-cheat measures.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-black/40 rounded border border-red-900/20">
                        <Label className="text-slate-300">Block Copy/Paste</Label>
                        <Switch
                            checked={strictMode.blockCopyPaste}
                            onCheckedChange={(c) => toggleStrict("blockCopyPaste", c)}
                            className="data-[state=checked]:bg-red-600"
                        />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-black/40 rounded border border-red-900/20">
                        <Label className="text-slate-300">Force Fullscreen</Label>
                        <Switch
                            checked={strictMode.forceFullscreen}
                            onCheckedChange={(c) => toggleStrict("forceFullscreen", c)}
                            className="data-[state=checked]:bg-red-600"
                        />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-black/40 rounded border border-red-900/20">
                        <Label className="text-slate-300">Prevent Tab Switching</Label>
                        <Switch
                            checked={strictMode.preventTabSwitch}
                            onCheckedChange={(c) => toggleStrict("preventTabSwitch", c)}
                            className="data-[state=checked]:bg-red-600"
                        />
                    </div>

                    {strictMode.preventTabSwitch && (
                        <div className="flex items-center justify-between p-3 bg-red-950/30 rounded border border-red-900/40 animate-in fade-in">
                            <div className="space-y-1">
                                <Label className="text-red-200">Auto-Submit Tolerance</Label>
                                <p className="text-xs text-red-400">Max tab switches before auto-terminate.</p>
                            </div>
                            <Input
                                type="number"
                                {...form.register("strictMode.maxTabSwitches")}
                                className="w-20 bg-black/40 border-red-900/50 text-red-100"
                                placeholder="3"
                            />
                        </div>
                    )}
                </div>

            </CardContent>
        </Card>
    )
}
