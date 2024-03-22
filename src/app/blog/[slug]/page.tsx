import PageTitle from "@/components/PageTitle";
import React from "react";
import MarkDown from "@/components/MarkDown/MarkDown";
import { getList, getDetail } from "@/lib/microcms";
import BlogTime from "@/components/BlogTime";
import "@/components/MarkDown/MarkDown.scss";
export async function generateStaticParams() {
    const contents = await getList();
    return contents.contents.map((content) => ({
        slug: content.id,
    }));
}

const page = async ({ params }: { params: { slug: string } }) => {
    const content = await getDetail(params.slug);
    return (
        <>
            <PageTitle title={content.title} description={content?.description} />
            <BlogTime createdAt={content.createdAt} revisedAt={content.revisedAt} />
            <div className="mx-auto max-w-4xl px-2 py-4">
                <div
                    dangerouslySetInnerHTML={{ __html: content.content }}
                    className="markdown-body"
                ></div>
            </div>
        </>
    );
};

export default page;
