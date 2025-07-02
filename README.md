# BetToYou

# JASSO奨学生支援プラットフォーム - プロジェクト

## プロジェクト概要

JASSO給付型奨学生向けクラウドファンディング型サービスのウェブサイトを作成し、World IDを活用したプライバシー保護機能を持つプラットフォームを開発

## 技術仕様

### フロントエンド

- **フレームワーク**: React 18 + Vite + TypeScript
- **スタイリング**: TailwindCSS
- **コード品質**: ESLint + Prettier
- **CI/CD**: GitHub Actions
- **認証**: World ID SDK (@worldcoin/idkit)
- **暗号化**: crypto-js（証明書ハッシュ化）

### 開発環境

- **Node.js**: 20
- **パッケージマネージャー**: pnpm
- **Husky**: プリコミットフック
- **lint-staged**: コミット時のコード整形

## セットアップ

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev

# ビルド
pnpm build

# リント
pnpm lint

# フォーマット
pnpm format
```

## 主要機能

### 1. World ID認証システム

- World IDKitを使用した本格的な認証機能
- デモ認証機能（開発・テスト用）
- ユーザータイプ選択（奨学生、個人支援者、企業支援者）

### 2. 奨学生管理システム

- JASSO給付証明書のハッシュ化機能
- 研究プロフィール登録
- 奨学生専用ダッシュボード
- プライバシー保護された情報管理

### 3. 支援者管理システム

- 個人支援者・企業支援者の登録
- 支援機能（1 ETH、5 ETH支援オプション）
- 支援履歴の管理
- 支援者専用ダッシュボード

### 4. 公開情報表示システム

- 認証不要でアクセス可能な透明性確保機能
- プラットフォーム統計（認証済み奨学生数、登録支援者数、総支援額等）
- 奨学生一覧（匿名化された研究情報）
- 支援者一覧（プライバシー保護された支援情報）
- 月次配分履歴

### 5. プライバシー保護機能

- 本名・住所をDBに保存しない設計
- 給付証明書はハッシュのみ保管、原本即削除
- World IDによる匿名認証
- 企業・個人寄付額はレンジ表示
- GDPR/個情法対応設計

## プロジェクト構造

```
├── .github/workflows/ci.yml    # GitHub Actions CI
├── .husky/pre-commit          # Husky pre-commit hook
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── card.jsx
│   │   │   └── tabs.jsx
│   │   ├── WorldIDAuth.jsx
│   │   ├── DemoAuth.jsx
│   │   ├── UserTypeSelection.jsx
│   │   ├── ScholarDashboard.jsx
│   │   ├── SupporterDashboard.jsx
│   │   ├── ScholarshipCertificateUpload.jsx
│   │   ├── ScholarResearchProfile.jsx
│   │   └── PublicListsDisplay.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── lib/
│   │   └── utils.js
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .eslintrc.js              # ESLint設定
├── .prettierrc               # Prettier設定
├── tailwind.config.cjs       # TailwindCSS設定
├── postcss.config.cjs        # PostCSS設定
├── vite.config.ts           # Vite設定
└── package.json             # スクリプト・依存関係
```

## 開発プロセス

1. **要件分析とプロジェクト構造設計**
2. **フロントエンド開発環境構築**
3. **World ID認証システム実装**
4. **奨学生登録・証明システム開発**
5. **支援者管理システム開発**
6. **公開リスト表示機能実装**
7. **UI/UX設計とスタイリング**
8. **テストとデバッグ**
9. **デプロイと公開**

## 特徴的な実装

### プライバシー保護

- 証明書ファイルのSHA-256ハッシュ化
- 原本の即時削除
- 匿名UID（World ID）による認証
- 支援額のレンジ表示

### ユーザビリティ

- 直感的なタブナビゲーション
- レスポンシブデザイン
- アニメーション効果
- 明確な情報階層

### 透明性確保

- 認証不要の公開情報ページ
- リアルタイム統計表示
- 配分履歴の公開
- 支援者・奨学生一覧の公開
