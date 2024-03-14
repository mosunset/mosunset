"use client";

import PageTitle from "@/components/PageTitle/PageTitle";
import React, { useState } from "react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ChevronRightIcon } from "@radix-ui/react-icons";

const Page = () => {
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

    const convert = () => {
        const unicode = document.getElementById("unicode");
        console.log(convertUnicodeToString(unicode?.textContent as string))
        setConvertedString(convertUnicodeToString(unicode?.textContent as string));
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(convertedString);
    };

    return (
        <>
            <PageTitle title={"Unicode to String"} />
            <div className="mx-auto max-w-7xl">
                <div>
                    <div className="grid w-full gap-1.5">
                        <Label htmlFor="unicode">Unicode 値を入力 例: \u41\u42\u63\u64 = ABcd</Label>
                        <Textarea
                            placeholder="Unicode 値を入力してください"
                            id="unicode"
                            value={unicodeValue}
                            onChange={handleUnicodeChange}
                        />
                    </div>
                    <div className="mt-4 grid gap-4">
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
                </div>
                <div className="mt-8">
                    <p className="flex items-center">
                        文字列 から Unicodeに変換
                        <ChevronRightIcon />
                        <Link href={"/tools/String2Unicode"} className="text-blue-700 underline">
                            String to Unicode
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Page;
