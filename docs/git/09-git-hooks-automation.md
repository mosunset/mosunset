# Git Hooks と自動化

## 概要

Git Hooks を使用すると、コミット前のコード品質チェック、コミットメッセージの検証、自動テストの実行など、開発ワークフローを自動化できます。2025年現在、Husky v9 が最も人気のあるフック管理ツールとなっています。

## 詳細

### 1. Git Hooks の基本

Git Hooks は特定のイベントで実行されるスクリプトです：

| フック名 | 実行タイミング | 用途例 |
| -------- | -------------- | ------ |
| pre-commit | コミット前 | コード整形、構文チェック |
| commit-msg | コミットメッセージ作成後 | メッセージ形式の検証 |
| pre-push | プッシュ前 | テスト実行、ビルド確認 |
| post-merge | マージ後 | 依存関係の更新 |

### 2. Husky v9 のセットアップ

```bash
# Husky をインストール
npm install --save-dev husky

# Git hooks を有効化
npx husky init

# package.json に prepare スクリプトを追加
npm pkg set scripts.prepare="husky"
```

### 3. pre-commit フックの設定

```bash
# pre-commit フックを作成
echo "npm test" > .husky/pre-commit

# より高度な例
cat > .husky/pre-commit << 'EOF'
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# コードの自動整形
npm run format

# リンター実行
npm run lint

# 型チェック
npm run typecheck
EOF
```

### 4. lint-staged との連携

変更されたファイルのみをチェック：

```bash
# lint-staged をインストール
npm install --save-dev lint-staged

# package.json に設定追加
```

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

```bash
# Husky フックを更新
echo "npx lint-staged" > .husky/pre-commit
```

### 5. コミットメッセージの検証

```bash
# commitlint をインストール
npm install --save-dev @commitlint/{config-conventional,cli}

# 設定ファイルを作成
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js

# commit-msg フックを追加
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

### 6. 条件付き実行

```bash
# CI環境では無効化
cat > .husky/pre-commit << 'EOF'
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# CI環境ではスキップ
[ -n "$CI" ] && exit 0

npm test
EOF
```

### 7. カスタムフックの例

#### ブランチ名の検証

```bash
cat > .husky/pre-push << 'EOF'
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

branch=$(git rev-parse --abbrev-ref HEAD)
valid_branch_regex="^(feature|bugfix|hotfix|release)\/[a-z0-9-]+$"

if ! echo "$branch" | grep -qE "$valid_branch_regex"; then
  echo "ブランチ名が命名規則に従っていません: $branch"
  echo "例: feature/add-login, bugfix/fix-typo"
  exit 1
fi
EOF
```

### 8. パフォーマンスの最適化

```bash
# 時間のかかるタスクは pre-push へ
cat > .husky/pre-push << 'EOF'
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# 統合テスト（時間がかかる）
npm run test:integration

# ビルドの確認
npm run build
EOF
```

### 9. チーム共有の設定

```bash
# .husky ディレクトリをコミット
git add .husky
git commit -m "chore: add git hooks"

# チームメンバーへの指示をREADMEに追加
echo "
## セットアップ
\`\`\`bash
npm install  # prepare スクリプトが自動的に husky を設定
\`\`\`
" >> README.md
```

### 10. トラブルシューティング

```bash
# フックが実行されない場合
git config core.hooksPath .husky

# 一時的に無効化
HUSKY=0 git commit -m "skip hooks"

# GUI での問題対処（~/.config/husky/init.sh）
echo "export PATH=\"$PATH:/usr/local/bin\"" > ~/.config/husky/init.sh
```

---

Git Hooks は開発品質を自動的に維持する強力なツールです。Husky v9 は 2KB という軽量さで、150万以上のプロジェクトで使用されています。適切に設定することで、チーム全体のコード品質を向上させることができます。