"use client";

import PageTitle from "@/components/PageTitle";
import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ToolsPath from "../_data/toolsPath";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import ToolsAllLink from "@/components/tools/ToolsAllLink";

const Page = () => {
    const tools_path = ToolsPath();
    const [plainText, setPlainText] = useState("");
    const [shiftValue, setShiftValue] = useState(1);
    const [cipherText, setCipherText] = useState("");
    const { toast } = useToast();
    useEffect(() => {
        encodeOrDecode();
    }, [plainText, shiftValue]);

    const encodeOrDecode = () => {
        let result = "";
        for (let i = 0; i < plainText.length; i++) {
            const charCode = plainText.charCodeAt(i);
            result += String.fromCharCode(charCode + shiftValue);
        }
        setCipherText(result);
    };
    const copyToClipboard = () => {
        navigator.clipboard.writeText(cipherText);
    };
    return (
        <>
            <PageTitle title={tools_path?.title} description={tools_path?.description} />
            <div className="mx-auto max-w-7xl">
                <div className="grid w-full gap-1.5">
                    <div className="space-y-2">
                        <Label className="text-sm" htmlFor="caesar-input">
                            Input
                        </Label>
                        <Textarea
                            className="h-[4rem] text-sm"
                            id="caesar-input"
                            placeholder="Enter your text"
                            value={plainText}
                            onChange={(e) => setPlainText(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-sm" htmlFor="caesar-shift">
                            Shift
                        </Label>
                        <Input
                            className="w-full text-sm sm:w-2/4"
                            id="caesar-shift"
                            placeholder="Enter the shift number"
                            type="number"
                            value={shiftValue}
                            onChange={(e) => setShiftValue(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="grid space-y-2">
                        <Label className="text-sm" htmlFor="caesar-output">
                            Output
                        </Label>
                        <Textarea
                            className="h-[4rem] text-sm"
                            id="caesar-output"
                            placeholder="Your encoded/decoded text will appear here."
                            readOnly
                            value={cipherText}
                        />
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
                </div>
                <ToolsAllLink />
            </div>
        </>
    );
};

export default Page;
