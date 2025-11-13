# コンテンツ更新ガイド

このガイドでは、新しい女優/グラビア記事を追加・更新する方法を説明します。

## 📁 ファイル構成

```
data/
  actresses/
    actress-001.json  # 女優Aのメタデータ
    actress-002.json  # 女優Bのメタデータ
    actress-003.json  # 女優Cのメタデータ

R2 バケット:
  actresses/
    actress-001/
      1.jpg
      2.jpg
      3.jpg
      4.jpg
      5.jpg
    actress-002/
      1.jpg
      2.jpg
      3.jpg
      4.jpg
```

## ✨ 新しい記事を追加する手順

### 1. R2に画像をアップロード

**命名規則：**
- フォルダ名: `actresses/actress-XXX/` (XXXは連番)
- 画像名: `1.jpg`, `2.jpg`, `3.jpg`... (連番)

**例：**
```
actresses/
  actress-004/
    1.jpg
    2.jpg
    3.jpg
    4.jpg
    5.jpg
```

**アップロード方法：**
- Cloudflare R2ダッシュボードから手動アップロード
- または AWS CLI (S3互換):
  ```bash
  aws s3 cp local-folder/ s3://your-bucket/actresses/actress-004/ \
    --endpoint-url https://[account-id].r2.cloudflarestorage.com \
    --recursive
  ```

---

### 2. メタデータJSONファイルを作成

`data/actresses/actress-004.json` を作成：

```json
{
  "slug": "actress-gravure-004",
  "name": "新しい女優名",
  "title": "タイトル（例：セクシーグラビア Vol.4）",
  "category": "グラビア",
  "date": "2024-01-20",
  "excerpt": "この記事の簡単な説明文",
  "tags": ["グラビア", "セクシー"],
  "imageCount": 5,
  "folder": "actress-004"
}
```

**各フィールドの説明：**
- `slug`: URL用の一意なID（半角英数字とハイフン）
- `name`: 女優名
- `title`: 記事タイトル
- `category`: カテゴリ（グラビア / 水着 / セクシー）
- `date`: 公開日（YYYY-MM-DD形式）
- `excerpt`: 記事の説明（1〜2文）
- `tags`: タグの配列
- `imageCount`: 画像の枚数（重要！）
- `folder`: R2のフォルダ名

---

### 3. GitHubにコミット＆プッシュ

```bash
# ローカルで確認
npm run generate

# GitHubにプッシュ
git add data/actresses/actress-004.json
git commit -m "Add new actress: 新しい女優名"
git push
```

---

### 4. 自動デプロイ

GitHubにプッシュすると：
1. Cloudflare Pagesが自動的にビルド開始
2. `npm run build` が実行される
3. ビルド前に `npm run generate` が自動実行
4. メタデータから `data/posts.ts` が自動生成
5. サイトがデプロイされる

**所要時間：** 約1〜2分

---

## 🔄 既存記事を更新する

### 画像を追加する場合

1. R2に新しい画像をアップロード（連番を続ける）
2. JSONファイルの `imageCount` を更新
3. Gitにコミット＆プッシュ

**例：**
```json
{
  ...
  "imageCount": 8  // 5枚 → 8枚に増やした
}
```

### メタデータを修正する場合

1. `data/actresses/actress-XXX.json` を編集
2. Gitにコミット＆プッシュ

---

## 🗑️ 記事を削除する

1. JSONファイルを削除
   ```bash
   git rm data/actresses/actress-004.json
   git commit -m "Remove actress-004"
   git push
   ```

2. R2から画像を削除（オプション）

---

## 🚀 ローカルで確認する

```bash
# 記事を生成
npm run generate

# 開発サーバー起動
npm run dev
```

ブラウザで `http://localhost:3000` を開いて確認。

---

## 📊 画像のベストプラクティス

### ファイルサイズ
- **推奨サイズ：** 800px〜1200px幅
- **ファイルサイズ：** 200KB〜500KB/枚
- **フォーマット：** JPG（品質80〜85%）

### 最適化ツール
- **ImageMagick:**
  ```bash
  mogrify -resize 1200x1200\> -quality 85 *.jpg
  ```
- **オンラインツール:** TinyJPG, Squoosh

---

## ❓ トラブルシューティング

### ビルドエラーが出る
```bash
# ローカルで生成を試す
npm run generate

# エラーメッセージを確認
```

### 画像が表示されない
- R2のURLが正しいか確認
- 画像のファイル名が連番（1.jpg, 2.jpg...）になっているか確認
- R2の画像が公開アクセス可能か確認

### JSONの書き方がわからない
- 既存の `actress-001.json` をコピーして編集
- JSON構文チェッカーで確認: https://jsonlint.com/

---

## 📝 メモ

- **画像のURL** は自動生成されるため、JSONには書かない
- **画像の順番** はファイル名の連番で決まる（1.jpg → 2.jpg → 3.jpg）
- **日付順** に記事が自動ソートされる
- **サムネイル** は自動的に1枚目の画像になる
