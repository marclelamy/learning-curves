"use client"

import { useState } from "react"
import { ModeToggle } from "@/components/theme-provider"
import { BrutalChart } from "@/components/charts/line-chart"
import { generateRandomVariant } from "@/lib/utils/colors"
import { Button } from "@/components/ui/button"
import { CreateChartDialog } from "@/components/create/create-chart-dialog"
import { COLORS } from "@/lib/utils/colors"
import Link from "next/link"

// Convert COLORS array to the variant format
const INITIAL_VARIANTS = COLORS.map((colorScheme, index) => ({
    id: `THEME_${index}`,
    title: `SYSTEM_${index}.dat`,
    style: {
        ...colorScheme,
        opacity: 0.3
    }
}))

const generateData = (noise = 5) => Array.from({ length: 10 }, (_, i) => ({
    t: i,
    p: Math.pow(i, 1.5) * 8 + Math.random() * noise,
    ci: Math.random() * 10
}))

export default function Home() {
    const [variants, setVariants] = useState(INITIAL_VARIANTS)

    const addRandomVariant = () => {
        setVariants(prev => [generateRandomVariant(), ...prev])
    }

    return (
        <div className="bg-background min-h-screen p-8 w-full overflow-y-auto h-screen">
            <div className="flex justify-between items-center mb-8 top-8 bg-background z-10">
                <ModeToggle />
                <div className="flex gap-4">
                    <Link href="/create">
                        <Button 
                            variant="outline"
                            className="border-2 border-primary"
                        >
                            Create Learning Curve
                        </Button>
                    </Link>
                    <Button 
                        onClick={addRandomVariant}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                        Generate Random Theme
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 overflow-y-auto">
                {variants.map((variant) => (
                    <BrutalChart 
                        key={variant.id}
                        variant={variant}
                        data={generateData()}
                    />
                ))}
            </div>
        </div>
    )
}
