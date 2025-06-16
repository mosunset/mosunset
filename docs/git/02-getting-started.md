# プログラミング開始

## 概要

ここでは「リポジトリを用意して最初の 1 行をコミットする」までの最小限の Git ワークフローを、具体的なコマンド例とともに解説します。

## 詳細

### 1. リポジトリの作成

#### git init

```bash
mkdir my-project && cd my-project
git init  # .git ディレクトリが生成される
```

`git init` は空のリポジトリを作成します。プロジェクトを 0 から始めるときに使用します。

#### git clone

既存のリモートリポジトリからコピーする場合:

```bash
git clone git@github.com:user/repo.git
cd repo
```

`--depth 1` を付けると履歴を浅くクローンできます。

---

### 2. ファイルの追跡とコミット

#### git add

```bash
echo "# My Project" > README.md
git add README.md           # ファイルをステージ（index）へ追加
git add .                   # カレント以下すべてを追加
```

覚えておきたいオプション:

| オプション | 説明 |
| ---------- | ---- |
| `-n` / `--dry-run` | 実際には追加せず、何が追加されるかを表示 |
| `-p` | 対話的に hunk 単位で追加 |

#### git commit

```bash
git commit -m "docs: add README"
```

エディタでメッセージを書きたいときは `-m` を省略します。最初の行（50 文字以内推奨）がタイトル、その後空行、本文という書式が一般的です。

---

### 3. 変更履歴の閲覧

| コマンド | 用途 |
| -------- | ---- |
| `git status` | ステージ・作業ツリーの状態を確認 |
| `git diff` | ステージされていない変更を確認 |
| `git diff --staged` | ステージ済み変更を確認 |
| `git log --oneline --graph --decorate` | コンパクトな履歴表示 |

例:

```bash
git status
# On branch main
#   (use "git add <file>..." to update what will be committed)

# 変更点を確認
git diff README.md
```

---

### 4. リモートリポジトリの設定と操作

#### リモートの追加・確認

```bash
git remote add origin git@github.com:user/repo.git
git remote -v         # origin が追加されたか確認
```

#### git push / git pull

```bash
git push -u origin main      # 初回のみ -u で upstream を設定
git pull --rebase origin main
```

`--rebase` はローカルのコミットをきれいに保つのに便利ですが、公開済みコミットの書き換えには注意してください。

---

### 5. GitHub への初回プッシュ

1. GitHub 上で新しいリポジトリを作成（`user/repo`）。
2. ターミナルでリモートを追加: `git remote add origin git@github.com:user/repo.git`。
3. プッシュ: `git push -u origin main`。

GitHub では push したブランチがデフォルトブランチになります（設定で変更可）。

---

これでローカル → リモートへの基本的なフローは完了です。次章では、より複雑な操作（ブランチ、タグ、スタッシュなど）を扱います。
