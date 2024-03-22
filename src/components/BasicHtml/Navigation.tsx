"use client";

import React from "react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
const Navigation = ({
    navcss,
    ulcss,
    licss,
    linkcss,
    onClick,
}: {
    navcss?: string;
    ulcss?: string;
    licss?: string;
    linkcss?: string;
    onClick?: () => void;
}) => {
    return (
        <NavigationMenu className={navcss}>
            <NavigationMenuList className={ulcss}>
                <NavigationMenuItem className={licss}>
                    <Link href="/tools/" legacyBehavior passHref>
                        <NavigationMenuLink
                            className={linkcss ? linkcss : navigationMenuTriggerStyle()}
                            onClick={onClick}
                        >
                            Tools
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className={licss}>
                    <Link href="/game/" legacyBehavior passHref>
                        <NavigationMenuLink
                            className={linkcss ? linkcss : navigationMenuTriggerStyle()}
                            onClick={onClick}
                        >
                            Game
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className={licss}>
                    <Link href="/blog/" legacyBehavior passHref>
                        <NavigationMenuLink
                            className={linkcss ? linkcss : navigationMenuTriggerStyle()}
                            onClick={onClick}
                        >
                            Blog
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className={licss}>
                    <Link href="/contact/" legacyBehavior passHref>
                        <NavigationMenuLink
                            className={linkcss ? linkcss : navigationMenuTriggerStyle()}
                            onClick={onClick}
                        >
                            Contact
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default Navigation;
