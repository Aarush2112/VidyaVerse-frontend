"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Lightbulb, History, Terminal } from "lucide-react";

const PROBLEM_MARKDOWN = `
# 102. Two Sum

Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.

You may assume that each input would have ***exactly* one solution**, and you may not use the *same* element twice.

You can return the answer in any order.

### Example 1:
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
\`\`\`

### Example 2:
\`\`\`
Input: nums = [3,2,4], target = 6
Output: [1,2]
\`\`\`

### Constraints:
- \`2 <= nums.length <= 104\`
- \`-109 <= nums[i] <= 109\`
- \`-109 <= target <= 109\`
- **Only one valid answer exists.**
`;

export function ProblemContext() {
    return (
        <div className="h-full flex flex-col bg-[#0b0b0b]">
            <Tabs defaultValue="description" className="w-full h-full flex flex-col">
                <div className="px-4 py-2 bg-[#0d0d0d] border-b border-white/5">
                    <TabsList className="bg-transparent h-8 p-0 gap-4">
                        <TabsTrigger
                            value="description"
                            className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:shadow-none text-zinc-500 text-xs font-bold gap-2 p-0 border-b-2 border-transparent data-[state=active]:border-indigo-500 rounded-none transition-none"
                        >
                            <FileText className="h-3.5 w-3.5" /> Description
                        </TabsTrigger>
                        <TabsTrigger
                            value="hints"
                            className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:shadow-none text-zinc-500 text-xs font-bold gap-2 p-0 border-b-2 border-transparent data-[state=active]:border-indigo-500 rounded-none transition-none"
                        >
                            <Lightbulb className="h-3.5 w-3.5" /> Hints
                        </TabsTrigger>
                        <TabsTrigger
                            value="submissions"
                            className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:shadow-none text-zinc-500 text-xs font-bold gap-2 p-0 border-b-2 border-transparent data-[state=active]:border-indigo-500 rounded-none transition-none"
                        >
                            <History className="h-3.5 w-3.5" /> Submissions
                        </TabsTrigger>
                    </TabsList>
                </div>

                <div className="flex-1 min-h-0">
                    <TabsContent value="description" className="h-full m-0">
                        <ScrollArea className="h-full p-6">
                            <article className="prose prose-invert prose-sm max-w-none">
                                <ReactMarkdown
                                    components={{
                                        code({ children }) {
                                            return <code className="bg-white/5 px-1.5 py-0.5 rounded text-indigo-400 font-mono text-[13px]">{children}</code>
                                        },
                                        pre({ children }) {
                                            return <pre className="bg-[#141414] border border-white/5 p-4 rounded-xl my-4">{children}</pre>
                                        },
                                        h1({ children }) {
                                            return <h1 className="text-2xl font-black italic tracking-tight mb-6">{children}</h1>
                                        }
                                    }}
                                >
                                    {PROBLEM_MARKDOWN}
                                </ReactMarkdown>
                            </article>
                        </ScrollArea>
                    </TabsContent>

                    <TabsContent value="hints" className="h-full m-0 p-6">
                        <div className="space-y-4">
                            <div className="p-4 bg-[#141414] border border-white/5 rounded-xl border-l-2 border-l-indigo-500">
                                <p className="text-xs text-zinc-400 leading-relaxed">
                                    A really brute force way would be to search for all possible pairs of numbers but that would be slow.
                                    Can we use a hash map to make it faster?
                                </p>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="submissions" className="h-full m-0 p-6 text-center text-zinc-500 italic text-xs">
                        No previous submissions for this problem.
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
