import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
const SiteName = ({ className, onClick }: { className?: string; onClick?: () => void }) => {
    return (
        <Link
            className={cn(
                className,
                "flex-none p-2 text-xl font-semibold text-black dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            )}
            href="/"
            aria-label="mosunset"
            onClick={onClick}
        >
            mosunset
        </Link>
    );
};

export default SiteName;
