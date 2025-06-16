# Git LFS (Large File Storage)

## 概要

Git LFS は動画、音声、データセット、画像などの大容量ファイルを効率的に管理するための拡張機能です。実際のファイルを別サーバに保存し、Git リポジトリにはポインタファイルのみを格納することで、リポジトリサイズを最小限に抑えます。

## 詳細

### 1. インストールと初期設定

```bash
# Git LFS のインストール（一度だけ実行）
git lfs install

# 特定のファイルタイプを LFS で追跡
git lfs track "*.psd"
git lfs track "*.mp4"
git lfs track "*.zip"

# .gitattributes をコミット（チーム全体で共有）
git add .gitattributes
git commit -m "chore: configure Git LFS tracking"
```

### 2. 基本的な使い方

```bash
# 現在追跡中のパターンを確認
git lfs track

# LFS で管理されているファイルを表示
git lfs ls-files

# LFS ファイルの状態を確認
git lfs status
```

### 3. ベストプラクティス

#### 適切なファイル選択

| 推奨 | 非推奨 |
| ---- | ------ |
| バイナリアセット（画像、動画、音声） | ソースコード |
| 大容量データセット | 10MB 未満のテキストファイル |
| ビルド成果物（必要な場合） | 頻繁に変更されるファイル |

#### パフォーマンス最適化

```bash
# 必要なファイルのみ取得（帯域幅節約）
git lfs pull --include="*.jpg,*.png"

# 浅いクローンと組み合わせ
git clone --depth 1 <repository>
git lfs pull
```

### 4. 既存ファイルの移行

既にコミット済みの大容量ファイルを LFS へ移行：

```bash
# 履歴を書き換えて LFS へ移行
git lfs migrate import --include="*.psd" --everything

# 特定のブランチのみ移行
git lfs migrate import --include="*.mp4" --include-ref=main
```

### 5. 容量とコストの管理

```bash
# 不要な LFS オブジェクトを削除
git lfs prune

# ローカルの LFS キャッシュを確認
git lfs env
```

### 6. プラットフォーム制限

| プラットフォーム | ファイルサイズ上限 | 備考 |
| ---------------- | ------------------ | ---- |
| GitHub | 5GB | 無料プランは月間 1GB まで |
| GitLab | 5GB | プランにより容量制限あり |
| Bitbucket | 要確認 | プロジェクト設定で確認 |

### 7. トラブルシューティング

```bash
# LFS ファイルが正しくダウンロードされない場合
git lfs fetch --all
git lfs checkout

# プッシュ時のエラー対処
git config lfs.activitytimeout 300  # タイムアウトを延長

# 転送を再開可能にする
git config lfs.transfer.enablehrefrewrite true
```

### 8. CI/CD での注意点

```yaml
# GitHub Actions の例
- name: Checkout with LFS
  uses: actions/checkout@v4
  with:
    lfs: true
```

---

Git LFS は大容量ファイルを扱うプロジェクトでは必須のツールです。適切に設定することで、リポジトリのパフォーマンスを大幅に改善できます。ただし、転送量には料金が発生する場合があるため、使用量の監視も重要です。