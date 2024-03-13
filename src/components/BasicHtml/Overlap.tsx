import React from "react";

const Overlap = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return <div className=" min-h-screen overflow-x-hidden p-4 sm:p-6">{children}</div>;
};

export default Overlap;
