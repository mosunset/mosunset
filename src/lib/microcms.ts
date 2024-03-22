import { createClient } from "microcms-js-sdk";
import type {
    MicroCMSQueries,
    MicroCMSImage,
    MicroCMSDate,
    MicroCMSContentId,
} from "microcms-js-sdk";
import { notFound } from "next/navigation";

// ブログの型定義
export type Blog = {
    title: string;
    description?: string;
    content: string;
    thumbnail: MicroCMSImage;
};

export type Article = Blog & MicroCMSContentId & MicroCMSDate;
console.log("test " + !process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN);
if (!process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN) {
    throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.NEXT_PUBLIC_MICROCMS_API_KEY) {
    throw new Error("MICROCMS_API_KEY is required");
}

// Initialize Client SDK.
export const client = createClient({
    serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY,
});

// ブログ一覧を取得
export const getList = async (queries?: MicroCMSQueries) => {
    const listData = await client
        .getList<Blog>({
            endpoint: "blog",
            queries,
        })
        .catch(notFound);
    return listData;
};

// ブログの詳細を取得
export const getDetail = async (contentId: string, queries?: MicroCMSQueries) => {
    const detailData = await client
        .getListDetail<Blog>({
            endpoint: "blog",
            contentId,
            queries,
        })
        .catch(notFound);

    return detailData;
};
