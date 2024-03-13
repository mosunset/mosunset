import type { Metadata } from "next";
import { Noto_Sans_JP as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Suspense } from "react";
import GoogleAnalytics from "@/components/GoogleAnalytics/GoogleAnalytics";
import Header from "@/components/BasicHtml/Header";
import Footer from "@/components/BasicHtml/Footer";
import Overlap from "@/components/BasicHtml/Overlap";
import Main from "@/components/BasicHtml/Main";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "mosunset site",
    description: "mosunset のサイト",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <head>
                <Suspense>
                    <GoogleAnalytics />
                </Suspense>
            </head>
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased ",
                    fontSans.variable
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Overlap>
                        <Header />
                        <Main>{children}</Main>
                        <Footer />
                    </Overlap>
                </ThemeProvider>
            </body>
        </html>
    );
}
