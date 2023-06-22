<!-- マークダウンのチートシート
https://qiita.com/Qiita/items/c686397e4a0f4f11683d
- 🔭 I’m currently working on ...
- 🌱 I’m currently learning ...
- 👯 I’m looking to collaborate on ...
- 🤔 I’m looking for help with ...
- 💬 Ask me about ...
- 📫 How to reach me: ...
- 😄 Pronouns: ...
- ⚡ Fun fact: ...
-->

# git 使い方自分向け（超初心者）

## 最初に設定・確認すること
```sh
git config --global user.name 作業環境ごとのユーザ名
git config --global user.email 連絡のつくメールアドレス
git config --global init.defaultbranch main
git init
```

## プログラム作成中のコマンド
#### 1. ローカルにコミット
```sh
git add --all
git commit -m "コミットメッセージ　わかりやすく書く"
```
#### 2. リモートリポジトリを指定
```sh
git remote add origin https://github.com/ユーザ/[作成したリポジトリ名].git
```
#### 3. リモートにプッシュ 
```sh
git push origin main
```
1, 3 を繰り返す
### ファイル選択の違い
|                       | New Files | change file | Deleted Files | 処理範囲になるファイル |
| :-                    | :-:       | :-:         | :-:           | :-: |
| git add -u (--update) |	×         |	○           |	○             | リポジトリ全体 |
| git add -A (--all)    |	○         |	○           | ○             | リポジトリ全体 |
| git add .             | ○         |	○           |	○             | カレントディレクトリ以下 |

## add の取り消し
### git init 直後などそのファイルの最初のコミット前の時
```sh
git rm --cached [ファイル名]
git rm --cached -r [ディレクトリ]
git rm --cached -r .
```
### 2回目以降のローカルリポジトリにファイルがあるときのコミット前
```sh
git restore --staged [ファイル名]
git restore --staged .

git reset HEAD [ファイル名]
git reset HEAD .
```

## ログを確認（ローカル？）
```sh
git log
```

## リモートからローカルに取り込む
```sh
git clone https://github.com/ユーザ/[リポジトリ名].git ([ディレクトリ名])
```

https://qiita.com/baby-0105/items/6481c7140e357ba04ffc







