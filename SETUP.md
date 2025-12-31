# R2自動スキャン機能 セットアップガイド

このガイドでは、Cloudflare R2の自動スキャン機能を有効にするための手順を説明します。

## 📋 前提条件

- Cloudflareアカウント
- R2バケットが作成済み
- Node.js環境

---

## 🔧 セットアップ手順

### ステップ1: 必要なパッケージをインストール

```bash
npm install --save-dev @aws-sdk/client-s3
```

### ステップ2: R2 APIキーの取得

#### 2-1. Cloudflare Dashboardにログイン

https://dash.cloudflare.com/ にアクセス

#### 2-2. R2ページに移動

左メニュー → **R2** をクリック

#### 2-3. アカウントIDを確認

R2ページ右側に表示される **Account ID** をコピー

例: `a1b2c3d4e5f6g7h8i9j0`

#### 2-4. APIトークンを作成

1. R2ページ → **Manage R2 API Tokens** をクリック
2. **Create API token** ボタンをクリック
3. 設定:
   - **Token name**: `R2 Read-Only for Build` (任意の名前)
   - **Permissions**:
     - `Object Read` にチェック（読み取り専用）
     - ⚠️ `Object Write` や `Object Delete` は不要
   - **TTL**: `Forever` または適切な期限
   - **Include specific buckets**: あなたのバケット名を選択
4. **Create API Token** をクリック

#### 2-5. 認証情報をコピー

以下の2つの値が表示されます：

```
Access Key ID: xxxxxxxxxxxxxxxxxxxx
Secret Access Key: yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
```

⚠️ **重要**: Secret Access Keyは一度しか表示されません。必ずコピーして保存してください。

---

### ステップ3: ローカル環境変数の設定

#### 3-1. .envファイルを作成

```bash
cp .env.example .env
```

#### 3-2. .envファイルを編集

`.env` ファイルを開いて、取得した値を入力：

```env
R2_ACCOUNT_ID=your-account-id-here
R2_ACCESS_KEY_ID=your-access-key-id-here
R2_SECRET_ACCESS_KEY=your-secret-access-key-here
R2_BUCKET_NAME=adult-pic-media
```

**例:**
```env
R2_ACCOUNT_ID=a1b2c3d4e5f6g7h8i9j0
R2_ACCESS_KEY_ID=abc123def456ghi789
R2_SECRET_ACCESS_KEY=aBcDeFgHiJkLmNoPqRsTuVwXyZ123456789
R2_BUCKET_NAME=adult-pic-media
```

---

### ステップ4: Cloudflare Pages環境変数の設定

Cloudflare Pagesでビルド時にR2スキャンを有効にするため、環境変数を設定します。

#### 4-1. Cloudflare Pagesプロジェクトを開く

1. https://dash.cloudflare.com/ にログイン
2. 左メニュー → **Pages**
3. プロジェクトを選択

#### 4-2. 環境変数を追加

1. **Settings** タブをクリック
2. 左メニュー → **Environment variables**
3. **Add variable** を4回クリックして、以下を追加：

| Variable name | Value | Environment |
|--------------|-------|-------------|
| `R2_ACCOUNT_ID` | あなたのアカウントID | Production & Preview |
| `R2_ACCESS_KEY_ID` | あなたのAccess Key ID | Production & Preview |
| `R2_SECRET_ACCESS_KEY` | あなたのSecret Access Key | Production & Preview |
| `R2_BUCKET_NAME` | `adult-pic-media` | Production & Preview |

4. **Save** をクリック

⚠️ **注意**: 環境変数を追加した後、次回のデプロイから有効になります。

---

### ステップ5: R2のフォルダ構造を準備

R2に以下のようなフォルダ構造を作成します：

```
R2バケット: grabia-images
├── 女優A/                    ← カテゴリフォルダ
│   ├── 記事001/             ← 記事フォルダ
│   │   ├── 1.jpg
│   │   ├── 2.jpg
│   │   └── 3.jpg
│   └── 記事002/
│       ├── 1.jpg
│       └── 2.jpg
└── 女優B/
    └── 記事003/
        └── ...
```

#### フォルダ構造のルール:

1. **カテゴリ**: ルート直下にカテゴリフォルダを作成
   - 例: `橋本環奈/`
