# Docsify おすすめ設定

docsify v5 を前提にした設定です。CDN の URL は、メジャーバージョン（`@5` など）まで指定しておくと、新しいメジャー版が出た時に勝手に壊れません。

## 基本設定

### window.$docsifyの設定
```javascript
window.$docsify = {
  name: 'プロジェクト名',
  repo: 'https://github.com/username/repo',
  loadSidebar: true,
  maxLevel: 4,
  subMaxLevel: 2,
  auto2top: true,
  notFoundPage: true,   // _404.md を 404 ページとして使う
  search: 'auto',
  copyCode: {
    buttonText: 'コピー',
    errorText: 'エラー',
    successText: '完了'
  }
}
```

`loadNavbar` は `_navbar.md` を置いた時だけ有効にします。ファイルが無いのに有効にすると、毎回 404 のリクエストが飛びます。

## 便利なプラグイン

### 1. 検索機能
```html
<script src="https://cdn.jsdelivr.net/npm/docsify@5/dist/plugins/search.min.js"></script>
```

### 2. コードコピー機能
```html
<script src="https://cdn.jsdelivr.net/npm/docsify-copy-code@3"></script>
```

### 3. ズーム機能
```html
<script src="https://cdn.jsdelivr.net/npm/docsify@5/dist/plugins/zoom-image.min.js"></script>
```

### 4. ページ送り
```html
<script src="https://cdn.jsdelivr.net/npm/docsify-pagination@2/dist/docsify-pagination.min.js"></script>
```

### 5. Markdown 内の script を実行
Markdown に書いた `<script>` を動かしたい時だけ入れます。
```html
<script src="https://cdn.jsdelivr.net/npm/docsify@5/dist/plugins/external-script.min.js"></script>
```

### 絵文字
v5 では本体に入っているので、プラグインは要りません。`:smile:` のように書くとそのまま絵文字になります。

## テーマ

### 公式テーマ
v5 では、土台の `core.css` に、見た目を変える addon を重ねます。
```html
<!-- 土台（必須） -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/docsify@5/dist/themes/core.min.css">

<!-- Vue 風 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/docsify@5/dist/themes/addons/vue.min.css">

<!-- ダーク -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/docsify@5/dist/themes/addons/core-dark.min.css">
```

## カスタムCSS

v5 のテーマは CSS 変数で組まれているので、まず変数を上書きするのが簡単です。

### 色とフォント
```css
:root {
  --color-bg: #fbf6f0;
  --color-text: #3a3140;
  --theme-color: #d9482f;
  --font-family: "IBM Plex Sans JP", system-ui, sans-serif;
  --font-family-mono: "JetBrains Mono", ui-monospace, monospace;
}
```

### コードブロックのスタイル
```css
:root {
  --codeblock-bg: #241d2b;
  --codeblock-color: #efe6f2;
  --border-radius: 10px;
}
```

### 固定ヘッダーがある時のスクロール位置
v4 の `topMargin` は v5 で非推奨になりました。代わりに CSS 変数を使います。
```css
:root {
  --scroll-padding-top: 88px;
}
```

## SEO対策

### メタタグの設定
`og:image` は、相対パスではなく `https://` から始まる URL で書きます。
```html
<meta name="description" content="サイトの説明">
<meta property="og:title" content="サイトタイトル">
<meta property="og:description" content="サイトの説明">
<meta property="og:image" content="https://example.com/ogp.png">
```

## mermaid の図を使う

mermaid の ESM 版を、図があるページを開いた時だけ読み込みます。v5 では `renderer.code` に `{ text, lang }` が渡される点に注意します。
```javascript
let mermaidPromise;

window.$docsify.markdown = {
  renderer: {
    code({ text, lang }) {
      if (lang === 'mermaid') {
        const escaped = text.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);
        return `<pre class="mermaid">${escaped}</pre>`;
      }
      return this.origin.code.apply(this, arguments);
    }
  }
};

window.$docsify.plugins = [
  (hook) => {
    hook.doneEach(async () => {
      const nodes = [...document.querySelectorAll('.markdown-section .mermaid')];
      if (nodes.length === 0) return;

      mermaidPromise ??= import('https://cdn.jsdelivr.net/npm/mermaid@12/dist/mermaid.esm.min.mjs')
        .then(({ default: mermaid }) => mermaid);
      const mermaid = await mermaidPromise;
      mermaid.initialize({ startOnLoad: false });
      await mermaid.run({ nodes });
    });
  }
];
```

## 完全なindex.html例

1 ファイルにまとめた例です（[このサイトの index.html](https://github.com/mosunset/mosunset/blob/main/docs/index.html) も同じ作りです）。

```html
<!doctype html>
<html lang="ja">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>プロジェクト名</title>
        <meta name="description" content="サイトの説明" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="プロジェクト名" />
        <meta property="og:description" content="サイトの説明" />
        <meta property="og:image" content="https://example.com/ogp.png" />
        <link rel="icon" href="favicon.ico" />

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/docsify@5/dist/themes/core.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/docsify@5/dist/themes/addons/vue.min.css" />
        <style>
            :root {
                --theme-color: #d9482f;
            }
        </style>
    </head>
    <body>
        <div id="app"></div>
        <script>
            window.$docsify = {
                name: "プロジェクト名",
                repo: "username/repo",
                loadSidebar: true,
                maxLevel: 4,
                subMaxLevel: 2,
                auto2top: true,
                notFoundPage: true,
                externalLinkTarget: "_blank",
                externalLinkRel: "noopener noreferrer",
                search: {
                    paths: "auto",
                    depth: 3,
                    maxAge: 86400000,
                    placeholder: "検索",
                    noData: "見つかりませんでした",
                },
                copyCode: {
                    buttonText: "コピー",
                    errorText: "エラー",
                    successText: "コピーしました",
                },
                pagination: {
                    previousText: "前のページ",
                    nextText: "次のページ",
                    crossChapter: true,
                    crossChapterText: true,
                },
                plugins: [
                    // 記事の最後に「GitHub で編集」のリンクを付ける
                    (hook, vm) => {
                        hook.afterEach((html) => {
                            const url = `https://github.com/username/repo/blob/main/docs/${vm.route.file}`;
                            return `${html}<p><a href="${url}" target="_blank">GitHub で編集</a></p>`;
                        });
                    },
                ],
            };
        </script>

        <!-- docsify 本体と公式プラグイン -->
        <script src="https://cdn.jsdelivr.net/npm/docsify@5/dist/docsify.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/docsify@5/dist/plugins/search.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/docsify@5/dist/plugins/zoom-image.min.js"></script>

        <!-- サードパーティのプラグイン -->
        <script src="https://cdn.jsdelivr.net/npm/docsify-copy-code@3"></script>
        <script src="https://cdn.jsdelivr.net/npm/docsify-pagination@2/dist/docsify-pagination.min.js"></script>

        <!-- コードハイライト（使う言語だけ足す） -->
        <script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-bash.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-powershell.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-yaml.min.js"></script>
    </body>
</html>
```
