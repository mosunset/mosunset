import About from "@/components/About/About";
import PageTitle from "@/components/PageTitle";

export default function Home() {
    return (
        <>
            <PageTitle
                title={"mosunset のサイト"}
                description={"便利ツールまとめ&ポートフォリオ"}
            />
            <About />
            <div className="mx-auto max-w-[85rem] px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl">
                    <h2 className="mb-2 text-xl font-medium">このサイトについて</h2>
                    <p>自分が作った「便利ツール」と「作ったもの」などをまとめていく</p>
                </div>
            </div>
        </>
    );
}
