# Windows PC セットアップ手順

## 1. OS 初期設定

1. Windows のセットアップウィザードに従い、デスクトップまで進む。
2. **設定 › Windows Update** で "最新の状態" と表示されるまで更新（再起動を含む）。
3. **Microsoft Store › ライブラリ › 更新を取得** でストアアプリを最新化。
4. **OneDrive** を使わない場合は
   `設定 › アプリ › インストール済みアプリ › Microsoft OneDrive › アンインストール`。

---

## 2. 必須アプリ（カテゴリー別）

### セキュリティ & プライバシー

| サブカテゴリ       | ソフトウェア      |
| ------------ | ----------- |
| パスワード管理      | 1Password   |
| プライバシー重視ブラウザ | Tor Browser |

### システムユーティリティ

| サブカテゴリ     | ソフトウェア           |
| ---------- | ---------------- |
| アーカイブ／圧縮   | 7-Zip            |
| オーディオミキサー  | EarTrumpet       |
| 高速ファイル検索   | Everything       |
| アンインストーラ   | Geek Uninstaller |
| OS 拡張・便利機能 | PowerToys        |
| ディスク使用量可視化 | WizTree          |
<!-- | システム監視      | HWiNFO           |
| クリップボード管理  | Ditto            | -->

### ドキュメント & PDF

| サブカテゴリ   | ソフトウェア                   |
| -------- | ------------------------ |
| PDF 作成   | CUBE PDF                 |
| PDF 閲覧   | SumatraPDF               |
| ドキュメント変換 | Pandoc                   |
| TeX 環境   | LaTeX（TeX Live / MiKTeX） |

### メディア処理

| サブカテゴリ     | ソフトウェア          |
| ---------- | --------------- |
| メディアプレイヤー  | VLC             |
| メディア変換 CLI | ffmpeg          |
| 画像処理 CLI   | ImageMagick     |
| 動画編集       | DaVinci Resolve |
| 配信／録画      | OBS Studio      |
| 画像編集        | GIMP            |
| 音声編集        | Audacity        |

### 開発環境

| サブカテゴリ      | ソフトウェア                       |
| ----------- | ---------------------------- |
| バージョン管理     | Git for Windows              |
| 言語ランタイム     | Node.js / Rust（rustup）      |
| パッケージマネージャ  | uv                           |
| シェル & プロンプト | PowerShell 7 + oh-my-posh    |
| コンテナ／仮想化    | Docker Desktop / WSL        |
| IDE／エディタ    | Visual Studio Code / Cursor |

### デザイン & クリエイティブ

| サブカテゴリ     | ソフトウェア         |
| ---------- | -------------- |
| UI/UX デザイン | Figma          |
| 3D モデリング    | Blender        |
| 動画／映像制作    | （上記「メディア処理」参照） |

### AI / 機械学習

| サブカテゴリ     | ソフトウェア    |
| ---------- | --------- |
| LLM ローカル実行 | LM Studio |
| AI 画像生成      | Stability Matrix |

### コミュニケーション

| サブカテゴリ     | ソフトウェア           |
| ---------- | ---------------- |
| チャット & コラボ | Discord / Slack |
| ビデオ会議       | Zoom / Microsoft Teams |
<!-- | メールクライアント  | Thunderbird     | -->

### ウェブブラウザ

| サブカテゴリ  | ソフトウェア        |
| ------- | ------------- |
| メインブラウザ | Google Chrome |
| オルタナティブ | Firefox       |

### 入力 & ローカライズ

| サブカテゴリ  | ソフトウェア       |
| ------- | ------------ |
| 日本語 IME | Google 日本語入力 |

### クラウド & ストレージ

| サブカテゴリ | ソフトウェア                   |
| ------ | ------------------------ |
| ファイル同期 | Google Drive for Desktop |
<!-- | バックアップ   | Macrium Reflect Free     |
| リモートデスクトップ | AnyDesk / TeamViewer    | -->

### オフィススイート

| サブカテゴリ | ソフトウェア           |
| ------ | ---------------- |
| オフィス   | Microsoft Office |

---

## 3. インストール推奨手順

1. **winget** を使う → `winget import --yaml .\setup.yaml`
2. 開発用ツール（Git / Node.js / Rust / WSL など）を先に導入し、環境変数やパスを設定。
3. 大容量アプリ（DaVinci Resolve, Docker Desktop など）はバックグラウンドでダウンロード。
4. Discord・Slack などコミュニケーション系は最後に入れても OK。

