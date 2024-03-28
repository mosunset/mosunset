"use client";

import PageTitle from "@/components/PageTitle";
import React, { useEffect, useState } from "react";
import ToolsPath from "../_data/toolsPath";
import Image from "next/image";
import bp from "@/components/BasePath";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import ToolsAllLink from "@/components/tools/ToolsAllLink";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Page = () => {
    const tools_path = ToolsPath();
    const [upper, setUpper] = useState<boolean>(true);
    const [lower, setLower] = useState<boolean>(true);
    const [number, setNumber] = useState<boolean>(true);
    const [symbol, setSymbol] = useState<boolean>(true);
    const [useSymbol, setUseSymbol] = useState<string[]>("_-*@.!".split(""));
    const [generations, setGenerations] = useState<number>(5);
    const [texts, setTexts] = useState<number>(15);
    const [passText, setPassText] = useState<string>("");
    const [generatePassText, setGeneratePassText] = useState<string>("");
    const generationsLimit = [1, 200];
    const textsLimit = [1, 200];
    const upperTemplate = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const lowerTemplate = "abcdefghijklmnopqrstuvwxyz".split("");
    const numberTemplate = "0123456789".split("");
    const symbolTemplate = [
        "!",
        '"',
        "#",
        "$",
        "%",
        "&",
        "'",
        "(",
        ")",
        "*",
        "+",
        ",",
        "-",
        ".",
        "/",
        ":",
        ";",
        "<",
        "=",
        ">",
        "?",
        "@",
        "[",
        "\\",
        "]",
        "^",
        "_",
        "`",
        "{",
        "|",
        "}",
        "~",
    ];

    const ChangeSwitchUpper = () => {
        setUpper(!upper);
    };
    const ChangeSwitchLower = () => {
        setLower(!lower);
    };
    const ChangeSwitchNumber = () => {
        setNumber(!number);
    };
    const ChangeSwitchSymbol = () => {
        setSymbol(!symbol);
    };

    const toggleGroup = (value: string[]) => {
        setUseSymbol(value);
    };

    const setGenerationsValue = (e: number) => {
        if (e < generationsLimit[0]) {
            e = generationsLimit[0];
        } else if (e > generationsLimit[1]) {
            e = generationsLimit[1];
        }
        setGenerations(e);
    };
    const setTextsValue = (e: number) => {
        if (e < textsLimit[0]) {
            e = textsLimit[0];
        } else if (e > textsLimit[1]) {
            e = textsLimit[1];
        }
        setTexts(e);
    };

    const setuseText = () => {
        const uppertem = upper ? upperTemplate : [];
        const lowertemp = lower ? lowerTemplate : [];
        const numbertemp = number ? numberTemplate : [];
        const symboltemp = symbol ? useSymbol : [];
        const useText = uppertem.concat(lowertemp).concat(numbertemp).concat(symboltemp).join("");
        setPassText(useText);
    };

    useEffect(() => {
        setuseText();
    }, [upper, lower, number, symbol, useSymbol, generations, texts]);

    const generatePassword = () => {
        let temp = "";
        for (let i = 0; i < generations; i++) {
            temp += generateRandomString(texts) + "\n";
        }
        setGeneratePassText(temp.slice(0, -2));
    };

    // 指定した長さでランダムな文字列を生成する関数
    const generateRandomString = (length: number) => {
        let result = "";
        const charactersLength = passText.length;
        for (let i = 0; i < length; i++) {
            result += passText.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
    return (
        <>
            <PageTitle title={tools_path?.title} description={tools_path?.description} />
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                    <Label
                        htmlFor="upper"
                        className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"
                    >
                        <div className="space-y-0.5">
                            <div>大文字</div>
                        </div>
                        <div>
                            <Switch
                                id="upper"
                                checked={upper}
                                onCheckedChange={ChangeSwitchUpper}
                            />
                        </div>
                    </Label>
                    <Label
                        htmlFor="lower"
                        className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"
                    >
                        <div className="space-y-0.5">
                            <div>小文字</div>
                        </div>
                        <div>
                            <Switch
                                id="lower"
                                checked={lower}
                                onCheckedChange={ChangeSwitchLower}
                            />
                        </div>
                    </Label>
                    <Label
                        htmlFor="number"
                        className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"
                    >
                        <div className="space-y-0.5">
                            <div>数字</div>
                        </div>
                        <div>
                            <Switch
                                id="number"
                                checked={number}
                                onCheckedChange={ChangeSwitchNumber}
                            />
                        </div>
                    </Label>
                    <Label
                        htmlFor="symbol"
                        className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"
                    >
                        <div className="space-y-0.5">
                            <div>記号</div>
                            <div className="text-[0.8rem] text-muted-foreground"></div>
                        </div>
                        <div>
                            <Switch
                                id="symbol"
                                checked={symbol}
                                onCheckedChange={ChangeSwitchSymbol}
                            />
                        </div>
                    </Label>
                </div>
                <div className="mt-2">
                    <ToggleGroup
                        type="multiple"
                        variant="outline"
                        disabled={!symbol}
                        className="grid grid-cols-11 sm:grid-cols-12 "
                        defaultValue={useSymbol}
                        onValueChange={toggleGroup}
                    >
                        {symbolTemplate.map((symbol, index) => (
                            <ToggleGroupItem
                                value={symbol}
                                aria-label={"Toggle " + symbol}
                                key={index}
                                className='data-[state="on"]:bg-[hsl(var(--primary))]'
                            >
                                {symbol}
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                    <div>
                        <Label className="text-sm" htmlFor="Generations">
                            生成数 {`${generationsLimit[0]} <= e <= ${generationsLimit[1]}`}
                        </Label>
                        <Input
                            className="w-full text-sm"
                            id="Generations"
                            placeholder="数字を入力してください"
                            type="number"
                            value={generations}
                            onChange={(e) => setGenerationsValue(parseInt(e.target.value))}
                        />
                    </div>
                    <div>
                        <Label className="text-sm" htmlFor="texts">
                            文字数 {`${textsLimit[0]} <= e <= ${textsLimit[1]}`}
                        </Label>
                        <Input
                            className="w-full text-sm"
                            id="texts"
                            placeholder="数字を入力してください"
                            type="number"
                            value={texts}
                            onChange={(e) => setTextsValue(parseInt(e.target.value))}
                        />
                    </div>
                </div>
                <div className="mt-2 grid gap-2">
                    <Button onClick={generatePassword}>生成</Button>
                    <div>
                        <Label className="text-sm" htmlFor="caesar-output">
                            Output
                        </Label>
                        <Textarea
                            className={`h-[35rem] text-sm`}
                            id="caesar-output"
                            placeholder="生成したパスワード"
                            readOnly
                            value={generatePassText}
                        />
                    </div>
                </div>
                <ToolsAllLink />
            </div>
        </>
    );
};

export default Page;
