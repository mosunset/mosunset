"use client";

import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import toolsAll from "@/app/tools/_data/tools-all.json";
import { usePathname } from "next/navigation";

const ToolsAllLink = () => {
    const pathname = usePathname();
    return (
        <div className="mt-8 grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3">
            {toolsAll.tools.map((tools) =>
                tools.show && !pathname.includes(`/tools/${tools.url}/`) ? (
                    <div key={tools.url} className="flex items-center">
                        <Link href={"/tools/" + tools.url} className="text-blue-700 underline">
                            {tools.title}
                        </Link>
                        <ChevronRightIcon />
                        {tools.description}
                    </div>
                ) : null
            )}
        </div>
    );
};

export default ToolsAllLink;
