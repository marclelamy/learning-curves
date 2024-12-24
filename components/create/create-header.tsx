import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function CreateHeader() {
    const router = useRouter()
    
    return (
        <div className="flex justify-between items-center mb-8 border-4 border-foreground p-4">
            <h1 className="text-3xl font-mono font-bold tracking-tight uppercase">Create Learning Curve</h1>
            <Button 
                variant="outline"
                onClick={() => router.push("/")}
                className="border-4 border-foreground hover:bg-foreground hover:text-background font-mono uppercase"
            >
                Cancel
            </Button>
        </div>
    )
} 