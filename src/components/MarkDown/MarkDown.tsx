// npm install react-markdown remark-gfm remark-math rehype-katex github-markdown-css react-syntax-highlighter @types/react-syntax-highlighter sass

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import "./MarkDown.scss";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import type { ClassAttributes, HTMLAttributes } from "react";
import type { ExtraProps } from "react-markdown";
import { agate as highlightStyle } from "react-syntax-highlighter/dist/esm/styles/hljs";

const MarkDown = ({ markdownString }: { markdownString: string }) => {
    const Pre = ({
        children,
        ...props
    }: ClassAttributes<HTMLPreElement> & HTMLAttributes<HTMLPreElement> & ExtraProps) => {
        if (!children || typeof children !== "object") {
            return <code {...props}>{children}</code>;
        }
        const childType = "type" in children ? children.type : "";
        if (childType !== "code") {
            return <code {...props}>{children}</code>;
        }

        const childProps = "props" in children ? children.props : {};
        const { className, children: code } = childProps;
        const classList = className ? className.split(":") : [];
        const language = classList[0]?.replace("language-", "");
        const fileName = classList[1];

        return (
            <>
                <div className="codeblock">
                    {fileName && <div className="filename">{fileName}</div>}
                    <SyntaxHighlighter language={language} style={highlightStyle}>
                        {String(code).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                </div>
            </>
        );
    };
    return (
        <>
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                className="markdown-body"
                components={{
                    pre: Pre,
                }}
            >
                {markdownString}
            </ReactMarkdown>
        </>
    );
};

export default MarkDown;
