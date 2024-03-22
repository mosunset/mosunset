"use client";

import PageTitle from "@/components/PageTitle";
import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { Blog, getList } from "@/lib/microcms";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";

const Page = ({ params, searchParams }: { params: string; searchParams: { p: string } }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(12); // 1ページあたりの表示件数
    const [content, setContent] = useState<(Blog & MicroCMSContentId & MicroCMSDate)[]>([]);
    const [totalblog, setTotalblog] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getList({ limit, offset: (currentPage - 1) * limit });
            setContent(data.contents);
            setTotalblog(data.totalCount);
        };
        fetchData();
    }, [currentPage, limit]);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalblog / limit); i++) {
        pageNumbers.push(
            <PaginationItem key={i}>
                <PaginationLink
                    href="#"
                    onClick={() => setCurrentPage(i)}
                    className={currentPage === i ? "bg-gray-800 text-white" : ""}
                >
                    {i}
                </PaginationLink>
            </PaginationItem>
        );
    }

    return (
        <>
            <PageTitle title={"Blog"} description={`${totalblog}個の記事`} />
            {totalblog <= limit ? (
                ""
            ) : (
                <Pagination className="mb-8">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() => {
                                    setCurrentPage(currentPage == 1 ? 1 : currentPage - 1);
                                }}
                            />
                        </PaginationItem>
                        {pageNumbers}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={() => {
                                    const max = Math.ceil(totalblog / limit);
                                    setCurrentPage(currentPage == max ? max : currentPage + 1);
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {content.map((content) => (
                    <Link
                        className="group flex min-h-max flex-col rounded-xl bg-gray-100 px-4 py-3 shadow transition-all hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                        href={content.id}
                        key={content.title}
                    >
                        <div className="aspect-w-16 aspect-h-10">
                            <Image
                                className="aspect-video w-full rounded-xl object-cover shadow-sm"
                                src={content.thumbnail.url}
                                alt={content.title}
                                width={content.thumbnail.width}
                                height={content.thumbnail.height}
                            />
                        </div>
                        <h3 className="mt-3 text-xl text-gray-800 dark:text-gray-300 dark:hover:text-white">
                            {content.title}
                        </h3>

                        <h3 className="mt-2 flex-grow text-gray-700 dark:text-gray-300 dark:hover:text-white">
                            {content.description}
                        </h3>
                        <p className="mt-2 inline-flex items-center justify-end gap-x-1 text-sm font-semibold text-gray-800 dark:text-gray-200">
                            Learn more
                            <ChevronRightIcon />
                        </p>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Page;
