### Hi there 👋

<!--
**mosunset/mosunset** is a ✨ _special_ ✨ repository because its `README.md` (this file) appears on your GitHub profile.

Here are some ideas to get you started:

- 🔭 I’m currently working on ...
- 🌱 I’m currently learning ...
- 👯 I’m looking to collaborate on ...
- 🤔 I’m looking for help with ...
- 💬 Ask me about ...
- 📫 How to reach me: ...
- 😄 Pronouns: ...
- ⚡ Fun fact: ...
-->
### git 使い方自分向け（初心者）

設定すること
```sh
git config --global user.name 作業環境ごとのユーザ名
git config --global user.email 連絡のつくメールアドレス
git config --global init.defaultBranch main
git init
```

プログラム作成中のコマンド
```sh
git add --all
git commit -m "コミットメッセージ　わかりやすく書く"
git remote add origin https://github.com/ユーザ/[作成したリポジトリ].git
git push origin main
```

ファイル選択の違い
厳密にはgit add -Aとgit add .は全く同じではない。
git add -uとgit add -Aはレポジトリ内のどこで実行してもレポジトリ全体を処理するが、git add .はカレントディレクトリ以下のみを処理する。
|New Files|	Modified Files|	Deleted Files|
|:-:|:-:|:-:|
|git add -u (--update)|	×|	○|	○|
|git add -A (--all)|	○|	○|	○|
|git add .|	○|	○|	○|

