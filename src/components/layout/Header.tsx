import { Terminal, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200">
          <Terminal className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-base font-bold text-slate-900 leading-none flex items-center gap-2">
            Tauri + React + TS Harness
            <Badge variant="success" className="text-[10px] px-2 py-0">v0.1.0 Ready</Badge>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Domain-Driven Clean Architecture Starter</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100/80 px-3 py-1.5 rounded-lg">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Harness Verified</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 font-medium">
          <Sparkles className="h-4 w-4 text-indigo-600" />
          <span>AI-Ready</span>
        </div>
      </div>
    </header>
  );
}
