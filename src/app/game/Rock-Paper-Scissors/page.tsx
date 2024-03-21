"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageTitle from "@/components/PageTitle/PageTitle";
import ibp from "@/components/imageBasePath";

const JankenPage = () => {
    const [playerChoice, setPlayerChoice] = useState<string | null>(null);
    const [computerChoice, setComputerChoice] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [mode, setMode] = useState<"random" | "win" | "lose">("random");

    const choices = ["rock", "paper", "scissors"];

    const getComputerChoice = () => {
        switch (mode) {
            case "random":
                return choices[Math.floor(Math.random() * 3)];
            case "win":
                const losingChoice = choices.find(
                    (choice) => choices.indexOf(choice) === (choices.indexOf(playerChoice) + 1) % 3
                );
                return losingChoice || "rock";
            case "lose":
                const winningChoice = choices.find((choice) => choice !== playerChoice);
                return winningChoice || "rock";
            default:
                return "rock";
        }
    };

    const handlePlayerChoice = (choice: string) => {
        setPlayerChoice(choice);
        const computerChoice = getComputerChoice();
        setComputerChoice(computerChoice);

        const playerIndex = choices.indexOf(choice);
        const computerIndex = choices.indexOf(computerChoice);
        const diff = (computerIndex - playerIndex + 3) % 3;

        if (diff === 0) {
            setResult("Draw");
        } else if (diff === 1) {
            setResult("Computer wins");
        } else {
            setResult("Player wins");
        }
    };

    const renderChoices = () => (
        <div className="mb-4 flex justify-center gap-4">
            {choices.map((choice) => (
                <button
                    key={choice}
                    onClick={() => handlePlayerChoice(choice)}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 transition-colors duration-200 hover:bg-gray-300"
                >
                    <HandImage choice={choice} />
                </button>
            ))}
        </div>
    );

    const renderResult = () => (
        <div className="flex justify-center gap-4">
            <HandImage choice={playerChoice || "rock"} />
            <span className="text-xl font-bold">vs</span>
            <HandImage choice={computerChoice || "rock"} />
            <div className="text-xl font-bold">{result}</div>
        </div>
    );

    return (
        <>
            <PageTitle title="じゃんけん" description="3つのモード" />
            <div className="container mx-auto max-w-md py-8">
                <Tabs
                    defaultValue={mode}
                    onChange={setMode}
                    className="grid justify-center justify-items-center"
                >
                    <TabsList className="mb-4 rounded-t-lg bg-gray-200">
                        <TabsTrigger
                            value="random"
                            className="cursor-pointer rounded-t-lg px-4 py-2"
                        >
                            ランダム
                        </TabsTrigger>
                        <TabsTrigger value="win" className="cursor-pointer rounded-t-lg px-4 py-2">
                            勝ち
                        </TabsTrigger>
                        <TabsTrigger value="lose" className="cursor-pointer rounded-t-lg px-4 py-2">
                            負け
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="random">
                        {renderChoices()}
                        {renderResult()}
                    </TabsContent>
                    <TabsContent value="win">
                        {renderChoices()}
                        {renderResult()}
                    </TabsContent>
                    <TabsContent value="lose">
                        {renderChoices()}
                        {renderResult()}
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
};

interface HandImageProps {
    choice: "rock" | "paper" | "scissors";
    className?: string;
}

const HandImage: React.FC<HandImageProps> = ({ choice, className }) => {
    const getImageSrc = () => {
        switch (choice) {
            case "rock":
                return "game/Rock-Paper-Scissors/rock.webp";
            case "paper":
                return "game/Rock-Paper-Scissors/paper.webp";
            case "scissors":
                return "game/Rock-Paper-Scissors/scissors.webp";
            default:
                return "";
        }
    };

    return (
        <div className={`relative h-16 w-16 ${className}`}>
            <Image src={ibp(getImageSrc())} alt={choice} fill className="object-contain" />
        </div>
    );
};

export default JankenPage;
