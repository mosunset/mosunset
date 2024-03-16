"use client";

import { usePathname } from "next/navigation";
import ToolsAll from "../_data/tools-all.json";

export default function ToolsPath() {
    const str = usePathname();
    const pattern = /\/tools\/([^/]+)\//;
    const match = str.match(pattern);

    if (match && match.length > 1) {
        const matchedString = match[1];
        return ToolsAll.tools.find((tools) => tools.url === matchedString) || null;
    } else {
        return null;
    }
}
