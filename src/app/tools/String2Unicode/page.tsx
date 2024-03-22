"use client";

import PageTitle from "@/components/PageTitle";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import ToolsPath from "../_data/toolsPath";
import ToolsAllLink from "@/components/tools/ToolsAllLink";

const Page = () => {
    const tools_path = ToolsPath();
    const [inputValue, setInputValue] = useState("");
    const [convertedString, setConvertedString] = useState("");
    const { toast } = useToast();

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
        setConvertedString(convertToUnicode(e.target.value));
    };

    const convertToUnicode = (str: string) => {
        let unicodeStr = "";
        for (let i = 0; i < str.length; i++) {
            const charCode = str.codePointAt(i)?.toString(16);
            if (charCode) {
                unicodeStr += "\\u" + charCode;
            }
        }
        return unicodeStr;
    };
    const copyToClipboard = () => {
        navigator.clipboard.writeText(convertedString);
    };

    return (
        <>
            <PageTitle title={tools_path?.title} description={tools_path?.description} />
            <div className="mx-auto max-w-7xl">
                <div className="grid w-full gap-1.5">
                    <Label htmlFor="string">変換したい文字列を入力</Label>
                    <Textarea
                        placeholder="なにか文字列を入力してください"
                        id="string"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mt-4 grid gap-4">
                    <div>
                        <Label htmlFor="unicode">Unicode 値:</Label>
                        <Textarea id="unicode" value={convertToUnicode(inputValue)} readOnly />
                    </div>
                    <Button
                        onClick={() => {
                            copyToClipboard();
                            toast({
                                className:
                                    "bg-[#20b256] text-[#fff1f2] dark:text-[#052e16] font-medium",
                                description: "クリップボードにコピーしました",
                            });
                        }}
                    >
                        Unicode を クリップボードにコピー
                    </Button>
                </div>

                <ToolsAllLink />
            </div>
        </>
    );
};

export default Page;
