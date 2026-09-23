"use client";

import Disclaimer from "./Disclaimer";
import InstagramCta from "./InstagramCta";
import ResultCard from "./ResultCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** ?score= 付きURLで開かれたときの表示（共有された結果カード） */
export default function SharedResultScreen({ score, onStart }: { score: number; onStart: () => void }) {
  const reduced = useReducedMotion();
  return (
    <main className="mx-auto w-full max-w-md px-4 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))]">
      <p className="animate-rise mb-4 text-center text-sm font-bold text-ink-soft">シェアされた結果です</p>
      <div className="animate-rise">
        <ResultCard score={score} animate={!reduced} label="この人の集中力" />
      </div>
      <div className="animate-rise mt-6 text-center" style={reduced ? undefined : { animationDelay: "1200ms" }}>
        <p className="text-lg font-black">あなたは、いくつ？</p>
        <button
          type="button"
          onClick={onStart}
          className="btn-pop mt-3 w-full rounded-full border-2 border-ink bg-sky px-6 py-4 text-lg font-black"
        >
          自分も測ってみる
        </button>
        <p className="mt-2 text-xs font-bold text-ink-soft">10問・約1分</p>
      </div>
      <div className="mt-12">
        <InstagramCta />
      </div>
      <Disclaimer className="mt-8" />
    </main>
  );
}
