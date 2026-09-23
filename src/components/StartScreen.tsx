"use client";

import Disclaimer from "./Disclaimer";
import Dot from "./Dot";
import ScoreText from "./ScoreText";
import { SITE } from "@/lib/config";
import type { ScoreRecord } from "@/lib/storage";

type Props = {
  onStart: () => void;
  lastRecord: ScoreRecord | null;
};

function shortDate(iso: string) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

export default function StartScreen({ onStart, lastRecord }: Props) {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center px-6 pb-10 pt-14 text-center">
      <div className="animate-rise" style={{ animationDelay: "40ms" }}>
        <Dot size={56} className="mx-auto mb-5 animate-wiggle" color="var(--color-butter)" />
      </div>

      <h1 className="animate-rise text-[2.75rem] leading-none font-black tracking-tight sm:text-6xl" style={{ animationDelay: "120ms" }}>
        集中力テスト
      </h1>
      <p className="animate-rise mt-3 font-display text-sm font-bold tracking-[0.2em] text-ink-soft" style={{ animationDelay: "180ms" }}>
        {SITE.byline}
      </p>

      <p className="animate-rise mt-10 text-2xl leading-snug font-black sm:text-[1.7rem]" style={{ animationDelay: "260ms" }}>
        今のあなた、
        <br />
        <span className="relative inline-block">
          <span className="absolute inset-x-[-4px] bottom-1 -z-10 h-3 rounded-full bg-butter" aria-hidden />
          どれくらい集中できてる？
        </span>
      </p>

      <p className="animate-rise mt-5 text-[15px] leading-relaxed font-medium text-ink-soft" style={{ animationDelay: "320ms" }}>
        10個の質問に答えて、
        <br />
        今の集中状態をチェックしてみよう。
      </p>

      <p className="animate-rise mt-4 inline-flex items-center gap-1.5 rounded-full border-2 border-ink/80 bg-paper px-3 py-1 text-xs font-bold" style={{ animationDelay: "360ms" }}>
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
          <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 4.5V8l2.5 1.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        所要時間：約1分
      </p>

      <div className="animate-rise mt-10 w-full" style={{ animationDelay: "440ms" }}>
        <button
          type="button"
          onClick={onStart}
          className="btn-pop group relative w-full rounded-full border-2 border-ink bg-sky px-8 py-5 text-xl font-black tracking-wide"
        >
          <span className="inline-flex items-center gap-2">
            集中力を測る
            <svg viewBox="0 0 24 24" className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
              <path d="M5 12h13m-5-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>

        {lastRecord && (
          <p className="mt-4 text-sm font-medium text-ink-soft">
            前回（{shortDate(lastRecord.takenAt)}）は{" "}
            <ScoreText value={lastRecord.score} className="text-base font-bold text-ink" />
            。今日はどうだろう？
          </p>
        )}
      </div>

      <Disclaimer className="animate-rise mt-10" />
    </main>
  );
}
