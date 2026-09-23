"use client";

import ScoreGauge from "./ScoreGauge";
import ScoreText from "./ScoreText";
import { useCountUp } from "@/hooks/useCountUp";
import { scoreColor } from "@/lib/color";
import { getRank, SPECIAL_TAGLINE } from "@/lib/ranks";
import { formatScore } from "@/lib/scoring";
import { SITE } from "@/lib/config";

type Props = {
  score: number;
  animate: boolean;
  label?: string;
  takenAt?: string;
};

function stamp(iso?: string) {
  const d = iso ? new Date(iso) : new Date();
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default function ResultCard({ score, animate, label = "今の集中力", takenAt }: Props) {
  const rank = getRank(score);
  const special = !!rank.special;
  const shown = useCountUp(score, 1100, animate);
  const accent = scoreColor(score);
  const reveal = animate ? "animate-rise" : "";

  return (
    <section
      aria-labelledby="result-title"
      className="relative overflow-hidden rounded-[28px] border-2 border-ink px-5 pb-8 pt-7 sm:px-6 shadow-[0_6px_0_0_var(--color-ink)]"
      style={{
        background: special
          ? "linear-gradient(160deg, #fff6d6 0%, #fffdf8 38%, #e2f3ff 72%, #dff5e9 100%)"
          : "var(--color-paper)",
      }}
    >
      {/* スコア色のやわらかい円（スコアによって色が少しずつ変わる） */}
      <div
        aria-hidden
        className="absolute -right-14 -top-14 h-44 w-44 rounded-full opacity-90 transition-colors duration-700"
        style={{ background: accent }}
      />
      {special && (
        <svg aria-hidden viewBox="0 0 24 24" className="absolute left-5 top-16 h-5 w-5 animate-float text-ink">
          <path fill="currentColor" d="M12 0c.8 6.4 5.6 11.2 12 12-6.4.8-11.2 5.6-12 12-.8-6.4-5.6-11.2-12-12C6.4 11.2 11.2 6.4 12 0z" />
        </svg>
      )}

      <div className="relative">
        <div className="flex items-center justify-between">
          <p className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper px-3 py-1 text-xs font-bold">
            {label}
            <span className="font-display tracking-[0.14em] text-ink-soft">YOUR FOCUS</span>
          </p>
        </div>

        {/* 読み上げ用：カウント中の数字ではなく最終値だけを伝える */}
        <p className="sr-only" aria-live="polite">{`集中力スコアは${formatScore(score)}。${rank.title}`}</p>

        <div aria-hidden className="mt-3 text-center">
          <ScoreText
            value={shown}
            smallSign
            className={`font-extrabold leading-[0.9] ${special ? "text-[clamp(5.5rem,31vw,9.5rem)]" : "text-[clamp(5.25rem,29vw,8.5rem)]"}`}
          />
        </div>

        <ScoreGauge score={score} animate={animate} />

        <div className={reveal} style={{ animationDelay: animate ? "900ms" : undefined }}>
          <h2 id="result-title" className="mt-8 whitespace-pre-line text-balance text-center text-[1.55rem] leading-snug font-black [word-break:auto-phrase]">
            {rank.title}
          </h2>
          <p className="mt-4 whitespace-pre-line text-center text-[clamp(13px,4.1vw,15px)] leading-[1.9] font-medium text-ink/85">{rank.message}</p>
          {special && (
            <p className="mt-5 text-center font-display text-xs font-bold tracking-[0.22em] text-sky-deep">{SPECIAL_TAGLINE}</p>
          )}
        </div>

        <div className="mt-7 flex items-center justify-between border-t-2 border-dashed border-ink/15 pt-4 text-[11px] font-bold text-ink-soft">
          <span className="num tracking-wider">{stamp(takenAt)}</span>
          <span>
            {SITE.name} <span className="font-display">{SITE.byline}</span>
          </span>
        </div>
      </div>
    </section>
  );
}
