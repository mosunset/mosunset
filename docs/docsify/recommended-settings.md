# Docsify おすすめ設定

## 基本設定

### window.$docsifyの設定
```javascript
window.$docsify = {
  name: 'プロジェクト名',
  repo: 'https://github.com/username/repo',
  loadSidebar: true,
  loadNavbar: true,
  mergeNavbar: true,
  maxLevel: 4,
  subMaxLevel: 2,
  auto2top: true,
  homepage: 'README.md',
  search: 'auto',
  copyCode: {
    buttonText: 'コピー',
    errorText: 'エラー',
    successText: '完了'
  }
}
```

## 便利なプラグイン

### 1. 検索機能
```html
<script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/search.min.js"></script>
```

### 2. コードコピー機能
```html
<script src="//cdn.jsdelivr.net/npm/docsify-copy-code"></script>
```

### 3. ズーム機能
```html
<script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/zoom-image.min.js"></script>
```

### 4. 外部リンクアイコン
```html
<script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/external-script.min.js"></script>
```

### 5. 絵文字サポート
```html
<script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/emoji.min.js"></script>
```

## テーマ

### 公式テーマ
```html
<!-- Vue.js -->
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify/themes/vue.css">

<!-- buble -->
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify/themes/buble.css">

<!-- dark -->
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify/themes/dark.css">

<!-- pure -->
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify/themes/pure.css">
```

## カスタムCSS

### 日本語フォント対応
```css
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans Japanese", "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "メイリオ", Meiryo, sans-serif;
}
```

### コードブロックのスタイル
```css
.markdown-section pre {
  background-color: #f8f8f8;
  border-radius: 6px;
  padding: 1.2em;
  line-height: 1.5;
}
```

## SEO対策

### メタタグの設定
```html
<meta name="description" content="サイトの説明">
<meta name="keywords" content="キーワード1,キーワード2">
<meta property="og:title" content="サイトタイトル">
<meta property="og:description" content="サイトの説明">
<meta property="og:image" content="画像URL">
```

