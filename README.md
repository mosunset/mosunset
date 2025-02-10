# mosunset

[mosunset website](https://mosunset.com)

## **Git の使い方 （自分向け 超初心者用＋ α）**

## 目次

1. [Git の初期設定](#git-の初期設定)
2. [Git リポジトリの作成](#git-リポジトリの作成)
3. [ローカルでの基本操作](#ローカルでの基本操作)
4. [リモートリポジトリとの連携](#リモートリポジトリとの連携)
5. [複数ブランチによる開発（チーム開発向け）](#複数ブランチによる開発チーム開発向け)
6. [コミットの取り消し方法](#コミットの取り消し方法)
7. [変更の一時退避 (stash)](#変更の一時退避-stash)
8. [Git のバージョン確認・アップデート](#git-のバージョン確認アップデート)
9. [Git ログの確認](#git-ログの確認)
10. [`.gitignore` によるファイル無視設定](#gitignore-によるファイル無視設定)
11. [コンフリクトとその解消](#コンフリクトとその解消)
12. [rebase の活用](#rebase-の活用)
13. [cherry-pick で特定のコミットのみ適用](#cherry-pick-で特定のコミットのみ適用)
14. [Git のフック (hooks)](#git-のフック-hooks)
15. [submodule (サブモジュール)](#submodule-サブモジュール)
16. [Git Bisect でバグを特定](#git-bisect-でバグを特定)
17. [参考情報](#参考情報)

## Git の初期設定

Git を使い始める前に、ユーザー情報を設定します。コミットした際に「誰が変更を行ったか」を記録するための情報です。

```bash
# ユーザー名の設定（PC/環境ごとに適切に設定）
git config --global user.name "あなたの名前"

# メールアドレスの設定（連絡が取れるメールアドレス）
git config --global user.email "あなたのメールアドレス"

# Gitの初期ブランチ名を"main"に設定
git config --global init.defaultbranch main
```

## Git リポジトリの作成

### 新規のプロジェクト（フォルダ）で Git を使い始める場合

```bash
# 新しいリポジトリを作成
git init
```

-   これで `.git` フォルダが作成され、Git の管理対象フォルダになります。

## ローカルでの基本操作

### 1. 作業状況の確認

```bash
git status
```

-   **ステージングされた変更**：コミット準備が整ったファイル
-   **ステージングされていない変更**：編集はしたがコミット準備をしていないファイル
-   **未追跡ファイル**：新規に作ったファイルで、Git がまだ管理していないもの

### 2. 変更をステージングしてコミットする

```bash
# すべての変更をステージング（追跡ファイル・未追跡ファイル含む）
git add --all

# コミットを実行（"-m"オプションでメッセージを付与）
git commit -m "ここにコミットメッセージを書く"
```

#### `git add` の選択範囲の違い

| コマンド                  | 新規ファイル | 変更ファイル | 削除ファイル |           適用範囲           |
| :------------------------ | :----------: | :----------: | :----------: | :--------------------------: |
| `git add -u` (`--update`) |      ×       |      ○       |      ○       |  リポジトリ全体（追跡済み）  |
| `git add -A` (`--all`)    |      ○       |      ○       |      ○       |        リポジトリ全体        |
| `git add .`               |      ○       |      ○       |      ○       | **カレントディレクトリ以下** |

#### ステージングを取り消す

-   **最初のコミット前**（まだコミットが 1 つもない場合）:
    ```bash
    git rm --cached ファイル名
    git rm --cached -r ディレクトリ名
    git rm --cached -r .
    ```
-   **2 回目以降**（既にコミットがある場合）:

    ```bash
    git restore --staged ファイル名   # 最近のGit推奨コマンド
    git restore --staged .           # ステージング全体を解除

    # または
    git reset HEAD ファイル名
    git reset HEAD .
    ```

## リモートリポジトリとの連携

GitHub などのホスティングサービスを使うと、**複数の端末で同じプロジェクトを共有**したり、**他の人と共同開発**したりできます。

### 1. リポジトリをリモートに紐づける

```bash
# すでにローカルのブランチ名を main にしている場合
git branch -M main

# リモートリポジトリを追加（GitHubなどで作成したURLを使う）
git remote add origin https://github.com/ユーザ名/リポジトリ名.git
```

### 2. リモートにプッシュ

```bash
# 初回プッシュは、-uを付けてローカルブランチとリモートブランチを紐づける
git push -u origin main

# 2回目以降は
git push
```

### 3. リポジトリをクローン（まだ何もローカルにない場合）

```bash
git clone https://github.com/ユーザ名/リポジトリ名.git
```

### 4. リモートから最新を取り込む（既にクローン済みの場合）

```bash
# (1) fetchでリモートの更新を取得し
git fetch origin main

# (2) mergeして取り込む
git merge origin/main

# まとめてやりたい場合は pull
git pull origin main
```

## 複数ブランチによる開発（チーム開発向け）

1 人でもブランチを使うと「動く状態を保つ main」「試作コードを試す branch」など役割分担ができて便利です。複数人で開発する場合は特に重要になります。

### 1. ブランチの作成と切り替え

```bash
# "feature/new_function" というブランチを新しく作成し、切り替える
git checkout -b feature/new_function
```

### 2. ブランチで作業してコミット

```bash
# コードを書いた後、ステージ＆コミット
git add .
git commit -m "新機能を実装"
```

### 3. ブランチをリモートへプッシュ

```bash
git push -u origin feature/new_function
```

-   これで他のメンバーも同じブランチを取得できるようになります。

### 4. ブランチをマージする

#### ローカルでのマージ例

```bash
# mainブランチへ切り替え
git checkout main

# mainにfeature/new_functionを取り込む
git merge feature/new_function
```

-   コンフリクトがある場合は、手動で該当ファイルを修正 → ステージ → コミットして解決。

#### プルリクエスト (Pull Request)

-   GitHub を使う場合、branch をプッシュ後にプルリクエストを作成し、レビューを経て `main` にマージする流れが一般的です。

## コミットの取り消し方法

### 1. ソフトリセット

直前のコミットを取り消し、**ワークツリーの変更は保持**したままにします。

```bash
git reset --soft HEAD^
```

-   `HEAD^` は 1 つ前のコミットを指す。
-   `HEAD~2` のようにすると 2 つ前など、数字で指定可能。

### 2. ハードリセット

直前のコミットを取り消し、**作業ツリーの変更も巻き戻す**ので注意が必要です。

```bash
git reset --hard HEAD^
```

> **注意**: ローカルの変更が消えるので、慎重に行う。

### 3. リモートに push 済みのコミットを取り消す場合

```bash
# ローカルでは reset などで取り消した後
git push --force
```

> **--force** は、他のメンバーの作業を壊す可能性もあるため要注意。

### 4. `revert` でコミットを“打ち消す”

過去のコミットに対して“打ち消し”を行うコミットを作成するので、**履歴を残したまま内容を元に戻す**方法です。

```bash
git revert <コミットハッシュ>
```

### 5. `commit --amend` で直前のコミットを上書き

コミットメッセージや直後のちょっとした修正をまとめたい場合に有効です。

```bash
git commit --amend
```

> push 後にこれを行うと履歴が変わるため、やはり注意が必要です。

## 変更の一時退避 (stash)

コミットするほどではない作業内容を一時的に中断したいときに使います。

```bash
# 現在の作業を stash（退避）
git stash

# 再開したいときに取り出す
git stash pop
```

-   複数回 stash を溜め込むことも可能 ( `git stash list` で一覧が見られる )。
-   具体的な stash を取り出したい場合：
    ```bash
    git stash apply stash@{2}
    ```

## Git のバージョン確認・アップデート

### バージョン確認

```bash
git version
```

### Windows でのアップデート（Git for Windows 使用時）

```bash
git update-git-for-windows
```

## Git ログの確認

コミット履歴の確認:

```bash
git log
```

-   一覧を簡潔に見る場合は `git log --oneline` が便利。
-   ログに変更差分も見たい場合: `git log -p`
-   グラフィカルにブランチを把握したい場合: `git log --oneline --graph --decorate --all`

## `.gitignore` によるファイル無視設定

プロジェクトによっては、ビルド成果物や個人設定ファイルなど、管理対象にしたくないファイル・ディレクトリが出てきます。
それらをコミット対象外にするために `.gitignore` ファイルを用います。

-   例: Node.js プロジェクトなら `node_modules/`
-   例: Python プロジェクトなら `__pycache__/`
-   例: OS のファイルなら `.DS_Store`（macOS） など

書き方の例:

```gitignore
# これ以降は node_modules フォルダ配下をすべて無視
node_modules/

# 末尾にスラッシュなしの場合は、ファイルも含む
*.log  # すべての.logファイル
```

`.gitignore` のテンプレートは [GitHub 公式の .gitignore テンプレート](https://github.com/github/gitignore) などで調べるのが便利です。

## コンフリクトとその解消

他のブランチやリモートリポジトリの変更と自分の変更が競合した場合、コンフリクト（競合）が発生します。
コンフリクトが起きると、該当ファイルに下記のような記号が追加されます:

```diff
<<<<<<< HEAD
ここが自分の変更
=======
ここが相手の変更
>>>>>>> branch_name
```

### 解消手順

1. 衝突しているファイルを手動で修正する
   （不要な記号 `<<<<<<< ======= >>>>>>>` を削除し、正しい形に整える）
2. 修正後、再度ステージング (`git add`) してコミット

> コンフリクトは作業中に避けて通れないものなので、落ち着いてファイル内容を統合してください。

## rebase の活用

### 1. rebase とは

`git merge` と同様にブランチを統合するコマンドですが、コミット履歴を「きれい」にするために使われることが多いです。
`feature` ブランチを `main` に rebase すると、コミットの整列が変わり、あたかも `main` の最後から開発が始まったかのような履歴に書き換えられます。

### 2. 基本的な使い方

```bash
# featureブランチで作業をしていたとして、mainの最新を取り込みたい場合
git checkout feature
git fetch origin main
git rebase origin/main
```

-   ここでコンフリクトが起こった場合は、同じくファイルを手動で修正 → `git add` → `git rebase --continue`。

### 3. 互いに push 済みの場合の注意点

-   rebase はコミットの履歴を変えてしまうため、**既にリモートに push 済みのブランチ**に対して行う場合は、チーム内でルールを決めるか注意して実施しましょう。
-   変更後は `git push --force` が必要になることが多いです。

### 4. インタラクティブ rebase ( `rebase -i` )

-   過去のコミットをまとめる (squash)、メッセージを修正 (reword) など、細かい履歴操作が可能です。
-   例: 過去 3 コミットをまとめて 1 つにする等。

```bash
git rebase -i HEAD~3
```

## cherry-pick で特定のコミットのみ適用

`cherry-pick` は、特定のコミットだけを別のブランチに取り込むコマンドです。

```bash
# mainブランチにいる状態で、featureブランチのコミットabc123だけ取り込みたい
git cherry-pick abc123
```

-   他のブランチで修正されたバグ修正コミットだけ欲しい...といったシチュエーションで便利です。

## Git のフック (hooks)

特定の操作（コミットやマージなど）が実行されるタイミングで、自動的にスクリプトを実行する仕組みが **Git Hooks** です。
代表的な例:

-   `pre-commit`: コミット前にテストやリンターを走らせて、失敗したらコミットを中断する
-   `commit-msg`: コミットメッセージをチェックし、フォーマットが合わない場合はエラーにする

`.git/hooks/` フォルダ内にスクリプトを置きます（通常はファイル名末尾の `.sample` を外して使う）。
チームで統一ルールを適用する場合など、使いこなすと便利です。

## submodule (サブモジュール)

別の Git リポジトリを、**1 つのリポジトリのフォルダ配下に組み込む**機能です。
ライブラリや依存プロジェクトを別管理したいときに使いますが、扱いがやや難しい面もあります。

### サブモジュールの追加

```bash
git submodule add https://github.com/ユーザ名/ライブラリ.git path/to/submodule
```

### サブモジュールの更新

```bash
git submodule update --init --recursive
```

> サブモジュール特有の管理ルールを理解してから使うのがおすすめです。

## Git Bisect でバグを特定

Git の豊富な機能の中でも便利なツールが、**`git bisect`** です。
バグがどのコミットから入り始めたかを、自動で二分探索しながら特定できます。

1. バグが存在する「悪い」コミット (`bad`) と、バグがなかった「良い」コミット (`good`) を指定
2. すると Git が途中のコミットに切り替えを行い、「この時点ではバグはある？ない？」とユーザが回答
3. 二分探索を繰り返して、問題を起こしたコミットを特定

```bash
git bisect start
git bisect bad HEAD          # 今がバグある状態
git bisect good v1.0.0       # このタグ時点ではバグが無かった、と仮定
# 自動で途中のコミットに切り替わるので、動作を確認し、
# 「バグある？ない？」を判断し以下を入力
git bisect bad   # or git bisect good
# ...
# 最終的に、バグを混入させたコミットが特定される
git bisect reset # bisect状態から抜ける
```

## 参考情報

-   [Git 公式ドキュメント](https://git-scm.com/docs)
-   [GitHub Docs](https://docs.github.com/)
-   [mosunset website](https://mosunset.com)
-   [Pro Git 日本語版](https://git-scm.com/book/ja/v2) - Git の解説書。とても詳しくまとまっていておすすめです。

<p align="left">
  <img alt="Top Langs" height="180px" src="https://github-readme-stats.vercel.app/api/top-langs/?username=mosunset&layout=compact&show_icons=true&theme=codeSTACKr" />
  <img alt="github stats" height="180px" src="https://github-readme-stats.vercel.app/api?username=mosunset&theme=codeSTACKr&show_icons=true" />
</p>

[![trophy](https://github-profile-trophy.vercel.app/?username=mosunset&theme=codeSTACKr&column=8)](https://github.com/ryo-ma/github-profile-trophy)
