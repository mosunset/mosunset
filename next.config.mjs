/** @type {import('next').NextConfig} */

/* 本番環境と開発環境の分岐用のフラグ */
const isProd = process.env.NODE_ENV === "production";
// console.log(process.env.NODE_ENV);

/* 公開時のサブディレクトリ */
const SUB_DIRECTORY = "/mosunset";
const prefixPath = isProd ? SUB_DIRECTORY : "";

const nextConfig = {
    basePath: prefixPath,
    reactStrictMode: true,
    trailingSlash: true,
    output: "export",
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
