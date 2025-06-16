# 一人端末一個での開発

## 概要

個人開発では「自分しか触らない」ゆえにスピード感は出ますが、後々のメンテナンスや事故防止のために Git の機能を正しく使うことが大切です。この章では、ブランチ戦略の簡略化、履歴の整理、バックアップ目的のリモート運用など、一人開発に特化した Git コマンドを扱います。

## 詳細

### 1. シンプルなブランチ運用

個人開発では `main` と機能ごとの短命ブランチ程度で十分です。

```bash
# ブランチ作成とチェックアウト
git switch -c feature/add-login
# 作業...
# main へ統合
git switch main
git merge --no-ff feature/add-login  # 履歴を残す
```

`git switch` は `checkout` の後継で、直感的かつ安全です。

#### rebase を使った履歴の直線化

```bash
git switch feature/add-login
git rebase main  # main の最新を先頭に取り込む
```

---

### 2. 作業の一時退避（git stash）

急ぎで別の修正をしたいがコミットしたくない場合:

```bash
git stash push -m "WIP: ログイン画面"
# ...別作業...
git stash list        # stash@{0}: WIP: ログイン画面
git stash pop         # 元のブランチに適用し stash を削除
```

特定のファイルだけを退避したい場合は `git stash push path/to/file` が便利です。

---

### 3. 履歴の書き換え

#### 直前のコミットを修正

```bash
git commit --amend -m "feat: ログイン画面 UI 完了"
```

#### 複数コミットをまとめる（Interactive Rebase）

```bash
git rebase -i HEAD~3  # 直近 3 つを編集
# pick → squash でまとめる
```

公開済みブランチを書き換えると共同開発では問題になりますが、個人開発では積極的に履歴を整理しても安全です。

---

### 4. 緊急時のロールバック

#### git reflog

全ての HEAD の移動履歴を記録しているので、誤ってブランチを削除した／reset したときに役立ちます。

```bash
git reflog
# 8a5b9e1 HEAD@{2}: reset: moving to 8a5b9e1
```

#### git reset

| コマンド | 用途 |
| -------- | ---- |
| `git reset --soft <hash>` | コミットを取り消し、変更はステージに残す |
| `git reset --mixed <hash>` (デフォルト) | 変更を作業ツリーに戻す |
| `git reset --hard <hash>` | 変更をすべて破棄（要注意） |

---

### 5. タグとバージョニング

リリースポイントを示す軽量タグ/注釈付きタグを活用すると履歴が追いやすくなります。

```bash
git tag v1.0.0               # 軽量タグ
git tag -a v1.0.0 -m "First release"  # 注釈付きタグ

git push origin v1.0.0       # タグをリモートへ
```

---

### 6. バックアップとしてのリモート利用

GitHub などをバックアップ先として使う場合、プライベートリポジトリを作成して以下でプッシュします。

```bash
git remote add origin git@github.com:yourname/your-private-repo.git
git push -u origin main
```

バックアップの自動化には GitHub Actions + `schedule` や、自分の NAS へのミラーリング（`git clone --mirror`）も検討してください。

---

以上が一人開発で覚えておくと便利な Git コマンドのまとめです。次章ではチーム開発に移り、ブランチ戦略やコードレビューの流れを学びます。
