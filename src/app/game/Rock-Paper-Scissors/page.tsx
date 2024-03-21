"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageTitle from "@/components/PageTitle/PageTitle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ibp from "@/components/imageBasePath";

const Page = () => {
    const [tabValue, settabValue] = useState("random");
    const [cpuValue, setcpuValue] = useState("rock");
    const [userValue, setuserValue] = useState("rock");
    const [result, setResult] = useState("");
    const choices = ["rock", "scissors", "paper"];

    /** min 以上 max未満 の整数を返す
     *
     * @param min
     * @param max
     * @returns
     */
    const getRandomInt = (min: number, max: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    };
    const onValueChange = (value: string) => {
        settabValue(value);
    };
    const Result = (choice: string) => {
        // TODO: 未完成
        setuserValue(choice);
        switch (tabValue) {
            case "random":
                setcpuValue(choices[getRandomInt(0, 3)]);
                // setcpuValue("rock")
                const diff = (choices.indexOf(cpuValue) - choices.indexOf(userValue) + 3) % 3;

                if (diff === 0) {
                    setResult("Draw");
                } else if (diff === 1) {
                    setResult("You Win");
                } else {
                    setResult("You Lose");
                }
                break;
            case "win":
                setcpuValue(choices[(choices.indexOf(choice) + 1) % 3]);
                setResult("You Win");
                break;
            case "lose":
                setcpuValue(choices[(choices.indexOf(choice) + 2) % 3]);
                setResult("You Lose");
                break;
            default:
                break;
        }
    };
    const ResultHtml = () => {
        return (
            <>
                {tabValue}
                <br />
                cpu {cpuValue}
                <br />
                user {userValue}
                <br />
                {result}
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
                            className={"grid aspect-square h-auto justify-items-center p-2"}
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
                            ランダム
                        </TabsTrigger>
                        <TabsTrigger value="win" className="w-[100px]">
                            勝ち
                        </TabsTrigger>
                        <TabsTrigger value="lose" className="w-[100px]">
                            負け
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="random">
                        {handChoice()}
                        <br />
                        {ResultHtml()}
                    </TabsContent>
                    <TabsContent value="win">
                        {handChoice()}
                        <br />
                        {ResultHtml()}
                    </TabsContent>
                    <TabsContent value="lose">
                        {handChoice()}
                        <br />
                        {ResultHtml()}
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
};

export default Page;
