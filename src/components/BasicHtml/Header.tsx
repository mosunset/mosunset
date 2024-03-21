"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import Navigation from "./Navigation";
import ThemeButton from "./ThemeButton";
import { useState } from "react";
import SiteName from "./SiteName";

const Header = () => {
    const [open, setOpen] = useState(false);
    const closeClick = () => {
        setOpen(false);
    };
    return (
        <header className="mb-6 flex w-full max-w-screen-2xl items-center justify-between">
            <h1>
                <SiteName />
            </h1>
            <div className="hidden gap-2 sm:flex">
                <Navigation />
                <ThemeButton />
            </div>
            <div className="sm:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline">
                            <HamburgerMenuIcon />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="w-full bg-[#e0e0e0e0] dark:bg-[#101010e0]">
                        <SheetHeader>
                            <SheetTitle>
                                <SiteName
                                    className="mb-2 inline-block w-full text-center"
                                    onClick={closeClick}
                                />
                            </SheetTitle>
                            <SheetDescription></SheetDescription>
                        </SheetHeader>
                        <Navigation
                            navcss="max-w-full w-full block"
                            ulcss="min-w-full block"
                            licss="ml-1 mb-2 w-full block"
                            linkcss="inline-block hover:underline w-full rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                            onClick={closeClick}
                        />
                        <SheetFooter>
                            <div className="m-4 text-center">
                                <ThemeButton />
                            </div>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
};

export default Header;
