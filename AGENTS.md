# Tauri + React + TypeScript AI駆動開発ハーネス規約 (AGENTS.md)

本リポジトリは、**Tauri v2 + React 18 (TypeScript Strict) + Vite + Tailwind CSS** で構築されたデスクトップ/Web両対応アプリケーションの基盤テンプレートです。
すべてのAIエージェントおよび開発者は、本ドキュメントに定められた規約を厳格に遵守して開発を進めてください。

---

## 1. クリーンアーキテクチャ構成

本コードベースは、関心の分離と高テスト容易性を実現する **Feature/Domain-Driven Clean Architecture** に基づいて構成されています。

```
src/
  ├── core/               # 純粋なビジネスロジック (UI/外部依存ゼロ、100%単体テスト可能)
  ├── services/           # 外部通信・永続化・APIアダプター (Storage, AI Provider等)
  ├── hooks/              # React カスタムフック (状態管理 & サービス同期)
  ├── features/           # 機能別 UI モジュール (画面・主要機能単位)
  ├── components/         # 共通 UI & レイアウトコンポーネント (shadcn/ui スタイル)
  │   ├── ui/             # アトミックコンポーネント (ボタン, カード, バッジ, 入力欄等)
  │   └── layout/         # ヘッダー, ナビゲーション, コンテナ等
  ├── types/              # TypeScript 型定義 (厳格な型安全性を確保)
  └── lib/                # 共通ユーティリティ (cn, フォーマッター等)
docs/                     # アーキテクチャ・設計・検証ログの唯一の正本 (Single Source of Truth)
  ├── pre_phase_verification.md   # 各フェーズ開始前の4軸事前検証ログ
  ├── implementation_plan.md      # フェーズごとの簡潔な作業計画書
  ├── walkthrough.md              # フェーズ完了・成果レポート
  └── architecture.md             # アーキテクチャ解説
tests/                    # 自動テストハーネス (Vitest)
```

---

## 2. 標準 4 ステップ開発プロトコル

各機能追加やフェーズ開始時は、必ず以下の 4 ステップを順に実行してください：

```
[ 1. 事前検証 ] ────> [ 2. 作業計画 ] ────> [ 3. 実装 & 自動検証 ] ────> [ 4. コミット & 即時プッシュ ]
 (docs/pre_...)        (docs/impl_...)         (npm run check)             (Conventional Commits)
```

### ① 事前検証ログ (`docs/pre_phase_verification.md`)
4つの検証軸（1. 技術的ボトルネック, 2. UX & エッジケース, 3. データ永続性 & 互換性, 4. テスト自律性）を評価し記録。

### ② 実装計画書 (`docs/implementation_plan.md`)
変更ファイル一覧、実装内容、検証手順を簡潔に記載。

### ③ 実装 & 自動検証
純粋ロジック層から順に実装し、`npm run check` ですべての品質ゲートを通過させる。

### ④ 実装成果レポート (`docs/walkthrough.md`) & コミット・即時プッシュ
達成内容・検証結果をレポートに記録し、Conventional Commits 形式でコミット後、直ちに `git push origin main` を実行。

---

## 3. 開発 & ワンショット品質・セキュリティゲート

| コマンド | 目的・実行内容 |
| :--- | :--- |
| `npm run check` | **ワンショット総合品質ゲート**: シークレットスキャン + ドキュメント完全性検査 + 型検査 (`tsc --noEmit`) + 単体テスト (`vitest run --coverage`) + 本番ビルド (`vite build`) を一括実行 |
| `npm run security-check` | APIキーやシークレットの誤混入を自動スキャン |
| `npm run doc-check` | `docs/` 配下の必須ドキュメント整合性・記載充実度を自動検証 |
| `npm run test:run` | 全単体テストを 1 回実行 |
| `npm run test:coverage` | 単体テストを実行し、カバレッジを出力 |
| `npm run dev` | Vite ローカル開発サーバーを起動 (ポート 1420) |
| `npm run build` | TypeScript コンパイルおよびフロントエンドのプロダクションビルド |

---

## 4. エージェントの重要開発ルール

1. **純粋なコアロジック**: `src/core/` 内で React や UI コンポーネント、ブラウザ依存 API を絶対にインポートしないでください。DOM 依存ゼロで 100% 単体テスト可能である必要があります。
2. **デュアルストレージ互換性**: データの永続化は必ず `StorageAdapter` を経由してください。デスクトップ（Tauri FS）と Web（LocalStorage）の環境差分を吸収します。
3. **厳格な型安全性**: `any` 型の使用を禁止し、`src/types/` で定義された厳格な型を使用してください。
4. **ドキュメントの完全日本語標準化**: `docs/` 配下の事前検証書、計画書、成果レポートを含む全ドキュメントは、自然で明瞭な **完全日本語** で記述・更新・保守してください。
5. **検証 & コミット・即時プッシュの完全一体化（必須）**: 変更完了時は必ず `npm run check` で全件合格を確認後、Conventional Commits 形式（`feat:`, `fix:`, `docs:`, `chore:`, `test:`, `ci:` 等）でコミットし、**直ちに `git push origin main` を実行してリモートへ即時反映してください**。
