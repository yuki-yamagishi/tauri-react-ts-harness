# 🚀 Tauri + React + TypeScript AI駆動開発ハーネステンプレート

**Tauri v2 + React 18 (TypeScript Strict) + Vite + Tailwind CSS** で構築された、高品質デスクトップ & Web 両対応アプリケーションのスターターテンプレートです。

AI コーディングエージェント（Antigravity, Claude, Copilot 等）と人間がペアプログラミングを行う際に、**「手戻りゼロ・最高品質・完全自動検証」** を実現するための開発ハーネスがあらかじめ組み込まれています。

---

## ✨ 主な特徴

- 🛡️ **ワンショット品質 & セキュリティゲート (`npm run check`)**:
  - シークレット漏洩スキャン (`scripts/securityCheck.js`)
  - ドキュメント完全性検査 (`scripts/docCheck.js`)
  - TypeScript Strict 型検査 (`tsc --noEmit`)
  - 単体・UIテスト & カバレッジ (`vitest run --coverage`)
  - プロダクションバンドルビルド (`vite build`)
- 🏗️ **クリーンアーキテクチャ**:
  - 純粋ビジネスロジック層 (`src/core/`) を UI/DOM から完全分離（単体テスト 100% 可能）
  - デュアルストレージアダプター（Web LocalStorage / Tauri FS 両対応）
- 🤖 **AIエージェント開発ハーネス**:
  - `AGENTS.md` & `.agents/skills/dev-harness/SKILL.md` による行動規約の標準化
  - 4ステップ開発フロー（事前検証 ➔ 計画 ➔ 実装 ➔ 検証・即時プッシュ）
  - `docs/` 配下の完全日本語ドキュメント標準
- 🎨 **モダン UI スタック**:
  - Tailwind CSS + Lucide Icons + shadcn/ui スタイルコンポーネント
- 📦 **クロスプラットフォーム対応**:
  - Tauri v2 (Rust) デスクトップアプリ & Web ブラウザアプリの両対応

---

## 🚀 使い方（新規アプリの立ち上げ）

### 1. テンプレートから新規リポジトリを作成
GitHub 上で **「Use this template」** ボタンをクリックするか、CLI でクローンします：

```bash
# degit を使う場合
npx degit yuki-yamagishi/tauri-react-ts-harness my-new-app

# 移動して依存関係をインストール
cd my-new-app
npm install
```

### 2. 開発サーバー起動
```bash
# Web ブラウザ開発モード (ポート 1420)
npm run dev

# Tauri デスクトップアプリ起動 (Tauri CLI インストール時)
npm run tauri dev
```

### 3. ワンショット品質検査
```bash
npm run check
```

---

## 📁 ディレクトリ構造

```
├── .agents/skills/dev-harness/   # AIエージェント用開発ハーネススキル
├── .github/workflows/ci.yml       # GitHub Actions CI (自動品質検査)
├── docs/                          # 設計・事前検証・成果レポート (完全日本語)
│   ├── pre_phase_verification.md  # 4軸事前検証ログ
│   ├── implementation_plan.md     # 実装計画書
│   ├── walkthrough.md             # 成果レポート
│   └── architecture.md            # アーキテクチャ設計ガイド
├── scripts/
│   ├── securityCheck.js           # シークレットスキャナー
│   └── docCheck.js                # ドキュメント整合性検査
├── src/
│   ├── core/                      # 純粋ビジネスロジック (UI依存ゼロ)
│   ├── services/                  # 外部通信・永続化アダプター (Dual Storage)
│   ├── components/                # 共通 UI / レイアウトコンポーネント
│   ├── hooks/                     # React カスタムフック
│   ├── types/                     # TypeScript 型定義
│   └── lib/                       # ユーティリティ (cn等)
├── src-tauri/                     # Tauri v2 デスクトップ設定 (Rust)
├── tests/                         # Vitest 単体・UIテスト
├── AGENTS.md                      # AIエージェント開発ルール・規約
└── package.json
```

---

## 📜 ライセンス
MIT License
