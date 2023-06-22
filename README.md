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

## 設定・確認すること
```sh
git config --global user.name 作業環境ごとのユーザ名
git config --global user.email 連絡のつくメールアドレス
git config --global init.defaultbranch main
git init
```

## プログラム作成中のコマンド
```sh
git add --all
git commit -m "コミットメッセージ　わかりやすく書く"
git remote add origin https://github.com/ユーザ/[作成したリポジトリ].git
git push origin main
```
### ファイル選択の違い
厳密にはgit add -Aとgit add .は全く同じではない。
git add -uとgit add -Aはレポジトリ内のどこで実行してもレポジトリ全体を処理するが、git add .はカレントディレクトリ以下のみを処理する。
|                       | New Files | change file | Deleted Files |
| :-:                   | :-:       | :-:         | :-: |
| git add -u (--update) |	×         |	○           |	○ |
| git add -A (--all)    |	○         |	○           | ○ |
| git add .             | ○         |	○           |	○ |

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

## リモートからローカルに取り込むコマンド

https://qiita.com/baby-0105/items/6481c7140e357ba04ffc