2. **記事**: カテゴリフォルダ配下に記事フォルダを作成
   - 例: `橋本環奈/2024年最新グラビア/`
3. **画像**: 記事フォルダ内に画像ファイル
   - 対応形式: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`
   - ファイル名: 任意（連番でなくてもOK）

---

### ステップ6: 動作確認

#### ローカルでテスト

```bash
# ビルドを実行（自動的にgenerate-posts.jsが実行されます）
npm run build
```

成功すると以下のような出力が表示されます：

```
🚀 Starting post generation...

📡 Using R2 API to scan folder structure...
🔍 Scanning R2 folder structure...
📁 Found 2 category folders
  📂 Category: 女優A (2 articles)
    ✓ 記事001 (3 images)
    ✓ 記事002 (2 images)
  📂 Category: 女優B (1 articles)
    ✓ 記事003 (5 images)

✅ Generated 3 posts → data/posts.ts
📊 Total images: 10
```

#### デプロイしてテスト

```bash
git add .
git commit -m "Enable R2 auto-scan feature"
git push
```

Cloudflare Pagesのビルドログを確認して、R2スキャンが成功しているか確認します。

---

## 🔄 メンテナンス方法

### 新しい記事を追加する場合

1. **R2に画像をアップロード**
   ```
   {カテゴリ}/{新記事名}/ に画像をアップロード
   ```

2. **再デプロイ**
   ```bash
   git commit --allow-empty -m "Add new post"
   git push
   ```

3. **完了！**
   - サイトに自動的に反映されます

### 画像を追加・削除する場合

1. **R2で画像を追加/削除**
2. **再デプロイ**（上記と同じ）

---

## 🛠️ トラブルシューティング

### R2スキャンが失敗する場合

**症状:**
```
⚠️  R2 credentials not found. Falling back to JSON files.
```

**原因と対処:**
1. 環境変数が設定されていない
   - `.env` ファイルが正しく作成されているか確認
   - Cloudflare Pagesの環境変数が設定されているか確認

2. APIキーが無効
   - Cloudflare Dashboardで新しいAPIトークンを作成

3. バケット名が間違っている
   - `R2_BUCKET_NAME` の値を確認

### R2に画像があるのに記事が生成されない

**確認事項:**
1. フォルダ構造が正しいか
   - ルート直下にカテゴリフォルダがあるか
   - カテゴリ → 記事 → 画像 の2層構造になっているか

2. 画像ファイルの拡張子
   - `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif` のいずれかか

3. ビルドログを確認
   - Cloudflare Pages → Deployments → 最新のデプロイ → View build log

### JSONフォールバックモード

R2スキャンが失敗した場合、自動的に従来の `data/actresses/*.json` を使用します。

環境変数が設定されていない環境（ローカル開発など）では、JSONモードで動作します。

---

## 📝 補足情報

### セキュリティ

- APIトークンは **読み取り専用** にしてください
- `.env` ファイルは `.gitignore` に含まれているため、Gitにコミットされません
- Cloudflare Pagesの環境変数は暗号化されて保存されます

### コスト

- R2 APIリクエスト: 1000万リクエスト/月まで無料
- 通常の使用量（月10回ビルド、500記事）: 約0.01%の使用率
- **実質無料**

### パフォーマンス

- ビルド時間への影響: +10-30秒程度
- 記事数が増えてもほぼ一定（R2のリスト操作は高速）

---

## ✅ チェックリスト

実装完了時のチェックリスト：

- [ ] `@aws-sdk/client-s3` をインストール済み
- [ ] R2 APIキーを取得済み
- [ ] `.env` ファイルを作成し、認証情報を設定済み
- [ ] Cloudflare Pagesの環境変数を設定済み
- [ ] R2にカテゴリ/記事/画像のフォルダ構造を作成済み
- [ ] ローカルで `npm run build` が成功
- [ ] Cloudflare Pagesでデプロイが成功
- [ ] サイトで記事が表示されることを確認
- [ ] 管理画面フォルダ（`app/admin/`）を削除済み

---

## 🎉 完了

これでR2の自動スキャン機能が有効になりました！

今後は R2 に画像をアップロード → 再デプロイ だけで、サイトに自動反映されます。
