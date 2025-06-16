# Git セキュリティとコミット署名

## 概要

コード改ざんやなりすましを防ぐため、コミットに電子署名を付けることが重要です。2025年現在、GPG、SSH、S/MIME による署名が可能で、特に SSH 署名は Git 2.34 以降でサポートされ、設定が簡単なため人気が高まっています。

## 詳細

### 1. なぜコミット署名が必要か

- **本人確認**: コミットが主張された作者によって作成されたことを証明
- **改ざん防止**: 署名後にコミットが変更されていないことを保証
- **信頼構築**: オープンソースプロジェクトでコードの信頼性を向上

### 2. SSH による署名（推奨）

Git 2.34 以降、既存の SSH 鍵でコミット署名が可能になりました。

```bash
# SSH 署名を有効化
git config --global gpg.format ssh

# 署名用の SSH 鍵を指定
git config --global user.signingkey ~/.ssh/id_ed25519.pub

# デフォルトで全てのコミットに署名
git config --global commit.gpgsign true
```

#### 検証用の許可リスト設定

```bash
# 信頼する署名者リストを作成
echo "you@example.com ssh-ed25519 AAAAC3..." > ~/.ssh/allowed_signers

# Git に設定
git config --global gpg.ssh.allowedSignersFile ~/.ssh/allowed_signers
```

### 3. GPG による署名（従来方式）

GPG は最も互換性が高く、古い環境でも動作します。

```bash
# GPG 鍵の生成（有効期限付き推奨）
gpg --full-generate-key

# 鍵 ID を確認
gpg --list-secret-keys --keyid-format=long

# Git に設定
git config --global user.signingkey YOUR_KEY_ID
git config --global commit.gpgsign true
```

### 4. プラットフォーム設定

#### GitHub/GitLab での設定

1. Settings → SSH and GPG keys へアクセス
2. 署名用の公開鍵を追加
3. "Verified" バッジが表示されることを確認

### 5. セキュリティベストプラクティス

| 推奨事項 | 理由 |
| -------- | ---- |
| 有効期限を設定 | 鍵が紛失しても期限後は無効化される |
| パスフレーズで保護 | 秘密鍵への不正アクセスを防ぐ |
| 用途別に鍵を分離 | 認証用と署名用で別の鍵を使用 |
| ハードウェアキーを検討 | FIDO2 対応デバイスでより高いセキュリティ |

### 6. トラブルシューティング

```bash
# 署名の検証
git log --show-signature

# 署名付きタグの作成
git tag -s v1.0.0 -m "Release version 1.0.0"

# 署名の問題を診断
GIT_TRACE=1 git commit -S -m "test"
```

---

コミット署名は特に公開プロジェクトや企業環境で重要です。SSH 署名は設定が簡単で、既存の SSH インフラを活用できるため、2025年現在の推奨方式となっています。