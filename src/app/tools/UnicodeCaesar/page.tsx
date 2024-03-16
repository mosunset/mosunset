"use client";

import PageTitle from "@/components/PageTitle/PageTitle";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import ToolsPath from "../_data/toolsPath";

const Page = () => {
    const tools_path = ToolsPath();
    return (
        <>
            <PageTitle title={tools_path?.title} description={tools_path?.description} />
            <div className="mx-auto max-w-7xl">
                <div>
                    <div className="flex flex-col gap-4">
                        <div className="space-y-2">
                            <Label className="text-sm" htmlFor="caesar-input">
                                Input
                            </Label>
                            <Textarea
                                className="h-[3rem] text-sm"
                                id="caesar-input"
                                placeholder="Enter your text"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm" htmlFor="caesar-shift">
                                Shift
                            </Label>
                            <Input
                                className="text-sm sm:w-2/4 w-full"
                                id="caesar-shift"
                                placeholder="Enter the shift number"
                                type="number"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm" htmlFor="caesar-output">
                                Output
                            </Label>
                            <Textarea
                                className="h-[3remx] text-sm"
                                id="caesar-output"
                                placeholder="Your encoded/decoded text will appear here."
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
