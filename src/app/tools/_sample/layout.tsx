import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
