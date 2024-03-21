"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageTitle from "@/components/PageTitle/PageTitle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ibp from "@/components/imageBasePath";

const Page = () => {
    const [tabValue, setTabValue] = useState("random");
    const [cpuValue, setCpuValue] = useState("rock");
    const [userValue, setUserValue] = useState("rock");
    const [result, setResult] = useState("");
    const choices = ["rock", "scissors", "paper"];

    const getRandomInt = (min: number, max: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    };

    const onValueChange = (value: string) => {
        setTabValue(value);
    };

    const getResult = (cpuChoice: string, userChoice: string) => {
        const cpuIndex = choices.indexOf(cpuChoice);
        const userIndex = choices.indexOf(userChoice);
        const diff = (cpuIndex - userIndex + 3) % 3;

        if (diff === 0) {
            return "あいこ🙂";
        } else if (diff === 1) {
            return "あなたの勝ち👍";
        } else if (diff === 2) {
            return "あなたの負け😅";
        }
    };

    const Result = (choice: string) => {
        setUserValue(choice);

        switch (tabValue) {
            case "random":
                const randomChoice = choices[getRandomInt(0, 3)];
                setCpuValue(randomChoice);
                setResult(getResult(randomChoice, choice) as string);
                break;
            case "win":
                const winChoice = choices[(choices.indexOf(choice) + 1) % 3];
                setCpuValue(winChoice);
                setResult("あなたの勝ち👍");
                break;
            case "lose":
                const loseChoice = choices[(choices.indexOf(choice) + 2) % 3];
                setCpuValue(loseChoice);
                setResult("あなたの負け😅");
                break;
            default:
                break;
        }
    };

    const ResultHtml = () => {
        const userChoiceImage = ibp(`game/Rock-Paper-Scissors/${userValue}.webp`);
        const cpuChoiceImage = ibp(`game/Rock-Paper-Scissors/${cpuValue}.webp`);

        return (
            <>
                <div className="mt-8 grid gap-4">
                    <div className="flex items-center justify-center gap-4">
                        <div className=" grid items-center justify-items-center">
                            <span className="text-2xl font-bold">CPU</span>
                            <div className="rounded-full bg-gray-200 p-4">
                                <Image
                                    src={cpuChoiceImage}
                                    alt={cpuValue}
                                    width={80}
                                    height={80}
                                    className="block aspect-square object-cover"
                                />
                            </div>
                        </div>

                        <div className=" grid items-center justify-items-center">
                            <span className="text-2xl font-bold">You</span>
                            <div className="rounded-full bg-gray-200 p-4 ">
                                <Image
                                    src={userChoiceImage}
                                    alt={userValue}
                                    width={80}
                                    height={80}
                                    className="block aspect-square object-cover"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="text-center text-4xl font-bold">{result}</div>
                </div>
            </>
        );
    };

    const handChoice = () => {
        return (
            <>
                <div className="grid grid-cols-3 gap-2">
                    {choices.map((choice) => (
                        <Button
                            key={choice}
                            variant="outline"
                            className={`grid aspect-square h-auto justify-items-center p-2 hover:bg-blue-300 ${
                                choice === userValue ? "bg-blue-500 text-white" : ""
                            }`}
                            onClick={() => Result(choice)}
                        >
                            <Image
                                src={ibp(`game/Rock-Paper-Scissors/${choice}.webp`)}
                                alt={choice}
                                width={55}
                                height={55}
                                className="block aspect-square object-cover"
                            />
                        </Button>
                    ))}
                </div>
            </>
        );
    };

    return (
        <>
            <PageTitle title={"じゃんけん"} description={"3つのモード"} />
            <div className="">
                <Tabs
                    defaultValue="random"
                    value={tabValue}
                    onValueChange={onValueChange}
                    className="grid justify-center justify-items-center"
                >
                    <TabsList className="">
                        <TabsTrigger value="random" className="w-[100px]">
                            通常
                        </TabsTrigger>
                        <TabsTrigger value="win" className="w-[100px]">
                            必ず勝ち
                        </TabsTrigger>
                        <TabsTrigger value="lose" className="w-[100px]">
                            必ず負け
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="random">
                        {handChoice()}
                        {ResultHtml()}
                    </TabsContent>
                    <TabsContent value="win">
                        {handChoice()}
                        {ResultHtml()}
                    </TabsContent>
                    <TabsContent value="lose">
                        {handChoice()}
                        {ResultHtml()}
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
};

export default Page;
