import React from "react";

const Main = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return <main className="mb-8 w-full max-w-screen-2xl flex-grow">{children}</main>;
};

export default Main;
