"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { Shuffle } from "lucide-react"

// Extend the form schema based on the mode
const baseFormSchema = {
    title: z.string().min(2).max(50),
    createdBy: z.string().optional(),
    description: z.string().optional(),
    category: z.string(),
    difficulty: z.string(),
    timeToMaster: z.number().min(1).max(1000),
    themeId: z.number(),
}

const categories = [
    "Sports",
    "Coding", 
    "Languages",
    "Music",
    "Art",
    "Life Skills",
    "Professional Skills",
    "Hobbies"
]

const difficulties = [
    "Beginner Friendly",
    "Intermediate", 
    "Advanced",
    "Expert Level"
]

const rawDataSchema = z.object({
    ...baseFormSchema,
    dataPoints: z.string().min(1), // Format: "x,y\nx,y\nx,y"
})

const functionSchema = z.object({
    ...baseFormSchema,
    function: z.string().min(1),
    xMin: z.number(),
    xMax: z.number(),
    step: z.number().min(0.1),
})

const randomSchema = z.object({
    ...baseFormSchema,
    pointCount: z.number().min(2).max(100),
    noiseLevel: z.number().min(0).max(1),
})

interface LearningCurveFormProps {
    onThemeChange: (themeId: number) => void
    mode: "raw" | "function" | "random"
    onDataChange: (data: Array<{ t: number; p: number; ci: number }>) => void
    onTitleChange: (title: string) => void
    onCreatedByChange: (createdBy: string) => void
    onDescriptionChange: (description: string) => void
    onCategoryChange: (category: string) => void
}

export function LearningCurveForm({ 
    onThemeChange, 
    mode, 
    onDataChange, 
    onTitleChange,
    onCreatedByChange,
    onDescriptionChange,
    onCategoryChange
}: LearningCurveFormProps) {
    const router = useRouter()
    
    const defaultRawData = `0,0
2,10
5,80
15,95
25,85
50,30
60,25
70,40
80,60
90,75
100,80`

    const formSchema = mode === "raw" ? rawDataSchema : 
                      mode === "function" ? functionSchema : 
                      randomSchema

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            category: "Coding",
            description: "",
            difficulty: "Beginner Friendly",
            timeToMaster: 30,
            themeId: 0,
            ...(mode === "raw" ? { dataPoints: defaultRawData } :
               mode === "function" ? { function: "Math.pow(x, 2)", xMin: 0, xMax: 100, step: 1 } :
               { pointCount: 10, noiseLevel: 0.2 })
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        router.push("/")
    }

    // Update preview data when form values change
    const updatePreview = (values: any) => {
        let points: Array<{ t: number; p: number; ci: number }> = []

        if (mode === "raw") {
            points = values.dataPoints.split('\n')
                .map((line, index) => {
                    const [x, y] = line.split(',').map(Number)
                    return { t: x, p: y, ci: 5 }
                })
                .filter(point => !isNaN(point.t) && !isNaN(point.p))
        } else if (mode === "function") {
            const fn = new Function('x', `return ${values.function}`)
            points = Array.from({ length: 50 }, (_, i) => {
                const x = i * 2
                try {
                    return { t: x, p: fn(x), ci: 5 }
                } catch {
                    return { t: x, p: 0, ci: 5 }
                }
            })
        } else if (mode === "random") {
            points = Array.from({ length: values.pointCount }, (_, i) => ({
                t: i * 10, // Step by 10
                p: Math.pow(i, 1.5) * 8 + (Math.random() - 0.5) * values.noiseLevel * 100,
                ci: 5
            }))
        }

        onDataChange(points)
    }

    // Watch form values and update preview
    React.useEffect(() => {
        const subscription = form.watch((value) => {
            updatePreview(value)
            // Always update these values, even if empty
            onTitleChange(value.title || "")
            onCreatedByChange(value.createdBy || "")
            onDescriptionChange(value.description || "")
            onCategoryChange(value.category || "")
        })
        return () => subscription.unsubscribe()
    }, [form.watch, onTitleChange, onCreatedByChange, onDescriptionChange, onCategoryChange, updatePreview])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 font-mono relative">
                <div className="space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto pr-4 pb-20">
                    <div className="space-y-6">
                        <h3 className="text-sm font-mono uppercase opacity-60">Required Fields</h3>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="uppercase text-sm">Title</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="Learning Python" 
                                            {...field} 
                                            className="border-4 border-foreground rounded-none"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="uppercase text-sm">Category</FormLabel>
                                    <Select 
                                        onValueChange={field.onChange} 
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="border-4 border-foreground rounded-none">
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map(category => (
                                                <SelectItem key={category} value={category}>
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="h-px bg-foreground/20 my-6" />
                    
                    <div className="space-y-6">
                        <h3 className="text-sm font-mono uppercase opacity-60">Optional Information</h3>
                        
                        <FormField
                            control={form.control}
                            name="createdBy"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="uppercase text-sm">Created By</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="Your name (optional)" 
                                            {...field} 
                                            className="border-4 border-foreground rounded-none"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="uppercase text-sm">Description</FormLabel>
                                    <FormControl>
                                        <Textarea 
                                            placeholder="Describe your learning curve (optional)"
                                            className="font-mono border-4 border-foreground rounded-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="h-px bg-foreground/20 my-6" />

                    <div className="space-y-6">
                        <h3 className="text-sm font-mono uppercase opacity-60">Curve Configuration</h3>
                        
                        {mode === "raw" && (
                            <FormField
                                control={form.control}
                                name="dataPoints"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-sm">Data Points (x,y pairs)</FormLabel>
                                        <FormControl>
                                            <Textarea 
                                                placeholder="0,0&#10;50,50&#10;100,100"
                                                className="font-mono border-4 border-foreground rounded-none min-h-[200px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Enter one x,y pair per line, separated by comma
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        {mode === "function" && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="function"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="uppercase text-sm">Function (use x variable)</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="Math.pow(x, 2)" 
                                                    {...field}
                                                    className="font-mono border-4 border-foreground rounded-none"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        {mode === "random" && (
                            <>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <FormField
                                            control={form.control}
                                            name="pointCount"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="uppercase text-sm">Number of Points</FormLabel>
                                                    <FormControl>
                                                        <Input 
                                                            type="number"
                                                            {...field}
                                                            className="border-4 border-foreground rounded-none"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="h-[42px] mt-[28px] aspect-square border-4 border-foreground rounded-none hover:bg-foreground hover:text-background"
                                        onClick={() => {
                                            const values = form.getValues()
                                            updatePreview({
                                                ...values,
                                                seed: Math.random()
                                            })
                                        }}
                                    >
                                        <Shuffle className="h-4 w-4" />
                                    </Button>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="noiseLevel"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="uppercase text-sm">Noise Level (0-1)</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type="number"
                                                    step="0.1"
                                                    min="0"
                                                    max="1"
                                                    {...field}
                                                    className="border-4 border-foreground rounded-none"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                    </div>
                </div>

                <div className="sticky bottom-0 pt-6 bg-background">
                    <Button 
                        type="submit" 
                        className="w-full border-4 border-foreground bg-background text-foreground hover:bg-foreground hover:text-background rounded-none font-mono uppercase"
                    >
                        Create Learning Curve
                    </Button>
                </div>
            </form>
        </Form>
    )
} 