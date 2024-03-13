import React from "react";

const Overlap = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className=" flex min-h-dvh flex-col items-center overflow-x-hidden px-6 pb-0 pt-4">
            {children}
        </div>
    );
};

export default Overlap;
