"use client";

import Link from "next/link";
import React from "react";
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import Navigation from "./Navigation";
import SiteName from "./SiteName";

const Footer = () => {
    return (
        <footer className="mx-auto w-full max-w-[85rem] border-t border-dashed px-4 py-10 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-5 text-center md:grid-cols-[150px_1fr_100px]">
                <div>
                    <SiteName />
                </div>

                <div className="grid justify-items-center">
                    <Navigation
                        ulcss="text-center"
                        licss="relative inline-block pe-4 before:absolute before:end-1 before:top-1/2 before:-translate-y-1/2 before:text-gray-300 before:content-['/'] last:pe-0 last-of-type:before:hidden dark:before:text-gray-600"
                        linkcss="inline-flex p-2 gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    />
                </div>

                <div className="space-x-2 md:text-end">
                    <Link
                        className="inline-flex size-8 items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-500 hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        href="https://github.com/mosunset"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <GitHubLogoIcon />
                    </Link>
                    <Link
                        className="inline-flex size-8 items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-500 hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        href="https://twitter.com/TMoSunset0"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <TwitterLogoIcon />
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
