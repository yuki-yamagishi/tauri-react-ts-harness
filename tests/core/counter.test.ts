import { describe, it, expect } from "vitest";
import {
  createInitialCounterState,
  incrementCounter,
  decrementCounter,
  resetCounter,
} from "@/core/example/counter";

describe("Counter Pure Logic (src/core/example/counter.ts)", () => {
  it("初期状態が正しく作成されること", () => {
    const state = createInitialCounterState(5, 2);
    expect(state.count).toBe(5);
    expect(state.step).toBe(2);
    expect(state.history).toEqual([5]);
  });

  it("incrementCounter で指定 step 分増加し履歴に記録されること", () => {
    let state = createInitialCounterState(0, 3);
    state = incrementCounter(state);
    expect(state.count).toBe(3);
    expect(state.history).toEqual([0, 3]);

    state = incrementCounter(state);
    expect(state.count).toBe(6);
    expect(state.history).toEqual([0, 3, 6]);
  });

  it("decrementCounter で減少し、0未満にはならないこと", () => {
    let state = createInitialCounterState(2, 5);
    state = decrementCounter(state);
    expect(state.count).toBe(0);
    expect(state.history).toEqual([2, 0]);
  });

  it("resetCounter でカウントが0にリセットされること", () => {
    let state = createInitialCounterState(10, 1);
    state = incrementCounter(state);
    expect(state.count).toBe(11);

    state = resetCounter(state);
    expect(state.count).toBe(0);
    expect(state.history).toEqual([10, 11, 0]);
  });
});
