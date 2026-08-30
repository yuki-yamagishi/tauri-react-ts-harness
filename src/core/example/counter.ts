/**
 * 純粋ビジネスロジック例: カウンターエンジン
 * UI / DOM / React 依存ゼロ、100% 単体テスト可能
 */

export interface CounterState {
  count: number;
  step: number;
  history: number[];
}

export function createInitialCounterState(initialCount = 0, step = 1): CounterState {
  return {
    count: initialCount,
    step: Math.max(1, step),
    history: [initialCount],
  };
}

export function incrementCounter(state: CounterState): CounterState {
  const nextCount = state.count + state.step;
  return {
    ...state,
    count: nextCount,
    history: [...state.history, nextCount],
  };
}

export function decrementCounter(state: CounterState): CounterState {
  const nextCount = Math.max(0, state.count - state.step);
  return {
    ...state,
    count: nextCount,
    history: [...state.history, nextCount],
  };
}

export function resetCounter(state: CounterState): CounterState {
  return {
    ...state,
    count: 0,
    history: [...state.history, 0],
  };
}
