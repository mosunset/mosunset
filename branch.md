# Branch

Gitブランチを使用して作業する際には、さまざまなシチュエーションが考えられます。ここでは、典型的なワークフローをいくつかの状況に分けて説明します。各ステップでは、ブランチ作成、切り替え、マージ、リベース、コンフリクト解消などの基本的な操作方法をまとめています。

## **状況 1: 新しい機能の開発**

1. **最新の`main`ブランチを取得**

   ```bash
   git checkout main
   git pull origin main  # リモートの最新状態を取得
   ```

2. **新しいブランチを作成して切り替える**

   ```bash
   git switch -c feature/new-feature
   ```

3. **開発を進めてコミットする**

   ```bash
   git add .
   git commit -m "Implement new feature"
   ```

4. **作業が完了したら、`main`ブランチにマージ**
   - まず、`main`ブランチに戻ります。

     ```bash
     git checkout main
     ```

   - `feature/new-feature`を`main`にマージします。

     ```bash
     git merge feature/new-feature
     ```

5. **マージ後、リモートにプッシュ**

   ```bash
   git push origin main
   ```

## **状況 2: 開発中に他の人が`main`ブランチを更新した場合**

1. **新しい機能の開発ブランチにいる途中で、`main`ブランチが更新される**
   - 現在のブランチは`feature/new-feature`と仮定。
   - `main`の最新状態を取得。

     ```bash
     git checkout main
     git pull origin main
     ```

2. **自分の作業ブランチに戻り、`main`をマージするかリベースする**

   **a. `git merge`を使用する場合**
   - 自分のブランチに戻り、`main`ブランチの変更をマージします。

     ```bash
     git checkout feature/new-feature
     git merge main
     ```

   - コンフリクトが発生した場合は手動で解決し、次のコマンドで変更を確定します。

     ```bash
     git add <ファイル名>
     git commit
     ```

   **b. `git rebase`を使用する場合**
   - 自分のブランチに戻り、`main`を基底にリベースします。

     ```bash
     git checkout feature/new-feature
     git rebase main
     ```

   - リベース中にコンフリクトが発生した場合、手動で解決し、次のコマンドでリベースを続けます。

     ```bash
     git add <ファイル名>
     git rebase --continue
     ```

## **状況 3: 不要なブランチを削除したい場合**

1. **ブランチが統合され、もう使わなくなったブランチを削除する**
   - まず、削除したいブランチにいないことを確認します。例えば、`main`ブランチに切り替えます。

     ```bash
     git checkout main
     ```

2. **ローカルブランチを削除する**
   - マージ済みのブランチを削除。

     ```bash
     git branch -d feature/new-feature
     ```

   - マージされていないブランチを強制削除。

     ```bash
     git branch -D feature/new-feature
     ```

3. **リモートブランチを削除する**

   ```bash
   git push origin --delete feature/new-feature
   ```

## **状況 4: リモートブランチをチェックアウトして作業する**

1. **リモートブランチを一覧表示**

   ```bash
   git branch -r
   ```

2. **リモートのブランチをローカルにチェックアウトする**

   ```bash
   git checkout -b feature/new-feature origin/feature/new-feature
   ```

   または

   ```bash
   git switch -c feature/new-feature origin/feature/new-feature
   ```

3. **リモートブランチに変更を加えたら、ローカルブランチをリモートにプッシュ**

   ```bash
   git push origin feature/new-feature
   ```

## **状況 5: プルリクエストのために履歴をきれいに整えたい**

1. **コミット履歴を整理するために、`rebase`を使用して不要な履歴を直線化する**
   - 開発ブランチにいると仮定して、`main`ブランチにリベース。

     ```bash
     git checkout feature/new-feature
     git rebase main
     ```

2. **不要なコミットを整理する（オプション）**
   - インタラクティブなリベースで、不要なコミットをまとめたり修正したりします。

     ```bash
     git rebase -i main
     ```

   - 編集画面が開くので、必要に応じてコミットを修正（`squash`など）。

3. **リモートのブランチに変更をプッシュ**
   - リベース後は、強制プッシュでリモートブランチを上書きする必要があります。

     ```bash
     git push origin feature/new-feature --force
     ```

## **状況 6: マージコンフリクトの解決**

1. **`git merge`または`git rebase`でコンフリクトが発生した場合**
   - Gitは競合したファイルに特別なマーカーをつけて教えてくれます。競合ファイルを手動で開いて修正します。

2. **競合解決後、修正内容をステージング**

   ```bash
   git add <競合解決したファイル>
   ```

3. **マージの場合はそのままコミットし、リベースの場合は続行**
   - マージの場合：

     ```bash
     git commit
     ```

   - リベースの場合：

     ```bash
     git rebase --continue
     ```

---

状況に応じて`merge`と`rebase`を適切に使い分け、コンフリクトに柔軟に対応することで、プロジェクトをスムーズに進めることができます。
