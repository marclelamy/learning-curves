"use client"

import { BrutalChart } from "@/components/charts/line-chart"
import { Card } from "@/components/ui/card"

interface CurvePreviewProps {
    title: string
    theme: {
        bg: string
        text: string
        border: string
        line: string
        grid: string
        opacity: number
    }
    data: Array<{ t: number; p: number; ci: number }>
    mode?: "raw" | "function" | "random"
    createdBy?: string
    description?: string
    category?: string
}

export function CurvePreview({ title, theme, data, mode, ...rest }: CurvePreviewProps) {
    return (
        <Card className="lg:col-span-1 border-4 border-foreground rounded-none">
            <div className="border-b-4 border-foreground p-4">
                <h2 className="text-xl font-mono font-bold uppercase tracking-tight">Preview</h2>
                <div className="text-xs mt-2 font-mono opacity-60">
                    <div>STATUS: [ACTIVE]</div>
                    <div>MODE: PREVIEW</div>
                </div>
            </div>
            <div className="p-4">
                <div className="h-[400px] w-full">
                    <BrutalChart
                        variant={{
                            id: "preview",
                            title: title || "YOUR_LEARNING_CURVE.dat",
                            style: theme,
                            createdBy: rest.createdBy,
                            description: rest.description,
                            category: rest.category
                        }}
                        data={data}
                        mode={mode}
                    />
                </div>
            </div>
        </Card>
    )
} 