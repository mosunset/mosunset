import PageTitle from "@/components/PageTitle/PageTitle";
import React from "react";
import data from "@/app/product/_data/product-all.json";
import fs from "fs";
import path from "path";
import MarkDown from "@/components/MarkDown/MarkDown";
export function generateStaticParams() {
    return data.product.map((content) => ({
        slug: content.url,
    }));
}
const page = ({ params }: { params: { slug: string } }) => {
    const markdownFilePath = path.join(
        process.cwd(),
        "src",
        "app",
        "product",
        "_data",
        `${params.slug}.md`
    );
    const fileContent = fs.readFileSync(markdownFilePath, "utf8");
    const product = data.product.find((product) => product.url === params.slug);
    return (
        <>
            <PageTitle title={product?.title} description={product?.description} />
            <div className="mx-auto max-w-4xl px-2 py-4">
                <MarkDown markdownString={fileContent} />
            </div>
        </>
    );
};

export default page;
