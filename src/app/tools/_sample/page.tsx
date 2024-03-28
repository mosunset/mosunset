"use client";

import PageTitle from "@/components/PageTitle";
import React from "react";
import ToolsPath from "../_data/toolsPath";
import ToolsAllLink from "@/components/tools/ToolsAllLink";

const Page = () => {
    const tools_path = ToolsPath();

    return (
        <>
            <PageTitle title={tools_path?.title} description={tools_path?.description} />
            <div className="mx-auto max-w-7xl">
                <ToolsAllLink />
            </div>
        </>
    );
};

export default Page;
