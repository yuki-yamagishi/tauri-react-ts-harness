# アーキテクチャ設計ガイド (Architecture Guide)

本リポジトリは、スケーラビリティ、保守性、テスト容易性を最大限に高めるため、クリーンアーキテクチャの原則に基づき設計されています。

---

## 1. レイヤー構造と依存の向き

```
[ UI レイヤー: features, components, hooks ]
       │
       ▼ (呼び出し)
[ ドメイン/コア レイヤー: core ] ◄── (依存注入/実装) ── [ インフラ レイヤー: services ]
```

### レイヤーの役割

1. **`src/core/` (Core / Domain Layer)**:
   - 純粋な TypeScript で記述されるビジネスロジック。
   - React、DOM、ブラウザ API、外部ライブラリへの依存は **厳禁**。
   - 100% 単体テスト可能（Vitest で超高速に実行）。

2. **`src/services/` (Services / Infrastructure Layer)**:
   - 外部環境との入出力を担当（ストレージ、AI API、ネットワーク通信等）。
   - インターフェースを定義し、実行環境（Web / Tauri）に応じて実装を切り替える（例: `StorageAdapter`）。

3. **`src/components/`, `src/features/`, `src/hooks/` (UI Layer)**:
   - React コンポーネント、Tailwind CSS、カスタムフック。
   - shadcn/ui スタイルの再利用可能な UI コンポーネント群を `src/components/ui/` に集約。

4. **`src/types/` (Types Layer)**:
   - システム全体で共有される TypeScript 型定義。

---

## 2. デュアルストレージパターン (Dual Storage Pattern)

デスクトップ（Tauri FS）と Web ブラウザ（LocalStorage）の両環境で同じアプリケーションコードを無修正で動作させるため、`StorageAdapter` パターンを採用しています。

```typescript
export interface StorageAdapter {
  getItem<T>(key: string): Promise<T | null>;
  setItem<T>(key: string, value: T): Promise<void>;
  removeItem(key: string): Promise<void>;
}
```
