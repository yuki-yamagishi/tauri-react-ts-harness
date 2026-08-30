import { describe, it, expect, beforeEach } from "vitest";
import { MemoryStorageAdapter, LocalStorageAdapter } from "@/services/storage/storageAdapter";

describe("StorageAdapter (src/services/storage/storageAdapter.ts)", () => {
  describe("MemoryStorageAdapter", () => {
    let storage: MemoryStorageAdapter;

    beforeEach(() => {
      storage = new MemoryStorageAdapter();
    });

    it("データの保存と取得ができること", async () => {
      await storage.setItem("user", { name: "Alice", role: "admin" });
      const user = await storage.getItem<{ name: string; role: string }>("user");
      expect(user).toEqual({ name: "Alice", role: "admin" });
    });

    it("存在しないキーは null を返すこと", async () => {
      const val = await storage.getItem("non_existent");
      expect(val).toBeNull();
    });

    it("データの削除ができること", async () => {
      await storage.setItem("key1", "value1");
      await storage.removeItem("key1");
      const val = await storage.getItem("key1");
      expect(val).toBeNull();
    });

    it("クリアができること", async () => {
      await storage.setItem("k1", 1);
      await storage.setItem("k2", 2);
      await storage.clear();
      expect(await storage.getItem("k1")).toBeNull();
      expect(await storage.getItem("k2")).toBeNull();
    });
  });

  describe("LocalStorageAdapter", () => {
    let storage: LocalStorageAdapter;

    beforeEach(() => {
      localStorage.clear();
      storage = new LocalStorageAdapter("test_");
    });

    it("LocalStorage を介してデータが正しくシリアライズ・デシリアライズされること", async () => {
      await storage.setItem("config", { theme: "dark", autoSave: true });
      const result = await storage.getItem<{ theme: string; autoSave: boolean }>("config");
      expect(result).toEqual({ theme: "dark", autoSave: true });
    });

    it("キー削除とプレフィックス付きクリアが動作すること", async () => {
      await storage.setItem("a", 100);
      await storage.setItem("b", 200);
      localStorage.setItem("other_key", "keep");

      await storage.clear();

      expect(await storage.getItem("a")).toBeNull();
      expect(await storage.getItem("b")).toBeNull();
      expect(localStorage.getItem("other_key")).toBe("keep");
    });
  });
});
