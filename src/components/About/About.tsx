import React from "react";
import Image from "next/image";
const About = () => {
    return (
        <>
            <div className="mx-auto max-w-[85rem] px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl grid-cols-[minmax(10rem,_1fr)_2fr] grid-rows-[minmax(4rem,4rem)_3fr] gap-x-4 gap-y-2 sm:grid">
                    <div className="relative grid place-content-center sm:contents">
                        <Image
                            className="row-span-2 block aspect-[4/3] rounded-lg object-cover blur-sm sm:aspect-square sm:blur-none"
                            src="myself.webp"
                            width={824}
                            height={824}
                            alt={"myself image is koala"}
                        />
                        <h2 className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 transform place-content-center text-4xl font-medium drop-shadow-lg sm:relative sm:text-2xl">
                            About
                        </h2>
                    </div>
                    <div className="col-start-2 mt-4 grid content-center gap-2 sm:mt-0">
                        <p>岐阜県で生まれた</p>
                        <p>岐阜県で育った</p>
                        <p>高知県で大学に通うため一人暮らし中</p>
                        <p className="mt-2">触ったことがあるもの</p>
                        <p>
                            HTML, CSS, Javascript, Typescript, Nextjs, Python, Java, Assembly, C#,
                            VBA, Swift
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
