# Adult Media Gallery

成人向けメディアギャラリーサイト（18歳以上対象）

## 特徴

- **静的サイト生成**: Next.js + 静的エクスポート
- **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応
- **画像最適化**: 遅延読み込み、サムネイル生成
- **広告スロット**: ExoClick, TrafficJunkyなど対応
- **法的対策**: DMCA削除フォーム、利用規約、プライバシーポリシー
- **低コスト運営**: Cloudflare Pages + R2 で月額0円からスタート

## 技術スタック

- Next.js 14 (App Router)
- React 18
- TypeScript
- TailwindCSS
- 静的エクスポート対応

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

### 3. プロダクションビルド

```bash
npm run build
```

静的ファイルが `out/` ディレクトリに生成されます。

## デプロイ

### Cloudflare Pages

1. Cloudflare Pagesでプロジェクト作成
2. GitHubリポジトリ接続
3. ビルドコマンド: `npm run build`
4. 出力ディレクトリ: `out`

## 画像管理

### 推奨ストレージ

- **Cloudflare R2**: 10GB無料、egress無料
- **Bunny Storage**: $0.01/GB、アダルトOK

### 画像最適化

```bash
# サムネイル: 400x400 WebP
# プレビュー: 800x800 WebP
# フル: 1920x1920 WebP
```

## 広告統合

### 対応広告ネットワーク

- ExoClick
- TrafficJunky
- JuicyAds
- EroAdvertising

`components/AdSlot.tsx` を編集して広告コードを挿入してください。

## 法的情報

### 必須対応事項

- ✅ すべてのモデルは18歳以上
- ✅ 削除要請フォーム設置済み
- ✅ 利用規約・プライバシーポリシー完備
- ⚠️ 年齢確認ゲートは未実装（追加推奨）

### 連絡先

削除要請やお問い合わせは `/dmca` または `/contact` から。

## カスタマイズ

### サイト名・色の変更

- `app/layout.tsx`: メタデータ
- `tailwind.config.js`: カラー設定
- `components/Header.tsx`: ロゴ・ナビゲーション

### 画像データの追加

`components/Gallery.tsx` の `sampleImages` を実際のデータに置き換えてください。

外部API連携やCMS統合も可能です。

## コスト試算

### 月間10万PV想定

```
Cloudflare Pages: $0（無料枠）
R2 ストレージ（50GB）: $0（無料枠内）
R2 配信: $0（egress無料）
ドメイン: $1/月

合計: $1/月
```

### 月間100万PV想定

```
Cloudflare Pages: $0
Bunny Storage（200GB）: $2
Bunny CDN（5TB）: $50
ドメイン: $1/月

合計: $53/月
```

## ライセンス

MIT

## 免責事項

このテンプレートは技術的なフレームワークです。運営者は各国の法律を遵守し、合法的なコンテンツのみを扱う責任があります。
