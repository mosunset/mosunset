import React from "react";

const Main = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return <main className="">{children}</main>;
};

export default Main;
