# [Harness Upgrade] 品質ゲート（docCheck.js）における ADR 一覧（docs/adr/README.md）整合性の自動検証機能の導入

- **ステータス**: オープン (To Do)
- **カテゴリ**: テンプレート基盤, 品質ゲート, CI/CD
- **由来**: `job-eval` Issue #9

---

## 📌 課題の概要 (Problem Description)

テンプレートリポジトリから新規プロジェクトを作成した際、開発プロセス中に個別 ADR（`docs/adr/0001-...md` 等）を作成しても、親ディレクトリのインデックス目次（`docs/adr/README.md`）への追記が漏れてしまうリスクがあった。

品質ゲートスクリプト（`scripts/docCheck.js`）が `docs/adr/` 配下の全 ADR ファイルと `docs/adr/README.md` の目次テーブルを自動突合するように強化し、テンプレート由来の全プロジェクトで ADR 目次の記録漏れを機械的にゼロにする。

---

## 🎯 要件定義 (Requirements)

1. **`scripts/docCheck.js` の検証拡張**:
   - `docs/adr/` 配下の全 ADR ファイル（`0000-template.md` および `README.md` を除く）を取得。
   - `docs/adr/README.md` のテーブル内に各 ADR のファイル名または ADR 番号（例: `ADR-0001`）が記載されているかを突合。
   - 未登録の ADR が存在する場合、エラー詳細を出力してビルド/コミットを中断（`process.exit(1)`）。

---

## ✅ 受け入れ基準 (Acceptance Criteria)

- [ ] `node scripts/docCheck.js` で ADR 一覧が自動検証されること。
- [ ] `npm run check` が正常に PASS すること。
