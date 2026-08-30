# 実装計画書 (Implementation Plan)

本ドキュメントは、事前検証（`docs/pre_phase_verification.md`）に基づき、具体的な変更ファイル一覧・実装内容・検証手順を定義した作業計画書です。

---

## 1. 計画概要

- **対象タスク**: Tauri + React + TypeScript 汎用スターターテンプレートの初期構築
- **目的**: 高品質な AI 駆動開発ハーネスとクリーンアーキテクチャ雛形の整備

---

## 2. 変更・新規作成ファイル一覧

### 基盤設定 & スクリプト
- `package.json`: ツールチェーン・ワンショット品質ゲート `npm run check` の定義
- `tsconfig.json`: TypeScript Strict モード設定
- `vite.config.ts` / `vitest.config.ts`: ビルド & 単体テスト設定
- `scripts/securityCheck.js`: シークレット漏洩スキャナー
- `scripts/docCheck.js`: ドキュメント整合性検査スクリプト

### エージェントハーネス & ドキュメント
- `AGENTS.md`: AIエージェント開発ルール・行動規範
- `.agents/skills/dev-harness/SKILL.md`: 4ステップ開発フロースキル
- `docs/`: 事前検証・計画・成果レポート雛形

### コア & UIコード
- `src/core/`: 純粋ビジネスロジック層
- `src/services/storage/`: Web/Tauri 両対応 StorageAdapter
- `src/components/ui/`: 汎用 UI コンポーネント群
- `src/App.tsx`: 初期動作確認ダッシュボード

---

## 3. 品質検証手順

1. **シークレットスキャン**: `npm run security-check`
2. **ドキュメント整合性検査**: `npm run doc-check`
3. **型検査**: `npx tsc --noEmit`
4. **単体テスト実行**: `npm run test:coverage`
5. **本番バンドルビルド**: `npm run build`
6. **ワンショット検証**: `npm run check` で全検査の一括合格を確認
