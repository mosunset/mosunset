import PageTitle from "@/components/PageTitle";
import React from "react";
import data from "@/app/game/_data/game-all.json";
import Link from "next/link";
import Image from "next/image";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import bp from "@/components/BasePath";
const page = () => {
    return (
        <>
            <PageTitle title={"Game"} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.game.map(
                    (content) =>
                        content.show && (
                            <Link
                                className="group flex min-h-max flex-col rounded-xl bg-gray-100 px-4 py-3 shadow transition-all hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                                href={content.url}
                                key={content.title}
                            >
                                <div className="aspect-w-16 aspect-h-10">
                                    <Image
                                        className="aspect-video w-full rounded-xl object-cover shadow-sm"
                                        src={
                                            content.img
                                                ? bp(
                                                      "/game/" +
                                                          content.url +
                                                          "/" +
                                                          content.url +
                                                          ".webp"
                                                  )
                                                : `http://via.placeholder.com/640x360/66ffaa/111111?text=${content.title}`
                                        }
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
                        )
                )}
            </div>
        </>
    );
};

export default page;
