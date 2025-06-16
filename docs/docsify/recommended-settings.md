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
  <meta charset="UTF-8">
  <title>ドキュメント</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="description" content="Description">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify/lib/themes/vue.css">
</head>
<body>
  <div id="app"></div>
  <script>
    window.$docsify = {
      name: 'ドキュメント',
      repo: 'https://github.com/username/repo',
      loadSidebar: true,
      loadNavbar: true,
      mergeNavbar: true,
      maxLevel: 4,
      subMaxLevel: 2,
      auto2top: true,
      homepage: 'README.md',
      search: {
        maxAge: 86400000,
        paths: 'auto',
        placeholder: '検索',
        noData: '見つかりません',
        depth: 4,
        hideOtherSidebarContent: false
      },
      copyCode: {
        buttonText: 'コピー',
        errorText: 'エラー',
        successText: '完了'
      }
    }
  </script>
  <!-- Docsify v4 -->
  <script src="//cdn.jsdelivr.net/npm/docsify@4"></script>
  <!-- プラグイン -->
  <script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/search.min.js"></script>
  <script src="//cdn.jsdelivr.net/npm/docsify-copy-code@2"></script>
  <script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/zoom-image.min.js"></script>
  <script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/emoji.min.js"></script>
</body>
</html>
```