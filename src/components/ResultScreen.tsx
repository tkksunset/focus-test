"use client";

import Confetti from "./Confetti";
import Disclaimer from "./Disclaimer";
import DoItInput from "./DoItInput";
import InstagramCta from "./InstagramCta";
import ResultCard from "./ResultCard";
import ScoreChange from "./ScoreChange";
import ScoreHistory from "./ScoreHistory";
import ShareButton from "./ShareButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MAX_SCORE } from "@/lib/scoring";
import type { ScoreRecord } from "@/lib/storage";

type Props = {
  score: number;
  previous: number | null;
  history: ScoreRecord[];
  takenAt: string;
  onRetake: () => void;
  onToast: (msg: string) => void;
};

export default function ResultScreen({ score, previous, history, takenAt, onRetake, onToast }: Props) {
  const reduced = useReducedMotion();
  const animate = !reduced;
  const delay = (ms: number) => (animate ? { animationDelay: `${ms}ms` } : undefined);

  return (
    <main className="mx-auto w-full max-w-md px-4 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))]">
      {score === MAX_SCORE && animate && <Confetti />}

      <p className="animate-rise mb-4 text-center text-sm font-black">
        集中力テスト <span className="font-display text-xs tracking-[0.14em] text-ink-soft">by TKK SUNSET</span>
      </p>

      <div className="animate-rise">
        <ResultCard score={score} animate={animate} takenAt={takenAt} />
      </div>

      <div className="mt-5 flex flex-col gap-5">
        {previous !== null && (
          <div className="animate-rise" style={delay(1200)}>
            <ScoreChange previous={previous} current={score} />
          </div>
        )}

        <div className="animate-rise flex flex-col gap-3" style={delay(1300)}>
          <ShareButton score={score} onToast={onToast} />
          <button
            type="button"
            onClick={onRetake}
            className="btn-pop inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-ink bg-paper px-6 py-3.5 text-base font-black"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
              <path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            もう一度測る
          </button>
        </div>

        <div className="animate-rise mt-4" style={delay(1400)}>
          <DoItInput onToast={onToast} />
        </div>

        <div className="animate-rise" style={delay(1500)}>
          <ScoreHistory history={history} />
        </div>

        <div className="mt-6">
          <InstagramCta />
        </div>

        <Disclaimer className="mt-4" />
      </div>
    </main>
  );
}
