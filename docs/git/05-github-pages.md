# GitHub Pagesでのデプロイ

## 概要

GitHub Pages を利用すると、GitHub 上のリポジトリをそのままホスティングして静的サイトを公開できます。ここでは Jekyll や React/Vue などの SPA を想定し、`gh-pages` ブランチを使った手動デプロイと GitHub Actions による自動デプロイの 2 パターンを中心に解説します。

## 詳細

### 1. GitHub Pages の種類と仕組み

| 種類 | ホストパス | ビルド方法 |
| ---- | ---------- | ---------- |
| User/Org サイト | `https://<user>.github.io/` | `main` or `master` ブランチの root 直下を公開 |
| Project サイト  | `https://<user>.github.io/<repo>/` | `gh-pages` ブランチ もしくは `/docs` フォルダを公開 |

設定画面: リポジトリ → Settings → Pages。

---

### 2. gh-pages ブランチを使った手動デプロイ

#### dist ディレクトリをそのまま push

```bash
npm run build              # 例: React のビルド成果物が dist/

git checkout -B gh-pages   # 強制で gh-pages ブランチを作成
cp -r dist/* .             # ルート直下へコピー (シンプルな例)

git add .
git commit -m "build: deploy"
git push -f origin gh-pages
```

`-f` は履歴を上書きするため毎回のデプロイで必要です。

#### git subtree を利用

```bash
# main ブランチにいる想定
git subtree push --prefix dist origin gh-pages
```

履歴を残したい場合に便利です。

---

### 3. GitHub Actions で自動デプロイ

`.github/workflows/gh-pages.yml` の例（Node.js プロジェクト）:

**注意**: 2025年現在、GitHub Pages は全て GitHub Actions でビルド・デプロイされます。peaceiris/actions-gh-pages は v4 が最新版です。

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          publish_branch: gh-pages
```

push すると自動で `gh-pages` ブランチへビルド成果物がコミットされます。

---

### 4. カスタムドメインと HTTPS 設定

1. DNS で `CNAME` か `A` レコードを `yourdomain.com` → `yourname.github.io` に向ける。
2. リポジトリの `Settings → Pages → Custom domain` にドメインを入力。
3. 「Enforce HTTPS」を有効にする。

`CNAME` ファイルが自動で作成されるか、自分で `CNAME` を追加して以下のようにコミットします:

```bash
echo "yourdomain.com" > CNAME
git add CNAME
git commit -m "chore: add CNAME"
```

---

### 5. トラブルシュート

| 症状 | 原因と対策 |
| ---- | ---------- |
| 404 エラー | 出力ディレクトリを間違えている / `base` URL の設定ミス (React Router の `basename` など) |
| CSS/JS が読み込まれない | 相対パスが誤っている。プロジェクトサイトは `/repo/` が付与される点に注意 |
| Custom domain で HTTPS 化が終わらない | DNS 変更の伝搬待ち (最大 48h) |
| `fatal: subtree: command not found` | Git のバージョンが古い (< 2.13) |

---

以上で GitHub Pages によるデプロイの基本が完了です。CI を組み合わせることで、ブランチに push するだけで自動公開できるワークフローを構築できます。
