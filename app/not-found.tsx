"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function NotFound() {
    const router = useRouter()

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6">
            <h2 className="text-3xl font-bold text-center">
                You're looking at a non-existing chart
            </h2>
            <Button 
                onClick={() => router.push("/")}
                size="lg"
                className="font-semibold"
            >
                Go see some nice charts instead
            </Button>
        </div>
    )
} 