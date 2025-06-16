# 初期設定

## 概要

この章では、Git を使い始めるうえで必要となるインストール手順からユーザ情報の設定、SSH 鍵の作成まで、開発環境を整えるための基本的なコマンドを詳しく解説します。

## 詳細

### 1. Git のインストール

| OS | 推奨コマンド |
| --- | --- |
| Windows | `winget install --id Git.Git -e` または `choco install git` |
| macOS | `brew install git` |
| Linux (Debian/Ubuntu 系) | `sudo apt update && sudo apt install git` |
| Linux (Fedora/RHEL 系) | `sudo dnf install git` |

確認:

```bash
git --version
```

バージョンが表示されればインストール成功です。

---

### 2. ユーザ情報の設定

リポジトリにコミットする際、誰が変更したかを残すためにユーザ名とメールアドレスを設定します。

```bash
git config --global user.name "あなたの名前"
git config --global user.email "you@example.com"
```

設定を確認するには:

```bash
git config --list --global | grep user
git config user.name
git config user.email
```

---

### 3. SSH キーの生成と登録

公開鍵認証を使うことで GitHub／GitLab などとの通信を安全かつパスワード入力なしで行えます。

#### Ed25519（推奨）

```bash
# Ed25519 アルゴリズムを使用（より安全で高速）
ssh-keygen -t ed25519 -C "you@example.com"

# エージェントに読み込む (macOS/Linux)
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

#### RSA（互換性重視）

```bash
# RSA を使用する場合（2021年11月以降は SHA-2 署名が必須）
ssh-keygen -t rsa -b 4096 -C "you@example.com"

# エージェントに読み込む (macOS/Linux)
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
```

生成された公開鍵（`id_ed25519.pub` または `id_rsa.pub`）を Git ホスティングサービスの「SSH Keys」設定画面に登録してください。

接続確認:

```bash
ssh -T git@github.com
```

---

### 4. エディタ・差分ツールの設定

コミットメッセージを編集するエディタや GUI 差分ツールを指定できます。

```bash
git config --global core.editor "code --wait"   # VS Code を使用
git config --global merge.tool vimdiff           # マージツール
```

さらに VS Code の git 統合を活かしたい場合:

```bash
git config --global diff.tool vscode
```

---

### 5. 設定内容の確認とトラブルシュート

すべての設定を確認:

```bash
git config --list --show-origin | less
```

設定ファイルの場所:

- システム全体: `/etc/gitconfig`
- ユーザ全体: `~/.gitconfig`
- リポジトリ固有: `<repo>/.git/config`

設定が反映されないときはファイルの優先順位を確認しましょう。

#### よくあるエラー

| 症状 | 対処方法 |
| --- | --- |
| `fatal: unable to auto-detect email address` | `user.name` と `user.email` が未設定。上述のコマンドで設定する。 |
| SSH 接続で `Permission denied (publickey)` | 鍵がエージェントに登録されているか、GitHub 側に公開鍵が登録されているか確認。 |

---

以上で Git の初期設定は完了です。次章では、実際にリポジトリを作成して Git を使い始める方法を解説します。
