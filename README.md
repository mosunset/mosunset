# mosunset

[mosunset website](https://mosunset.com)

## **Git の使い方 （自分向け 超初心者用）**

### 目次
1. [Git の初期設定](#git-の初期設定)  
2. [Git リポジトリの作成](#git-リポジトリの作成)  
3. [ローカルでの基本操作](#ローカルでの基本操作)  
4. [リモートリポジトリとの連携](#リモートリポジトリとの連携)  
5. [複数ブランチによる開発（チーム開発向け）](#複数ブランチによる開発チーム開発向け)  
6. [コミットの取り消し方法](#コミットの取り消し方法)  
7. [変更の一時退避 (stash)](#変更の一時退避-stash)  
8. [Git のバージョン確認・アップデート](#git-のバージョン確認アップデート)  
9. [Gitログの確認](#gitログの確認)  
10. [参考情報](#参考情報)  

## Git の初期設定

Gitを使い始める前に、ユーザー情報を設定します。コミットした際に「誰が変更を行ったか」を記録するための情報です。

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
- これで `.git` フォルダが作成され、Git の管理対象フォルダになります。

## ローカルでの基本操作

### 1. 作業状況の確認

```bash
git status
```
- **ステージングされた変更**：コミット準備が整ったファイル  
- **ステージングされていない変更**：編集はしたがコミット準備をしていないファイル  
- **未追跡ファイル**：新規に作ったファイルで、Git がまだ管理していないもの  

### 2. 変更をステージングしてコミットする

```bash
# すべての変更をステージング（追跡ファイル・未追跡ファイル含む）
git add --all

# コミットを実行（"-m"オプションでメッセージを付与）
git commit -m "ここにコミットメッセージを書く"
```

#### `git add` の選択範囲の違い

| コマンド                    | 新規ファイル | 変更ファイル | 削除ファイル | 適用範囲                     |
|:---|:-:|:-:|:-:|:-:|
| `git add -u` (`--update`) |     ×      |     ○      |     ○      | リポジトリ全体（追跡済み）  |
| `git add -A` (`--all`)    |     ○      |     ○      |     ○      | リポジトリ全体             |
| `git add .`               |     ○      |     ○      |     ○      | **カレントディレクトリ以下** |

#### ステージングを取り消す
- **最初のコミット前**（まだコミットが1つもない場合）：  
  ```bash
  git rm --cached ファイル名
  git rm --cached -r ディレクトリ名
  git rm --cached -r .
  ```
- **2回目以降**（既にコミットがある場合）：  
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

1人でもブランチを使うと「動く状態を保つ main」「試作コードを試す branch」など役割分担ができて便利です。複数人で開発する場合は特に重要になります。

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
- これで他のメンバーも同じブランチを取得できるようになります。

### 4. ブランチをマージする

#### ローカルでのマージ例
```bash
# mainブランチへ切り替え
git checkout main

# mainにfeature/new_functionを取り込む
git merge feature/new_function
```
- コンフリクトがある場合は、手動で該当ファイルを修正→ステージ→コミットして解決。

#### プルリクエスト (Pull Request)
- GitHub を使う場合、branch をプッシュ後にプルリクエストを作成し、レビューを経て `main` にマージする流れが一般的です。

## コミットの取り消し方法

### 1. ソフトリセット

直前のコミットを取り消し、**ワークツリーの変更は保持**したままにします。

```bash
git reset --soft HEAD^
```
- `HEAD^` は1つ前のコミットを指す。  
- `HEAD~2` のようにすると2つ前など、数字で指定可能。

### 2. ハードリセット

直前のコミットを取り消し、**作業ツリーの変更も巻き戻す**ので注意が必要です。

```bash
git reset --hard HEAD^
```
> **注意**: ローカルの変更が消えるので、慎重に。

### 3. リモートにpush済みのコミットを取り消す場合

```bash
# ローカルでは reset などで取り消した後
git push --force
```
> **--force** は、他のメンバーの作業を壊す可能性もあるため要注意。

### 4. `revert`でコミットを“打ち消す”

過去のコミットに対して“打ち消し”を行うコミットを作成するので、**履歴を残したまま内容を元に戻す**方法です。

```bash
git revert <コミットハッシュ>
```

### 5. `commit --amend` で直前のコミットを上書き

コミットメッセージや直後のちょっとした修正をまとめたい場合に有効です。

```bash
git commit --amend
```
> push後にこれを行うと履歴が変わるため、やはり注意が必要です。

## 変更の一時退避 (stash)

コミットするほどではない作業内容を一時的に中断したいときに使います。

```bash
# 現在の作業を stash（退避）
git stash

# 再開したいときに取り出す
git stash pop
```

## Git のバージョン確認・アップデート

### バージョン確認

```bash
git version
```

### Windows でのアップデート（Git for Windows使用時）

```bash
git update-git-for-windows
```



## Gitログの確認

コミット履歴の確認:

```bash
git log
```
- 一覧を簡潔に見る場合は `git log --oneline` が便利。



## 参考情報

- [Git公式ドキュメント](https://git-scm.com/docs)  
- [GitHub Docs](https://docs.github.com/)  
- [mosunset website](https://mosunset.com)  



<p align="left">
  <img alt="Top Langs" height="180px" src="https://github-readme-stats.vercel.app/api/top-langs/?username=mosunset&layout=compact&show_icons=true&theme=codeSTACKr" />
  <img alt="github stats" height="180px" src="https://github-readme-stats.vercel.app/api?username=mosunset&theme=codeSTACKr&show_icons=ture" />
</p>

[![trophy](https://github-profile-trophy.vercel.app/?username=mosunset&theme=codeSTACKr&column=8)](https://github.com/ryo-ma/github-profile-trophy)
