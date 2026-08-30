# Architecture Decision Records (ADR / 設計決定記録)

本ディレクトリは、本プロジェクトにおいて決定された重要なアーキテクチャ・技術選定・設計判断の理由とトレードオフを不変のログとして記録・保守する場所です。

---

## 📌 ADR の運用ルール

1. **不変性 (Immutability)**:
   - 一度合意され `Accepted` となった ADR は原則として上書き修正しません。
   - 設計を変更・撤回する場合は、新しい番号の ADR を起票し「`Supercedes ADR-0001`」のように後継レコードとして記録します。
2. **AI エージェントの遵守義務**:
   - AI エージェントは開発・改修前に必ず本ディレクトリの ADR を読み込み、**「既存の ADR に反する変更」および「既存テストの安易な弱体化・削除」を行ってはなりません**。

---

## 📚 ADR 一覧

| 番号 | タイトル | ステータス | 決定日 |
| :--- | :--- | :--- | :--- |
| [ADR-0001](file:///docs/adr/0001-clean-architecture-and-pure-domain.md) | クリーンアーキテクチャと純粋ドメインロジックの採用 | **Accepted** | 2026-08-30 |
| [ADR-0002](file:///docs/adr/0002-dual-storage-adapter.md) | Web / Tauri デュアル対応 StorageAdapter の採用 | **Accepted** | 2026-08-30 |