---

## 4. winget 用サンプル `setup.yaml`

```yaml
# 例 : 主要パッケージのみ抜粋
Sources:
  - name: winget
Packages:
  - id: AgileBits.1Password
  - id: 7zip.7zip
  - id: Microsoft.PowerToys
  - id: Git.Git
  - id: AdoptOpenJDK.OpenJDK   # 必要なら
  - id: Docker.DockerDesktop
  - id: Rustlang.Rustup
  - id: Python.Python.3.12     # uv 用など
  - id: OBSProject.OBSStudio
  - id: SlackTechnologies.Slack
  - id: OBSProject.OBSStudio
  - id: Google.Chrome
  - id: Mozilla.Firefox
  # …続きは好みに応じて追加
```

> **ポイント:**
>
> * *再現性* が高く、次回 PC を乗り換える際も `winget import` だけで完了。
> * アプリ名は winget 検索 (`winget search <name>`) で確認し、正式 ID を記載。

---

## 5. 追加の設定とカスタマイズ

### PowerShell 7 + oh-my-posh の設定

```powershell
# PowerShell 7 のインストール
winget install Microsoft.PowerShell

# oh-my-posh のインストール
winget install JanDeDobbeleer.OhMyPosh

# プロファイルの設定
notepad $PROFILE

# プロファイルに以下を追加
oh-my-posh init pwsh | Invoke-Expression
```

### WSL の設定

```powershell
# WSL の有効化
wsl --install

# Ubuntu のインストール（推奨）
wsl --install -d Ubuntu
```

### 開発環境の設定

```powershell
# Node.js のインストール
winget install OpenJS.NodeJS

# Rust のインストール
winget install Rustlang.Rustup

# uv のインストール
winget install AstralSoftware.Uv
```

### Explorer右クリックメニューの変更

---

## 6. トラブルシューティング

### よくある問題

1. **winget が見つからない場合**
   * Windows 10 の場合は Microsoft Store から App Installer をインストール
   * Windows 11 の場合は標準で搭載

2. **パッケージが見つからない場合**

   ```powershell
   winget search <package-name>
   ```

3. **インストールエラーの場合**

   ```powershell
   winget install <package-id> --verbose-logs
   ```

### 環境変数の確認

```powershell
# パスの確認
echo $env:PATH

# 環境変数の確認
Get-ChildItem Env:
```

---

## 7. セキュリティ設定

### Windows Defender の設定

1. **リアルタイム保護** を有効にする
2. **クラウドベースの保護** を有効にする
3. **自動サンプル送信** を有効にする

### ファイアウォールの設定

```powershell
# ファイアウォールの状態確認
Get-NetFirewallProfile

# 特定のアプリケーションを許可
New-NetFirewallRule -DisplayName "Application Name" -Direction Inbound -Program "C:\Path\To\Application.exe" -Action Allow
```

---

## 8. パフォーマンス最適化

### スタートアップアプリの管理

```powershell
# スタートアップアプリの確認
Get-CimInstance -ClassName Win32_StartupCommand

# タスクマネージャーから手動で無効化
# Ctrl + Shift + Esc → スタートアップ タブ
```

### ディスククリーンアップ

```powershell
# ディスククリーンアップの実行
cleanmgr /sageset:1
cleanmgr /sagerun:1
```

---

## 9. バックアップと復元

### システムイメージの作成

```powershell
# システムイメージの作成
wbadmin start backup -backupTarget:D: -include:C: -allCritical -quiet
```

### ファイル履歴の設定

1. **設定 › 更新とセキュリティ › バックアップ**
2. **ファイル履歴を使用してファイルをバックアップ** を有効化
3. バックアップ先を選択

---

## 10. メンテナンス

### 定期的なメンテナンス

* **週次**: Windows Update の確認
* **月次**: ディスククリーンアップ、不要アプリのアンインストール
* **四半期**: システムイメージの更新、セキュリティソフトの更新確認

### パフォーマンス監視

```powershell
# システムパフォーマンスの確認
Get-Counter "\Processor(_Total)\% Processor Time"
Get-Counter "\Memory\Available MBytes"
```
