import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  createInitialCounterState,
  incrementCounter,
  decrementCounter,
  resetCounter,
  CounterState,
} from "@/core/example/counter";
import { createStorageAdapter } from "@/services/storage/storageAdapter";
import {
  CheckCircle2,
  Cpu,
  Database,
  Layers,
  Sparkles,
  Plus,
  Minus,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

const storage = createStorageAdapter("harness_starter_");

export function App() {
  const [counter, setCounter] = useState<CounterState>(() => createInitialCounterState(0, 1));
  const [stepInput, setStepInput] = useState<number>(1);
  const [persistedNote, setPersistedNote] = useState<string>("");
  const [loadedNote, setLoadedNote] = useState<string>("");

  useEffect(() => {
    storage.getItem<string>("note").then((val) => {
      if (val) {
        setLoadedNote(val);
        setPersistedNote(val);
      }
    });
  }, []);

  const handleSaveNote = async () => {
    await storage.setItem("note", persistedNote);
    setLoadedNote(persistedNote);
  };

  const handleIncrement = () => {
    setCounter((prev) => incrementCounter({ ...prev, step: stepInput }));
  };

  const handleDecrement = () => {
    setCounter((prev) => decrementCounter({ ...prev, step: stepInput }));
  };

  const handleReset = () => {
    setCounter((prev) => resetCounter(prev));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto p-6 space-y-6">
        {/* ウェルカムバナー */}
        <div className="rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 p-8 text-white shadow-xl shadow-indigo-950/10">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-indigo-200 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
              <span>AI-Driven Clean Architecture Starter</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              開発ハーネスの準備が完了しました
            </h2>
            <p className="text-sm text-indigo-200 leading-relaxed">
              Tauri v2 + React 18 (TS) + Vite + Tailwind CSS をベースに、AI エージェントとの高品質なペアプログラミング環境がセットアップされています。
            </p>
          </div>
        </div>

        {/* 状態・ハーネス検証グリッド */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ① ハーネス品質ゲート状態 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  品質ゲート
                </CardTitle>
                <Badge variant="success">PASS</Badge>
              </div>
              <CardDescription>npm run check で一括検証</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>シークレット自動スキャン</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>TypeScript Strict 型検査</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Vitest 単体 & UI テスト</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Vite 本番バンドルビルド</span>
              </div>
            </CardContent>
          </Card>

          {/* ② 純粋コアロジック動作確認 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Cpu className="h-5 w-5 text-indigo-600" />
                  純粋コアロジック
                </CardTitle>
                <Badge variant="default">src/core/</Badge>
              </div>
              <CardDescription>UI非依存で単体テスト100%可能</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-500 font-medium">カウント値:</span>
                <span className="text-3xl font-extrabold text-indigo-600">{counter.count}</span>
              </div>

              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="1"
                  value={stepInput}
                  onChange={(e) => setStepInput(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center"
                />
                <Button size="sm" variant="outline" onClick={handleDecrement}>
                  <Minus className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="primary" onClick={handleIncrement}>
                  <Plus className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4 text-slate-500" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* ③ デュアルストレージ動作確認 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Database className="h-5 w-5 text-amber-600" />
                  Dual Storage
                </CardTitle>
                <Badge variant="warning">Tauri / Web</Badge>
              </div>
              <CardDescription>環境透過的なストレージ永続化</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="メモを入力..."
                  value={persistedNote}
                  onChange={(e) => setPersistedNote(e.target.value)}
                />
                <Button size="sm" variant="default" onClick={handleSaveNote}>
                  保存
                </Button>
              </div>
              <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-200/60 truncate">
                永続化データ: <span className="font-semibold text-slate-800">{loadedNote || "(未保存)"}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* アーキテクチャ解説カード */}
        <Card className="border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-slate-900">
              <Layers className="h-5 w-5 text-indigo-600" />
              次に行うこと（新規アプリケーション開発の手順）
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-slate-600 space-y-2">
            <p>1. <code className="bg-slate-200/80 px-1.5 py-0.5 rounded text-slate-800">docs/pre_phase_verification.md</code> に 4 軸事前検証ログを記録。</p>
            <p>2. <code className="bg-slate-200/80 px-1.5 py-0.5 rounded text-slate-800">docs/implementation_plan.md</code> に実装計画を作成。</p>
            <p>3. <code className="bg-slate-200/80 px-1.5 py-0.5 rounded text-slate-800">src/core/</code> に純粋ビジネスロジックを実装し、<code className="bg-slate-200/80 px-1.5 py-0.5 rounded text-slate-800">tests/</code> でテスト。</p>
            <p>4. <code className="bg-slate-200/80 px-1.5 py-0.5 rounded text-slate-800">src/features/</code> や <code className="bg-slate-200/80 px-1.5 py-0.5 rounded text-slate-800">src/components/</code> に UI を実装。</p>
            <p>5. <code className="bg-slate-200/80 px-1.5 py-0.5 rounded text-slate-800">npm run check</code> を実行し、コミット & リモートへ即時プッシュ！</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default App;
