import PageTitle from "@/components/PageTitle/PageTitle";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import data from "@/app/product/_data/product-all.json";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import ibp from "@/components/imageBasePath";

const page = () => {
    return (
        <>
            <PageTitle title={"Product"} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.product.map((content) => (
                    <Link
                        className="group flex min-h-max flex-col rounded-xl bg-gray-100 px-4 py-3 shadow transition-all hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                        href={content.url}
                        key={content.title}
                    >
                        <div className="aspect-w-16 aspect-h-10">
                            <Image
                                className="w-full rounded-xl object-cover shadow-sm"
                                src={ibp("product/" +content.url + ".webp")}
                                alt={content.description}
                                width={1280}
                                height={720}
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

export default page;
