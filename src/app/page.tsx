import About from "@/components/About/About";
import PageTitle from "@/components/PageTitle/PageTitle";

export default function Home() {
    return (
        <>
            <PageTitle
                title={"mosunset のサイト"}
                description={"便利ツールまとめとポートフォリオ"}
            />
            <About />
            <div className="mx-auto max-w-[85rem] px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl grid-cols-[minmax(10rem,_1fr)_2fr] grid-rows-[minmax(4rem,4rem)_3fr] gap-x-4 gap-y-2 sm:grid">
                    <h2>このサイトについて</h2>
                </div>
            </div>
        </>
    );
}
