export const GA_TAG_ID =
    process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_MEASUREMENTID || "" : "";

export const IS_GATAG = GA_TAG_ID !== "";

export const pageview = (path: string) => {
    window.gtag("config", GA_TAG_ID, {
        page_path: path,
    });
};
