import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
const NotFound = () => {
    return (
        <>
            <div className="px-4 py-10 text-center sm:px-6 lg:px-8">
                <h1 className="block text-7xl font-bold text-gray-800 dark:text-white sm:text-9xl">
                    404
                </h1>
                <h1 className="block text-2xl font-bold text-white"></h1>
                <p className="mt-3 text-gray-600 dark:text-gray-400">Oops, something went wrong.</p>
                <p className="text-gray-600 dark:text-gray-400">
                    Sorry, we couldn&apos;t find your page.
                </p>
                <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
                    <Button asChild>
                        <Link className="gap-x-2" href="/">
                            <svg
                                className="size-4 flex-shrink-0"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                            Back to examples
                        </Link>
                    </Button>
                </div>
            </div>
        </>
    );
};

export default NotFound;
