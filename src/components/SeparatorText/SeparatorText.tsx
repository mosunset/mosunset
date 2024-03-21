import React from "react";
import { Separator } from "../ui/separator";
/**
 * 水平線を追加する
 * textがない場合一本線になる
 *
 * @param {{ text?: string }} { text }
 * @return {*}
 */
const SeparatorText = ({ text, className }: { text?: string; className?: string }) => {
    return (
        <div className={className}>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="cursor-default bg-card px-2 text-muted-foreground">
                        {text}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SeparatorText;
