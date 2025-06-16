# チーム開発編 (branch)

## 概要

複数人で開発を行う際には、機能開発を並列に進めつつコンフリクトを最小限に抑えるためのブランチ戦略とワークフローが不可欠です。この章ではよく採用される Git フローや GitHub Flow を題材に、実務で役立つコマンドとその使い所を解説します。

## 詳細

### 1. ブランチ戦略の基本

#### Git Flow の例

| ブランチ | 役割 |
| -------- | ---- |
| `main`   | 本番リリース用。常にデプロイ可能な状態を維持 |
| `develop`| 次期リリースをまとめる統合ブランチ |
| `feature/*` | 機能開発用の短命ブランチ |
| `release/*` | リリース準備用。バグ修正とドキュメント整理のみ行う |
| `hotfix/*`  | 本番緊急修正 |

作成例:

```bash
git switch develop
git switch -c feature/login-api
```

#### GitHub Flow（シンプルな運用）

1. `main` から機能ブランチを切る
2. コミットを積む → push
3. Pull Request を作成
4. レビュー後 `main` へマージ → デプロイ or 自動テスト

**2025年の推奨事項**: モダンな継続的デリバリー環境では GitHub Flow が主流。Git Flow は複数バージョンの同時サポートが必要な場合に適用。

---

### 2. リモートブランチと追跡ブランチ

ローカルとリモートを紐付ける「アップストリーム設定」は以下です。

```bash
git push -u origin feature/login-api  # -u で追跡ブランチを設定
```

既に存在する場合は:

```bash
git branch --set-upstream-to=origin/feature/login-api
```

リモートの一覧確認:

```bash
git branch -r      # origin/xxx
```

---

### 3. Pull Request とコードレビュー

GitHub を例に、レビュー前にコミットをまとめることでレビュアの負担を軽減できます。

```bash
git rebase -i origin/main  # 共有前に履歴を整形
```

レビュー指摘を受けた修正は同じブランチでコミットを追加するか、`git commit --fixup=<hash>` → `git rebase -i --autosquash` でまとめ直すと履歴がきれいになります。

---

### 4. コンフリクトの解消とマージ戦略

#### マージ時のオプション

| コマンド | 説明 |
| -------- | ---- |
| `git merge --no-ff` | ブランチマージを明示的に履歴へ残す |
| `git merge --squash` | 複数コミットを 1 つにまとめてからマージ |
| `git rebase main` | 共有前に履歴を直線化しコンフリクトを早期発見 |

コンフリクト解消ツール:

```bash
git mergetool          # 設定によって meld, vscode など起動
git add <resolved file>
git merge --continue
```

---

### 5. 高度なブランチ操作

#### git cherry-pick

特定コミットだけを別ブランチへ取り込みたいとき:

```bash
git switch hotfix/login-bug
git cherry-pick 8a5b9e1        # コミットハッシュ
```

#### git revert

公開済み履歴を元に戻す安全な方法:

```bash
git revert 8a5b9e1  # 取り消しコミットを作成
```

---

### 6. CI/CD とブランチ保護ルール

GitHub では Settings → Branches → Protection Rules で以下を設定できます。

- プルリクエストのレビュー必須
- Status Checks (GitHub Actions) が成功していること
- 強制 push の禁止

ローカルでの pre-push フック例:

```bash
#!/bin/sh
npm test || exit 1
```

`chmod +x .git/hooks/pre-push` で有効化。

---

以上でチーム開発におけるブランチ運用とワークフローの基本を学びました。次章では GitHub Pages へのデプロイ方法を解説します。
