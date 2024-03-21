import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageTitle from "@/components/PageTitle/PageTitle";

const page = () => {
    return (
        <>
            <PageTitle title={"じゃんけん"} description={"3つのモード"} />
            <div className="">
                <Tabs defaultValue="random" className="grid justify-center justify-items-center">
                    <TabsList className="">
                        <TabsTrigger value="random" className="w-[100px]">
                            ランダム
                        </TabsTrigger>
                        <TabsTrigger value="win" className="w-[100px]">
                            勝ち
                        </TabsTrigger>
                        <TabsTrigger value="Lose" className="w-[100px]">
                            負け
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="random"></TabsContent>
                    <TabsContent value="win"></TabsContent>
                    <TabsContent value="Lose"></TabsContent>
                </Tabs>
            </div>
        </>
    );
};

export default page;
