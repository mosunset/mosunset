# Docsify 導入方法

## 概要
DocsifyはMarkdownファイルを使って静的サイトを生成するツールです。

**公式サイト**: [https://docsify.js.org/](https://docsify.js.org/)  
**GitHub**: [https://github.com/docsifyjs/docsify](https://github.com/docsifyjs/docsify)

## インストール

### 1. Node.jsの準備
```bash
# Node.jsがインストールされていることを確認
node --version
npm --version
```

### 2. Docsifyのインストール
```bash
# グローバルインストール
npm i docsify-cli -g

# またはローカルインストール
npm install docsify-cli --save-dev
```

### 3. プロジェクトの初期化
```bash
# 新しいディレクトリを作成
mkdir my-docs
cd my-docs

# Docsifyプロジェクトを初期化
docsify init ./docs
```

### 4. ローカルサーバーの起動
```bash
# 開発サーバーを起動
docsify serve docs

# カスタムポートで起動
docsify serve docs --port 3000
```

## ファイル構成
```
docs/
├── index.html    # メインHTMLファイル
├── README.md     # ホームページ
└── _sidebar.md   # サイドバー設定
```

## 基本設定

### index.htmlの設定
```html
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta charset="UTF-8">
  <title>Document</title>
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify/themes/vue.css">
</head>
<body>
  <div id="app"></div>
  <script>
    window.$docsify = {
      name: '',
      repo: ''
    }
  </script>
  <script src="//cdn.jsdelivr.net/npm/docsify/lib/docsify.min.js"></script>
</body>
</html>
```