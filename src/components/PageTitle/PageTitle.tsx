import React from "react";

/**
 * 各ページ上部のタイトルを出す
 *
 * @param title タイトル
 * @param description 説明文
 * @returns タイトルと説明文
 *
 * @example <PageTitle title={"Title"} description={"description"} />
 */
const PageTitle = ({ title, description }: { title: string; description?: string }) => {
    return (
        <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="block text-3xl font-bold text-gray-800 dark:text-white sm:text-4xl md:text-5xl">
                    {title}
                </h2>
                {description && (
                    <p className="mt-3 text-lg text-gray-800 dark:text-gray-400">{description}</p>
                )}
            </div>
        </div>
    );
};

export default PageTitle;
