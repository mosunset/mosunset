import React from "react";
import { formatDate } from "@/lib/utils";

const index = ({ createdAt, revisedAt }: { createdAt: string; revisedAt: string | undefined }) => {
    return (
        <>
            <div className="grid w-full justify-items-center sm:grid-cols-2 ">
                <div>{formatDate(createdAt)}</div>
                <div>{formatDate(revisedAt as string)}</div>
            </div>
        </>
    );
};

export default index;
