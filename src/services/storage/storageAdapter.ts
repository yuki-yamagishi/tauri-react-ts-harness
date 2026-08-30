import { StorageAdapter } from "@/types/storage";

/**
 * Web LocalStorage 実装
 */
export class LocalStorageAdapter implements StorageAdapter {
  private prefix: string;

  constructor(prefix = "app_") {
    this.prefix = prefix;
  }

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const value = localStorage.getItem(`${this.prefix}${key}`);
      if (!value) return null;
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  }

  async setItem<T>(key: string, value: T): Promise<void> {
    localStorage.setItem(`${this.prefix}${key}`, JSON.stringify(value));
  }

  async removeItem(key: string): Promise<void> {
    localStorage.removeItem(`${this.prefix}${key}`);
  }

  async clear(): Promise<void> {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(this.prefix)) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  }
}

/**
 * メモリ内ストレージ（テスト用・フォールバック用）
 */
export class MemoryStorageAdapter implements StorageAdapter {
  private store = new Map<string, unknown>();

  async getItem<T>(key: string): Promise<T | null> {
    const val = this.store.get(key);
    return (val as T) ?? null;
  }

  async setItem<T>(key: string, value: T): Promise<void> {
    this.store.set(key, value);
  }

  async removeItem(key: string): Promise<void> {
    this.store.delete(key);
  }

  async clear(): Promise<void> {
    this.store.clear();
  }
}

/**
 * 環境に応じたストレージアダプターの生成
 */
export function createStorageAdapter(prefix = "app_"): StorageAdapter {
  if (typeof window !== "undefined" && window.localStorage) {
    return new LocalStorageAdapter(prefix);
  }
  return new MemoryStorageAdapter();
}
