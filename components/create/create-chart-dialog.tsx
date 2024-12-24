"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { BrutalChart } from "@/components/charts/line-chart"
import { COLORS } from "@/lib/utils/colors"

const formSchema = z.object({
    title: z.string().min(2).max(50),
    category: z.string(),
    description: z.string().min(10).max(500),
    difficulty: z.string(),
    timeToMaster: z.number().min(1).max(1000),
    themeId: z.number()
})

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

export function CreateChartDialog() {
    const [previewData, setPreviewData] = useState(() => 
        Array.from({ length: 10 }, (_, i) => ({
            t: i,
            p: Math.pow(i, 1.5) * 8 + Math.random() * 5,
            ci: Math.random() * 10
        }))
    )

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            category: "Coding",
            description: "",
            difficulty: "Beginner Friendly",
            timeToMaster: 30,
            themeId: 0
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // TODO: Submit to backend
        console.log(values)
    }

    const selectedTheme = COLORS[form.watch("themeId")]
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button 
                    variant="outline"
                    className="border-2 border-primary"
                >
                    Create Learning Curve
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Create New Learning Curve</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Learning Python" {...field} />
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
                                        <FormLabel>Category</FormLabel>
                                        <Select 
                                            onValueChange={field.onChange} 
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories.map(category => (
                                                    <SelectItem 
                                                        key={category} 
                                                        value={category}
                                                    >
                                                        {category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="Describe the learning journey..." 
                                                {...field} 
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="difficulty"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Difficulty Level</FormLabel>
                                        <Select 
                                            onValueChange={field.onChange} 
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select difficulty" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {difficulties.map(difficulty => (
                                                    <SelectItem 
                                                        key={difficulty} 
                                                        value={difficulty}
                                                    >
                                                        {difficulty}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="timeToMaster"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Time to Master (days)</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="number" 
                                                {...field} 
                                                onChange={e => field.onChange(+e.target.value)}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Estimated days to reach mastery
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="themeId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Chart Theme</FormLabel>
                                        <Select 
                                            onValueChange={v => field.onChange(+v)} 
                                            defaultValue={field.value.toString()}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a theme" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {COLORS.map((_, index) => (
                                                    <SelectItem 
                                                        key={index} 
                                                        value={index.toString()}
                                                    >
                                                        Theme {index + 1}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit">Create Learning Curve</Button>
                        </form>
                    </Form>

                    <div className="border rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-4">Preview</h3>
                        <BrutalChart
                            variant={{
                                id: "preview",
                                title: form.watch("title") || "Your Learning Curve",
                                style: {
                                    ...selectedTheme,
                                    opacity: 0.3
                                }
                            }}
                            data={previewData}
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
} 