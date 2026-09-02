# [Harness Upgrade] AGENTS.md における Issue ライフサイクル管理規定（Backlog / To Do / Ready / In Progress / Done）の明文化

- **ステータス**: 🔵 着手可能 (Ready / To Do)
- **カテゴリ**: テンプレート基盤, 開発ハーネス, ガバナンス
- **由来**: `job-eval` Issue #12

---

## 📌 課題の概要 (Problem Description)

テンプレートから生成されたプロジェクトにおいて、AI エージェントが勝手にバックログのタスクを開発開始してしまう事故を防ぎ、どの Issue が着手可能（Ready）かを自律的に正しく判定・処理できるように、`AGENTS.md` に Issue ライフサイクル（Backlog / To Do / Ready / In Progress / Done）の定義とエージェントの行動プロトコルを明文化する。

---

## 🎯 要件定義 (Requirements)

1. **Issue ライフサイクルとラベルの定義**:
   - `backlog`, `todo`, `ready`, `in-progress`, `done` のマトリクスを策定。
2. **エージェント着手プロトコルの明文化**:
   - `backlog` ラベルの Issue は指示があるまで待機。
   - 着手時は `in-progress` に更新してブランチを作成する。

---

## ✅ 受け入れ基準 (Acceptance Criteria)

- [ ] `AGENTS.md` にライフサイクル定義およびエージェントの行動プロトコルが明記されていること。
- [ ] `npm run check` が正常に PASS すること。
