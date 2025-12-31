# プロジェクト概要: adult-pic-media

## プロジェクト名
グラビア図鑑（Adult Media Gallery）- 成人向けメディアギャラリーサイト

## 技術スタック
- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **UI**: React 18, TailwindCSS
- **デプロイ**: Cloudflare Pages（静的エクスポート）
- **画像ホスティング**: Cloudflare R2
- **R2 URL**: `https://pub-38a5803166a44a668002f313b530f97f.r2.dev`

## プロジェクト構造

### ディレクトリ構成
```
adult-pic-media/
├── app/                    # Next.js App Router
│   ├── page.tsx           # トップページ（カテゴリー別 + 全投稿一覧）
│   ├── layout.tsx         # ルートレイアウト
│   ├── admin/             # 管理画面
│   │   └── page.tsx       # コンテンツ管理UI
│   ├── posts/[slug]/      # 個別記事ページ
│   ├── category/[slug]/   # カテゴリー別一覧
│   ├── contact/           # お問い合わせ
│   ├── dmca/              # DMCA削除フォーム
│   ├── terms/             # 利用規約
│   └── privacy/           # プライバシーポリシー
├── components/            # Reactコンポーネント
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Sidebar.tsx
│   ├── EncyclopediaCard.tsx  # カード型表示
│   ├── PostCard.tsx
│   ├── Gallery.tsx
│   └── AdSlot.tsx         # 広告スロット
├── data/                  # データファイル
│   ├── actresses/         # 各女優のJSONメタデータ
│   │   ├── actress-001.json
│   │   ├── actress-002.json
│   │   └── ...
│   └── posts.ts           # 自動生成されるポストデータ
├── scripts/
│   └── generate-posts.js  # JSONからTypeScriptファイルを生成
├── types/
│   └── Post.ts            # 型定義
└── package.json
```

## データ構造

### JSONメタデータ（data/actresses/*.json）
```json
{
  "slug": "actress-gravure-001",
  "name": "女優名",
  "title": "記事タイトル",
  "category": "カテゴリー名",
  "date": "2024-01-15",
  "excerpt": "記事の説明文",
  "tags": ["タグ1", "タグ2"],
  "imageCount": 5,
  "folder": "actress-001",
  "popularity": 100
}
```

### R2画像構造
```
R2バケット/
└── actresses/
    ├── actress-001/
    │   ├── 1.jpg
    │   ├── 2.jpg
    │   └── 3.jpg
    ├── actress-002/
    │   ├── 1.jpg
    │   └── 2.jpg
    └── ...
```

## 主要機能

### 1. トップページ（/）
- カテゴリー別セクション（各6件表示）
- 全投稿一覧（人気順、120件/ページ）
- ページネーション機能

### 2. 管理画面（/admin）
**目的**: 画像メンテナンスを簡単にするためのWeb UI

**機能**:
- ✅ 4項目の入力フォーム:
  1. カテゴリ名（既存選択 or 新規作成）
  2. 記事名
  3. R2フォルダ名
  4. 画像枚数
- ✅ 複数記事の同時作成
- ✅ JSONファイルの一括ダウンロード
- ✅ R2アップロード手順の自動生成
- ✅ 視覚的なフィードバック（R2パス表示）

**ワークフロー**:
1. `/admin` で記事情報を入力
2. JSONファイルをダウンロード
3. `data/actresses/` に配置
4. R2に画像をアップロード（表示されたパスに従う）
5. Git push → Cloudflare Pagesが自動デプロイ

### 3. 自動ビルドシステム
- **コマンド**: `npm run build`
- **prebuild**: `npm run generate` が自動実行
- **generate-posts.js**:
  - `data/actresses/*.json` を読み込み
  - 画像URLを自動生成（R2_URL + folder + 連番）
  - `data/posts.ts` を生成（型安全なPost配列）
  - 人気順（popularity）でソート

## デプロイフロー

```
1. JSONファイル作成（管理画面 or 手動）
   ↓
2. Git commit & push
   ↓
3. Cloudflare Pagesトリガー
   ↓
4. npm run build
   ├── prebuild: npm run generate
   ├── generate-posts.js実行
   ├── data/posts.ts生成
   └── next build（静的エクスポート）
   ↓
5. out/ ディレクトリがデプロイ
```

## 重要なポイント

### コンテンツ追加時の注意
- **画像の命名**: 必ず連番（1.jpg, 2.jpg, 3.jpg...）
- **フォルダ名**: 半角英数字とハイフンのみ
- **imageCount**: R2にアップロードした画像枚数と一致させる
- **R2パス**: `actresses/{folder}/{連番}.jpg`

### ビルドプロセス
- `data/posts.ts` はGit管理外でも問題ない（自動生成されるため）
- JSONファイルのみコミットすればOK
- R2画像は別途手動アップロード必要

## 最近の変更履歴
- `be06229`: MCP servers設定（uvx/npx フルパス化）
- `7fa8b72`: Serena MCP server追加
- `ba55c0b`: 管理画面を4項目に簡素化
- `c9ee4a4`: Web版管理画面を追加

## 今後の拡張可能性
- 年齢確認ゲート（未実装）
- 画像の自動最適化（WebP変換など）
- R2直接アップロード機能
- タグ検索機能
- 人気度の自動計算
