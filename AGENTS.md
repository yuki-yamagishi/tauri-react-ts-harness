# Tauri + React + TypeScript AI駆動開発ハーネス規約 (AGENTS.md)

本リポジトリは、**Tauri v2 + React 18 (TypeScript Strict) + Vite + Tailwind CSS** で構築されたデスクトップ/Web両対応アプリケーションの基盤テンプレートです。
AI エージェントと開発者は、本ドキュメントに定められた **「AIアシスト Issue & PR + ADR ハイブリッドワークフロー」** を厳格に遵守して開発を進めてください。

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
  ├── adr/                # Architecture Decision Records (不変の設計決定記録)
  ├── pre_phase_verification.md   # 各フェーズ開始前の4軸事前検証ログ
  ├── implementation_plan.md      # フェーズごとの簡潔な作業計画書
  ├── walkthrough.md              # フェーズ完了・成果レポート
  └── architecture.md             # アーキテクチャ解説
tests/                    # 自動テストハーネス (Vitest)
```

---

## 2. AIアシスト Issue & PR + ADR ハイブリッド開発フロー

機能追加・改修時は、コンテキストドリフトと仕様破壊を防ぐため以下の標準フローに従います：

```
[ 1. AIアシスト Issue 起票 ] ───> [ 2. ADR 作成 (必要時) ] ───> [ 3. ブランチ & 実装 ] ───> [ 4. PR作成 & CIパス ]
  (gh issue または URL)            (docs/adr/000X-...)           (feature/issue-X-...)        (npm run check / GitHub Actions)
```

### ① AIアシスト Issue 起票
- ユーザーの要望に基づき、AIが「概要・要件定義・受け入れ基準（Acceptance Criteria）・技術論点」を整理した Issue を生成/起票（`gh issue create` またはワンクリックURLを提示）。

### ② ADR（設計決定記録）の作成
- 新しいライブラリ選定やアーキテクチャの変更を伴う場合は、必ず `docs/adr/000X-xxx.md` を作成して意思決定理由を記録。

### ③ ブランチ作成 & 実装 & 自動品質検査
- `git checkout -b feature/issue-<番号>-<概要>` でブランチを切る。
- コアロジック（`src/core/`）から順に実装し、`npm run check` ですべての品質ゲートを通過させる。

### ④ Pull Request 作成 & CI 自動検査
- PR 本文に `Closes #<Issue番号>` を含めて PR を作成（`gh pr create` またはワンクリックURL）。
- GitHub Actions CI で `npm run check` の自動合格を確認後、マージ。

---

## 3. コンテキストドリフト & 仕様破壊の絶対防止ルール

1. **既存テストの弱体化・削除の厳禁**:
   - リファクタリングや機能追加時に、既存の単体テストが失敗した際、**テストの期待値やアサーションを安易に書き換えて合格させてはなりません**。
   - 仕様変更である場合は、必ずユーザーの合意と ADR の更新を行った上でテストを改定してください。
2. **純粋コアロジックの不可侵**:
   - `src/core/` 内で React や DOM、ブラウザ API を絶対にインポートしないでください。
3. **ADR の遵守義務**:
   - 実装前に `docs/adr/` 配下のレコードを確認し、過去の設計決定と矛盾するコードを書いてはなりません。
4. **ドキュメントの完全日本語標準化**:
   - `docs/` 配下のすべての設計書・ADR・レポートは **完全日本語** で記述・更新してください。
5. **ワンショット品質ゲートの一括パス**:
   - コミット・PR作成前には必ず `npm run check` を実行し、全項目 PASS を確認してください。
6. **Windows PowerShell 環境での実行規約**:
   - Windows 環境では PowerShell のスクリプト実行ポリシーを回避するため、必ず `npm.cmd`（`npm.cmd run check`、`npm.cmd install` 等）を使用してください。
7. **共有 Git Hooks の自動有効化**:
   - リポジトリの Git Hooks は `.githooks/` 配下でバージョン管理されており、初回またはクローン時には `npm run prepare`（`git config core.hooksPath .githooks`）により自動設定されます。

---

## 4. 開発 & 検証コマンド一覧

| コマンド | 目的・実行内容 |
| :--- | :--- |
| `npm run check` | **ワンショット総合品質ゲート**: シークレットスキャン + ドキュメント検査 + 型検査 (`tsc --noEmit`) + 単体テスト (`vitest run --coverage`) + 本番ビルド (`vite build`) を一括実行 |
| `npm run security-check` | APIキーやシークレットの誤混入を自動スキャン |
| `npm run doc-check` | `docs/` 配下の必須ドキュメント整合性を自動検証 |
| `npm run test:run` | 全単体テストを 1 回実行 |
| `npm run test:coverage` | 単体テストを実行し、カバレッジを出力 |
| `npm run dev` | Vite ローカル開発サーバーを起動 (ポート 1420) |
| `npm run build` | TypeScript コンパイルおよびフロントエンドのプロダクションビルド |
