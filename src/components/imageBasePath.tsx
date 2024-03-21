const ibp = (path: string) => {
    /* 本番環境と開発環境の分岐用のフラグ */
    const isProd = process.env.NODE_ENV === "production";
    // console.log(process.env.NODE_ENV);

    /* 公開時のサブディレクトリ */
    const SUB_DIRECTORY = "/mosunset";
    const prefixPath = isProd ? SUB_DIRECTORY : "";
    return prefixPath + "/" + path;
};

export default ibp;
