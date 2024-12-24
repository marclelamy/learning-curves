"use client"

import { Card } from "@/components/ui/card"

interface TooltipProps {
    active?: boolean
    payload?: Array<{
        value: number
        dataKey: string
    }>
    label?: string
    style: {
        bg: string
        text: string
        border: string
    }
    mode?: "raw" | "function" | "random"
}

export function ChartTooltip({ active, payload, label, style, mode }: TooltipProps) {
    if (!active || !payload) return null

    const progress = payload.find(p => p.dataKey === "p")?.value || 0
    let tooltipContent = ""

    switch (mode) {
        case "raw":
            tooltipContent = `Time: ${label}\nProgress: ${progress.toFixed(2)}`
            break
        case "function":
            tooltipContent = `f(${label}) = ${progress.toFixed(2)}`
            break
        case "random":
            tooltipContent = `Step ${label}\nValue: ${progress.toFixed(2)}`
            break
        default:
            tooltipContent = `${label}: ${progress.toFixed(2)}`
    }

    return (
        <Card className={`${style.bg} ${style.text} border-4 ${style.border} p-2 font-mono text-xs whitespace-pre`}>
            {tooltipContent}
        </Card>
    )
} 