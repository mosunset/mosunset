# Git 高度な機能

## 概要

Git 2.49（2025年3月）で追加された新機能や、大規模リポジトリ向けの高度な機能を解説します。これらの機能により、モノレポや巨大なコードベースでも快適に作業できるようになります。

## 詳細

### 1. Sparse-checkout（部分的チェックアウト）

大規模モノレポで必要なディレクトリのみを取得：

```bash
# sparse-checkout を初期化
git sparse-checkout init --cone

# 必要なディレクトリを指定
git sparse-checkout set apps/frontend libs/shared

# 設定を確認
git sparse-checkout list

# 無効化する場合
git sparse-checkout disable
```

### 2. Git Worktree（複数作業ツリー）

同じリポジトリで複数ブランチを同時に作業：

```bash
# 新しい worktree を作成
git worktree add ../project-hotfix hotfix/urgent-fix

# worktree 一覧
git worktree list

# 不要になったら削除
git worktree remove ../project-hotfix
```

#### Worktree + Sparse-checkout の組み合わせ

```bash
# 新しい worktree を作成（チェックアウトなし）
git worktree add --no-checkout ../feature-branch feature/new-ui

# sparse-checkout を設定
cd ../feature-branch
git sparse-checkout init --cone
git sparse-checkout set apps/ui components/shared
git checkout
```

### 3. Git Backfill（Git 2.49 新機能）

スパースクローンで履歴を効率的にダウンロード：

```bash
# バッチサイズを指定してバックフィル
git backfill --min-batch-size=100
```

### 4. FSMonitor（ファイルシステム監視）

大規模リポジトリで `git status` を高速化：

```bash
# FSMonitor を有効化
git config core.fsmonitor true

# 組み込みデーモンを使用（推奨）
git config core.useBuiltinFSMonitor true
```

### 5. Partial Clone（部分クローン）

```bash
# blob を遅延ダウンロード
git clone --filter=blob:none <url>

# 特定サイズ以上のファイルを除外
git clone --filter=blob:limit=1m <url>

# ツリーオブジェクトも除外（最小クローン）
git clone --filter=tree:0 <url>
```

### 6. マルチパックインデックス

大規模リポジトリのパフォーマンス向上：

```bash
# マルチパックインデックスを作成
git multi-pack-index write

# 定期的な最適化
git multi-pack-index repack
```

### 7. Commit Graph

コミット履歴の探索を高速化：

```bash
# commit-graph を生成
git commit-graph write --reachable

# 増分更新
git commit-graph write --reachable --changed-paths
```

### 8. 新しいハッシュアルゴリズム（Git 2.49）

```bash
# Path-Hash v2 を使用してリパック（性能向上）
git repack -adf --path-walk
```

### 9. Interactive Rebase の高度な使い方

```bash
# fixup コミットを自動的にまとめる
git commit --fixup=HEAD~2
git rebase -i --autosquash HEAD~5

# rebase 中の操作
# pick: そのまま使用
# reword: コミットメッセージを変更
# edit: コミットを修正
# squash: 前のコミットと結合
# fixup: squash と同じだがメッセージは破棄
# drop: コミットを削除
```

### 10. Rerere（再利用可能な競合解決）

```bash
# rerere を有効化
git config rerere.enabled true

# 記録された解決を確認
git rerere status

# 不要な記録を削除
git rerere gc
```

---

これらの高度な機能を活用することで、大規模プロジェクトでも効率的に作業できます。特に Git 2.49 の新機能は、マイクロソフトの FluentUI のような巨大リポジトリでパック時間を 96秒から 34秒に、サイズを 439MB から 160MB に削減するなど、劇的な改善をもたらしています。