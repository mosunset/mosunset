"use client";

import PageTitle from "@/components/PageTitle";
import React, { useState } from "react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import ToolsPath from "../_data/toolsPath";
import ToolsAllLink from "@/components/tools/ToolsAllLink";

const Page = () => {
    const tools_path = ToolsPath();
    const [unicodeValue, setUnicodeValue] = useState("");
    const [convertedString, setConvertedString] = useState("");
    const { toast } = useToast();

    const handleUnicodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUnicodeValue(e.target.value);
        setConvertedString(convertUnicodeToString(e.target.value));
    };

    const convertUnicodeToString = (unicodeStr: string) => {
        let str = "";
        const regex = /\\u([\da-fA-F]{1,4})/g;
        unicodeStr.replace(regex, (match, grp) => {
            const charCode = parseInt(grp, 16);
            str += String.fromCodePoint(charCode);
            return match;
        });
        return str;
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(convertedString);
    };

    return (
        <>
            <PageTitle title={tools_path?.title} description={tools_path?.description} />
            <div className="mx-auto max-w-7xl">
                <div className="grid w-full gap-1.5">
                    <Label htmlFor="unicode">Unicode 値を入力 例: \u41\u42\u63\u64 = ABcd</Label>
                    <Textarea
                        placeholder="Unicode 値を入力してください"
                        id="unicode"
                        value={unicodeValue}
                        onChange={handleUnicodeChange}
                    />
                </div>
                <div className="mt-4 grid w-full gap-1.5">
                    <div>
                        <Label htmlFor="converted" className="mr-2">
                            変換された文字列:
                        </Label>
                        <Textarea id="converted" value={convertedString} readOnly />
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
                        className=""
                    >
                        文字列 を クリップボードにコピー
                    </Button>
                </div>
                <ToolsAllLink />
            </div>
        </>
    );
};

export default Page;
