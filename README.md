# mosunset

[mosunset website](https://mosunset.com)

---

## **最初に行う設定**

### Gitのユーザー名とメールアドレスを設定する

Gitを使う前に、まず最初にユーザー情報を設定します。この情報はコミット時にリポジトリに記録されるため、作業ごとに適切に設定しておく必要があります。

```bash
# ユーザー名の設定（ローカルの作業環境ごとのユーザ名）
git config --global user.name "あなたの名前"

# メールアドレスの設定（連絡が取れるメールアドレス）
git config --global user.email "あなたのメールアドレス"

# 初期ブランチを"main"に設定
git config --global init.defaultbranch main
```

---

## **Gitリポジトリの作成**

プロジェクトを管理するためのGitリポジトリを作成します。

```bash
# 新しいリポジトリを作成
git init
```

---

## **プログラムの作成中に使うコマンド**

### 1. ローカルにコミットする

作業した内容をローカルリポジトリに保存します。まずは、変更をステージングしてから、コミット（保存）を行います。

```bash
# すべてのファイルをステージング
git add --all

# わかりやすいコミットメッセージで保存
git commit -m "ここにコミットメッセージを書く"
```

---

### 2. リモートリポジトリを指定する

ローカルリポジトリをリモートリポジトリ（GitHubなど）に紐づけます。

```bash
# ブランチ名を"main"に設定
git branch -M main

# リモートリポジトリを指定（GitHubのリポジトリURLに置き換える）
git remote add origin https://github.com/ユーザ名/リポジトリ名.git
```

---

### 3. リモートリポジトリにプッシュする

ローカルの作業内容をリモートリポジトリに反映させます。これにより、他のメンバーと共有したり、バックアップが取れます。

```bash
# リモートにプッシュ（初回時）
git push -u origin main

# 2回目以降のプッシュは以下のコマンドを使用
git push
```

---

## **`git add` のファイル選択の違い**

ファイルを追加する際のコマンドには、さまざまな選択方法があります。それぞれの違いを理解しておきましょう。

| コマンド               | 新しいファイル | 変更したファイル | 削除したファイル | 適用範囲                    |
| :-------------------- | :-----------: | :-------------: | :-------------: | :------------------------: |
| `git add -u` (--update)          |       ×       |        ○        |        ○        | リポジトリ全体              |
| `git add -A` (--all)          |       ○       |        ○        |        ○        | リポジトリ全体              |
| `git add .`            |       ○       |        ○        |        ○        | カレントディレクトリ以下     |

---

## **ステージングを取り消す**

誤ってファイルをステージングした場合、以下のコマンドで取り消すことができます。

### **最初のコミット前に取り消す場合**

```bash
# ステージングから特定のファイルを取り消す
git rm --cached ファイル名

# ディレクトリ全体を取り消す
git rm --cached -r ディレクトリ名

# すべてのファイルを取り消す
git rm --cached -r .
```

### **2回目以降のコミット前に取り消す場合**

```bash
# ステージングから特定のファイルを取り消す
git restore --staged ファイル名

# ステージング全体を取り消す
git restore --staged .

# または
git reset HEAD ファイル名
git reset HEAD .
```

---

## **`commit` の取り消し方法**

Windowsの場合は`"HEAD^"`と、指定を`"`で囲む

### **ソフトリセット**

ワークディレクトリの内容をそのままにして、コミットのみを取り消します。

```bash
git reset --soft HEAD^
```

### **ハードリセット**

コミットとワークディレクトリの内容を元に戻します。**`注意`**: これを実行すると作業内容が失われます。

```bash
git reset --hard HEAD^
```

### `HEAD^` 以外

- `HEAD^` ： 直前のコミットを意味する
- `HEAD~{n}` ： n個前のコミットを意味する
  - `HEAD^`や`HEAD~{n}`の代わりにコミットのハッシュ値を書いても良い
  - git の v1.8.5 からは、「HEAD」のエイリアスとして「@」が用意されている
  - `HEAD~`と`HEAD^`と`@^`は同じ意味。
  - `HEAD^^^`と`HEAD~3`と`HEAD~~~`と`HEAD~{3}`と`@^^^`は同じ意味

### **`revert` でコミットを打ち消す**

コミットを取り消したい場合、`git revert`を使用することで逆向きのコミットを作成し、履歴を残したまま打ち消すことができます。

```bash
git revert コミットハッシュ値
```

### **`commit` の上書き**

コミットメッセージを修正したい場合や、直前のコミット内容を修正したい場合に使用します。

```bash
git commit --amend
```

---

## **Gitログの確認**

コミット履歴を確認するには以下のコマンドを使用します。

```bash
git log
```

---

## **リモートからローカルに取り込む**

### **リポジトリのクローン（最初の取得）**

リモートリポジトリをローカルにコピーするには、以下のコマンドを使用します。

```bash
git clone https://github.com/ユーザ名/リポジトリ名.git
```

### **リモートの変更をローカルに取り込む（2回目以降）**

リモートリポジトリに変更があった場合、以下のコマンドでそれを取り込みます。

```bash
# mainブランチにいることを確認
git checkout main

# リモートの最新情報を取得
git fetch origin main

# 取得した内容をマージ
git merge origin/main
```

`git pull`は`fetch`と`merge`を同時に行うため、より簡便です。

```bash
git pull origin main
```

---

## **エラー時の対処法**

### **`git fetch` でエラーが発生した場合**

```bash
git reset --hard HEAD
```

### **`git merge` または `git pull` でエラーが発生した場合**

```bash
git merge --abort
git reset --hard HEAD
```

---

## **コミットせずに変更を一時的に退避する**

作業を中断したいがコミットはまだしたくない場合、以下のコマンドを使用して変更を一時的に退避できます。

```bash
git stash
```

退避した変更を戻すには以下を使用します。

```bash
git stash pop
```

---

## **Gitのバージョンを確認・アップデート**

### **バージョン確認**

```bash
git version
```

### **Windows用Gitのアップデート**

```bash
git update-git-for-windows
```

---

<p align="left">
  <img alt="Top Langs" height="180px" src="https://github-readme-stats.vercel.app/api/top-langs/?username=mosunset&layout=compact&show_icons=true&theme=codeSTACKr" />
  <img alt="github stats" height="180px" src="https://github-readme-stats.vercel.app/api?username=mosunset&theme=codeSTACKr&show_icons=ture" />
</p>

[![trophy](https://github-profile-trophy.vercel.app/?username=mosunset&theme=codeSTACKr&column=8)](https://github.com/ryo-ma/github-profile-trophy)
