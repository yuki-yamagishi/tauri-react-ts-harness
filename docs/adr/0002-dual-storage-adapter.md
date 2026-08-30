# ADR-0002: Web / Tauri デュアル対応 StorageAdapter の採用

- **ステータス**: **Accepted**
- **決定日**: 2026-08-30
- **決定者**: 開発チーム

---

## 1. 背景と課題 (Context & Problem Statement)
本テンプレートはデスクトップアプリケーション（Tauri v2 によるローカルファイルシステム操作）と、Web ブラウザプレビュー（LocalStorage / Memory）の両環境での動作をターゲットとしている。
環境ごとにストレージ API の呼び出しコードを分岐させると、コードの可読性が著しく低下し、テスト環境（jsdom / Node）でのモック作成が煩雑になる課題があった。

## 2. 検討された選択肢 (Considered Options)
1. **選択肢 1: 各コンポーネント内で `window.__TAURI__` の存在有無を三項演算子で都度判定**
2. **選択肢 2: `StorageAdapter` インターフェースによる抽象化アダプターパターンの適用**

## 3. 決定内容と理由 (Decision Outcome & Rationale)
- **採用**: **選択肢 2（StorageAdapter パターン）**
- **理由**:
  1. `getItem`, `setItem`, `removeItem`, `clear` を共通インターフェースとして定義することで、呼び出し側（UI や Hooks）は実行環境を意識する必要がなくなる。
  2. 単体テスト時には `MemoryStorageAdapter` を差し込むことで、ファイル IO やブラウザ API に依存せず即座にテストを実行できる。
  3. 将来的に IndexedDB や SQLite、クラウドストレージ（Google Drive 等）への差し替えが必要になった際も、アダプターを追加するだけで対応可能。

## 4. トレードオフと影響 (Consequences & Trade-offs)
### メリット
- テスト容易性と保守性の劇的な向上。
- Web / デスクトップ環境の完全な透過性。
### 制約
- ストレージ操作はすべて非同期（`Promise`）インターフェースに統一される。