## 完全なindex.html例
```html
<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="UTF-8" />
        <title>勤怠管理+ | Reflenge</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="description" content="Reflenge開発 | by mosunset" />
        <meta property="og:title" content="勤怠管理+ | Reflenge" />
        <meta property="og:description" content="Reflenge開発 | by mosunset" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:image" content="logo.png" />
        <meta property="og:image:alt" content="Reflenge | ロゴ" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="勤怠管理+ | Reflenge" />
        <meta name="twitter:description" content="Reflenge開発 | by mosunset" />
        <meta name="twitter:image" content="logo.png" />
        <meta name="twitter:image:alt" content="Reflenge | ロゴ" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, minimum-scale=1.0"
        />
        <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/docsify@4/lib/themes/vue.css"
        />
        <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.css"
        />
        <link rel="icon" href="favicon.ico" />
    </head>
    <body>
        <div id="app">Please wait...</div>
        <script>
            let svgCounter = 0;
            window.$docsify = {
                // logo: 'logo.png', // nameとの排他表示になるため_sidebar.mdにlogoを設定している
                name: "勤怠管理+",
                repo: "mosunset/reflenge-work-management",
                loadSidebar: true,
                loadNavbar: true,
                subMaxLevel: 3,
                maxLevel: 4,
                auto2top: true,
                coverpage: false,
                executeScript: true,
                noEmoji: false,
                mergeNavbar: true,
                formatUpdated: "{YYYY}/{MM}/{DD} {HH}:{mm}:{ss}.{fff}",
                notFoundPage: true,
                relativePath: false,
                topMargin: 100,
                markdown: {
                    renderer: {
                        code(code, lang) {
                            if (lang === "mermaid") {
                                const svgName = `mermaid-svg-${svgCounter++}`;
                                const MERMAID_CONTAINER_ID = `${svgName}-container`;

                                mermaid
                                    .render(svgName, code)
                                    .then(({ svg }) => {
                                        const containerElement =
                                            document.querySelector(
                                                `#${MERMAID_CONTAINER_ID}`
                                            );
                                        if (containerElement) {
                                            containerElement.innerHTML = svg;
                                        } else {
                                            console.error(
                                                `Error: #${MERMAID_CONTAINER_ID} not found`
                                            );
                                        }
                                    });
                                return `<div class="mermaid" id="${MERMAID_CONTAINER_ID}"></div>`;
                            }
                            return this.origin.code.apply(this, arguments);
                        },
                    },
                },
                search: {
                    maxAge: 86400000,
                    paths: "auto",
                    placeholder: "🔍 ドキュメントを検索...",
                    noData: "❌ 検索結果がありません",
                    depth: 3,
                    hideOtherSidebarContent: false,
                },
                copyCode: {
                    buttonText: "コピー",
                    errorText: "エラー",
                    successText: "コピー完了",
                },
                pagination: {
                    previousText: "⬅️ 前のページ",
                    nextText: "次のページ ➡️",
                    crossChapter: true,
                    crossChapterText: true,
                },
                tabs: {
                    persist: true,
                    sync: true,
                    theme: "classic",
                    tabComments: true,
                    tabHeadings: true,
                },
                externalLinkRel: "noopener noreferrer nofollow",
                externalLinkTarget: "_blank",
                routerMode: "hash",
                alias: {
                    "/.*/_sidebar.md": "/_sidebar.md",
                },
                plugins: [
                    function (hook, vm) {
                        hook.beforeEach(function (html) {
                            const url =
                                "https://github.com/mosunset/reflenge-work-management/blob/main/docs/" +
                                vm.route.file;
                            const editHtml =
                                "[:memo: ドキュメントを編集](" + url + ")\n";
                            return editHtml + html;
                        });

                        // hook.doneEach(function () {
                        //     // ページタイトルを動的に設定
                        //     const title = document.querySelector("h1");
                        //     if (title) {
                        //         if (title.textContent === "🏠 ホーム") {
                        //             document.title = "勤怠管理+ | Reflenge";
                        //         } else {
                        //             document.title =
                        //                 title.textContent +
                        //                 " | 勤怠管理+ | Reflenge";
                        //         }
                        //     }
                        // });
                    },
                ],
            };
        </script>
        <!-- Docsify v4 -->
        <script src="//cdn.jsdelivr.net/npm/docsify@4"></script>
        <script src="//cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>

        <!-- プラグイン -->
        <script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/search.min.js"></script>
        <script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/emoji.min.js"></script>
        <script src="//cdn.jsdelivr.net/npm/docsify-copy-code@2"></script>
        <script src="//cdn.jsdelivr.net/npm/docsify-pagination/dist/docsify-pagination.min.js"></script>
        <script src="//cdn.jsdelivr.net/npm/docsify-tabs@1"></script>
        <script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/zoom-image.min.js"></script>
        <script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/external-script.min.js"></script>

        <!-- 言語サポート -->
        <script src="//cdn.jsdelivr.net/npm/prismjs@1/components/prism-bash.min.js"></script>
        <script src="//cdn.jsdelivr.net/npm/prismjs@1/components/prism-javascript.min.js"></script>
        <script src="//cdn.jsdelivr.net/npm/prismjs@1/components/prism-typescript.min.js"></script>
        <script src="//cdn.jsdelivr.net/npm/prismjs@1/components/prism-json.min.js"></script>
        <script src="//cdn.jsdelivr.net/npm/prismjs@1/components/prism-sql.min.js"></script>
        <script src="//cdn.jsdelivr.net/npm/prismjs@1/components/prism-rust.min.js"></script>
        <script src="//cdn.jsdelivr.net/npm/prismjs@1/components/prism-yaml.min.js"></script>
        <script src="//cdn.jsdelivr.net/npm/prismjs@1/components/prism-docker.min.js"></script>
    </body>
</html>
```