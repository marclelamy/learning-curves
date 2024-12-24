"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { COLORS } from "@/lib/utils/colors"
import { LearningCurveForm } from "@/components/creation/learning-curve-form"
import { CurvePreview } from "@/components/create/curve-preview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CreatePage() {
    const router = useRouter()
    const [selectedThemeId, setSelectedThemeId] = useState(0)
    const [previewData, setPreviewData] = useState<Array<{ t: number; p: number; ci: number }>>([])
    const [title, setTitle] = useState("")
    const [createdBy, setCreatedBy] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("Coding")
    const selectedTheme = { ...COLORS[selectedThemeId], opacity: 0.3 }
    const [selectedTab, setSelectedTab] = useState("raw")

    return (
        <div className="min-h-screen bg-background p-8">
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <CurvePreview 
                    title={title}
                    theme={selectedTheme}
                    data={previewData}
                    mode={selectedTab}
                    createdBy={createdBy}
                    description={description}
                    category={category}
                />

                <div className="lg:col-span-2 border-4 border-foreground rounded-none">
                    <div className="border-b-4 border-foreground p-4">
                        <h2 className="text-xl font-mono font-bold uppercase tracking-tight">Configuration</h2>
                        <div className="text-xs mt-2 font-mono opacity-60">
                            <div>TYPE: FORM_INPUT</div>
                            <div>MODE: EDIT</div>
                        </div>
                    </div>
                    <div className="p-6">
                        <Tabs 
                            defaultValue="raw" 
                            className="w-full"
                            value={selectedTab}
                            onValueChange={setSelectedTab}
                        >
                            <TabsList className="w-full grid grid-cols-3 border-4 border-foreground rounded-none bg-background mb-6">
                                <TabsTrigger 
                                    value="raw"
                                    className="font-mono data-[state=active]:bg-foreground data-[state=active]:text-background rounded-none"
                                >
                                    Raw Data
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="function"
                                    className="font-mono data-[state=active]:bg-foreground data-[state=active]:text-background rounded-none"
                                >
                                    Function
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="random"
                                    className="font-mono data-[state=active]:bg-foreground data-[state=active]:text-background rounded-none"
                                >
                                    Random
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="raw">
                                <LearningCurveForm 
                                    onThemeChange={setSelectedThemeId}
                                    mode="raw"
                                    onDataChange={setPreviewData}
                                    onTitleChange={setTitle}
                                    onCreatedByChange={setCreatedBy}
                                    onDescriptionChange={setDescription}
                                    onCategoryChange={setCategory}
                                />
                            </TabsContent>
                            <TabsContent value="function">
                                <LearningCurveForm 
                                    onThemeChange={setSelectedThemeId}
                                    mode="function"
                                    onDataChange={setPreviewData}
                                    onTitleChange={setTitle}
                                    onCreatedByChange={setCreatedBy}
                                    onDescriptionChange={setDescription}
                                    onCategoryChange={setCategory}
                                />
                            </TabsContent>
                            <TabsContent value="random">
                                <LearningCurveForm 
                                    onThemeChange={setSelectedThemeId}
                                    mode="random"
                                    onDataChange={setPreviewData}
                                    onTitleChange={setTitle}
                                    onCreatedByChange={setCreatedBy}
                                    onDescriptionChange={setDescription}
                                    onCategoryChange={setCategory}
                                />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}