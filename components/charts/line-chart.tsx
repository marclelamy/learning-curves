"use client"

import { useEffect, useState } from "react"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area
} from "recharts"
import { Card } from "@/components/ui/card"
import { ChartTooltip } from "./chart-tooltip"

interface ChartVariant {
    id: string
    title: string
    style: {
        bg: string
        text: string
        border: string
        line: string
        grid: string
        opacity: number
    }
    createdBy?: string
    description?: string
    category?: string
}

interface ChartData {
    t: number
    p: number
    ci: number
}

interface BrutalChartProps {
    variant: ChartVariant
    data: ChartData[]
    mode?: "raw" | "function" | "random"
}

export function BrutalChart({ variant, data, mode }: BrutalChartProps) {
    return (
        <Card 
            className={`border-4 ${variant.style.border} ${variant.style.bg} ${variant.style.text} overflow-hidden`}
        >
            <div className={`border-b-4 ${variant.style.border} p-4`}>
                <div className="uppercase text-xl font-bold tracking-tight">
                    {variant.title}
                </div>
                <div className="text-xs mt-2 opacity-60 space-y-1">
                    {variant.createdBy && <div>CREATED BY: {variant.createdBy}</div>}
                    {variant.description && <div>DESCRIPTION: {variant.description}</div>}
                </div>
            </div>

            <div className="p-4">
                <div className="h-64">
                    <ResponsiveContainer>
                        <LineChart
                            data={data}
                            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        >
                            <CartesianGrid 
                                strokeDasharray="3 3" 
                                stroke={variant.style.grid}
                                strokeWidth={1}
                                opacity={variant.style.opacity}
                            />
                            
                            <XAxis 
                                dataKey="t" 
                                stroke={variant.style.line}
                                tick={{ fill: variant.style.line, fontFamily: "monospace" }}
                            />
                            
                            <YAxis
                                stroke={variant.style.line}
                                tick={{ fill: variant.style.line, fontFamily: "monospace" }}
                            />
                            
                            <Tooltip content={(props) => 
                                <ChartTooltip {...props} style={variant.style} mode={mode} />
                            }/>

                            <Area
                                type="monotone"
                                dataKey="ci"
                                stroke="none"
                                fill={variant.style.line}
                                fillOpacity={0.1}
                            />
                            
                            <Line
                                type="monotone"
                                dataKey="p"
                                stroke={variant.style.line}
                                strokeWidth={3}
                                dot={{
                                    r: 4,
                                    stroke: variant.style.line,
                                    strokeWidth: 2,
                                    fill: variant.style.line === "#000000" ? "#ffffff" : variant.style.bg
                                }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {variant.category && (
                    <div className={`mt-4 pt-4 border-t-4 ${variant.style.border} text-xs opacity-60`}>
                        <div>CATEGORY: {variant.category}</div>
                    </div>
                )}
            </div>
        </Card>
    )
}
