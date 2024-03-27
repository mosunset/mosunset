"use client";

import PageTitle from "@/components/PageTitle";
import React, { useEffect, useRef, useState } from "react";
import ToolsPath from "../_data/toolsPath";
import * as kuromoji from "kuromoji";
import ToolsAllLink from "@/components/tools/ToolsAllLink";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import bp from "@/components/BasePath";
import { ReloadIcon } from "@radix-ui/react-icons";

type Tokenizer = {
    word_id: number; // 辞書内での単語ID
    word_type: "KNOWN" | "UNKOWN"; // 単語タイプ(辞書に登録されている単語ならKNOWN, 未知語ならUNKNOWN)
    word_position: number; // 単語の開始位置
    surface_form: string; // 表層形
    pos: string; // 品詞
    pos_detail_1: string; // 品詞細分類1
    pos_detail_2: string; // 品詞細分類2
    pos_detail_3: string; // 品詞細分類3
    conjugated_type: string; // 活用型
    conjugated_form: string; // 活用形
    basic_form: string; // 基本形
    reading: string; // 読み ない
    pronunciation: string; // 発音 ない
};

const Page = () => {
    const tools_path = ToolsPath();
    const time = useRef<NodeJS.Timeout | null>(null);
    const [userInputText, setUserInputText] = useState<string>("");
    const [tokens, setTokens] = useState<kuromoji.IpadicFeatures[]>([]);
    const [viewAll, setViewAll] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // トークナイザーのビルド
    const buildTokenizer = () => {
        return new Promise<kuromoji.Tokenizer<kuromoji.IpadicFeatures>>((resolve, reject) => {
            // オブジェクトのアサーションを追加
            const options = {
                dicPath: bp("/tools/dict"),
            } as kuromoji.TokenizerBuilderOption;

            kuromoji.builder(options).build((err, tokenizer) => {
                if (err) {
                    reject(err);
                } else {
                    console.log("test");
                    setIsLoading(false);
                    resolve(tokenizer);
                }
            });
        });
    };

    const analysis = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value.replace(/\n/gm, "");

        setUserInputText(text);
        if (time.current) {
            clearTimeout(time.current);
        }
        time.current = setTimeout(async () => {
            setTokens(await mainAnalysis(text));
        }, 1500);
    };
    const s = useEffect(() => {
        async function Dictionary() {
            await buildTokenizer();
        }
        Dictionary();
    }, []);

    const mainAnalysis = async (text: string): Promise<kuromoji.IpadicFeatures[]> => {
        // トークナイザーのビルド
        const tokenizer = await buildTokenizer();

        // 形態素解析の実行
        return tokenizer.tokenize(text);
    };
    const onChangeViewAll = () => {
        setViewAll(!viewAll);
    };

    return (
        <>
            <PageTitle title={tools_path?.title} description={tools_path?.description} />
            <div className="mx-auto max-w-7xl">
                <div className="grid w-full gap-1.5">
                    <Label htmlFor="Morphological">文章を入力</Label>
                    <Textarea
                        placeholder="文章を入力"
                        id="Morphological"
                        value={userInputText}
                        onChange={analysis}
                    />
                    {isLoading && (
                        <div className="flex items-center gap-2">
                            辞書をダウンロード中
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        </div>
                    )}
                </div>
                {!isLoading && (
                    <div className="mt-4 grid w-full gap-1.5">
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="airplane-mode"
                                checked={viewAll}
                                onCheckedChange={onChangeViewAll}
                            />
                            <Label htmlFor="airplane-mode">すべての要素を表示する</Label>
                        </div>
                        <Table>
                            <TableCaption>負荷軽減のため1秒間隔で処理しています。</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    {viewAll ? (
                                        <>
                                            <TableHead>辞書内ID</TableHead>
                                            <TableHead>単語タイプ</TableHead>
                                            <TableHead>開始位置</TableHead>
                                            <TableHead>表層形</TableHead>
                                            <TableHead>品詞</TableHead>
                                            <TableHead>品詞細分類1</TableHead>
                                            <TableHead>品詞細分類2</TableHead>
                                            <TableHead>品詞細分類3</TableHead>
                                            <TableHead>活用型</TableHead>
                                            <TableHead>活用形</TableHead>
                                            <TableHead>基本形</TableHead>
                                            <TableHead>読み *</TableHead>
                                            <TableHead>発音 *</TableHead>
                                        </>
                                    ) : (
                                        <>
                                            <TableHead>開始位置</TableHead>
                                            <TableHead>表層形</TableHead>
                                            <TableHead>品詞</TableHead>
                                            <TableHead>基本形</TableHead>
                                            <TableHead>読み</TableHead>
                                        </>
                                    )}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tokens.map((token, index) => (
                                    <TableRow key={index}>
                                        {viewAll ? (
                                            <>
                                                <TableCell>{token.word_id}</TableCell>
                                                <TableCell>{token.word_type}</TableCell>
                                                <TableCell>{token.word_position}</TableCell>
                                                <TableCell>{token.surface_form}</TableCell>
                                                <TableCell>{token.pos}</TableCell>
                                                <TableCell>{token.pos_detail_1}</TableCell>
                                                <TableCell>{token.pos_detail_2}</TableCell>
                                                <TableCell>{token.pos_detail_3}</TableCell>
                                                <TableCell>{token.conjugated_type}</TableCell>
                                                <TableCell>{token.conjugated_form}</TableCell>
                                                <TableCell>{token.basic_form}</TableCell>
                                                <TableCell>{token.reading}</TableCell>
                                                <TableCell>{token.pronunciation}</TableCell>
                                            </>
                                        ) : (
                                            <>
                                                <TableCell>{token.word_position}</TableCell>
                                                <TableCell>{token.surface_form}</TableCell>
                                                <TableCell>{token.pos}</TableCell>
                                                <TableCell>{token.basic_form}</TableCell>
                                                <TableCell>{token.reading}</TableCell>
                                            </>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
                <ToolsAllLink />
            </div>
        </>
    );
};

export default Page;
