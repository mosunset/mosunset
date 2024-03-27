"use client";

import PageTitle from "@/components/PageTitle";
import React from "react";
import ToolsPath from "../_data/toolsPath";

const page = () => {
    const tools_path = ToolsPath();

    return (
        <>
            <PageTitle title={tools_path?.title} description={tools_path?.description} />
        </>
    );
};

export default page;
