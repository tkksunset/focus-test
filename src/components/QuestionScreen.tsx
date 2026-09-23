"use client";

import { useEffect, useRef } from "react";
import AnswerButton from "./AnswerButton";
import ProgressBar from "./ProgressBar";
import { ANSWER_OPTIONS, type AnswerValue, type Question } from "@/lib/questions";

type Props = {
  question: Question;
  index: number; // 0 始まり
  total: number;
  selected: AnswerValue | null;
  locked: boolean; // 自動遷移中は他の選択肢を押せない
  direction: "forward" | "back";
  onAnswer: (value: AnswerValue) => void;
  onBack: () => void;
};

export default function QuestionScreen({ question, index, total, selected, locked, direction, onAnswer, onBack }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  // 質問が切り替わったら、スクリーンリーダー・キーボード利用者のために質問文へフォーカス
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [question.id]);

  // キーボードの 1〜5 でも回答できる
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const n = Number(e.key);
      if (n >= 1 && n <= 5 && !locked) onAnswer(n as AnswerValue);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [locked, onAnswer]);

  const anim = direction === "forward" ? "animate-slide-in-right" : "animate-slide-in-left";

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
      <header className="flex items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="-ml-2 inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-bold text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
          aria-label={index === 0 ? "トップに戻る" : "前の質問に戻る"}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
            <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          戻る
        </button>
        <p className="num text-lg font-extrabold" aria-hidden>
          {index + 1}
          <span className="mx-1 text-ink-soft">/</span>
          <span className="text-ink-soft">{total}</span>
        </p>
      </header>

      <div className="mt-3">
        <ProgressBar current={index + 1} total={total} />
      </div>

      <div key={question.id} className={`flex flex-1 flex-col ${anim}`}>
        <div className="flex flex-1 flex-col justify-center py-6">
          <p className="num mb-3 text-sm font-bold tracking-widest text-sky-deep">Q{String(index + 1).padStart(2, "0")}</p>
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="whitespace-pre-line text-[clamp(1.15rem,6vw,1.6rem)] leading-[1.6] font-black outline-none"
          >
            <span className="sr-only">{`${total}問中${index + 1}問目。`}</span>
            {question.text}
          </h2>
        </div>

        <div role="group" aria-label="あてはまるものを選んでください" className="flex flex-col gap-2.5 min-[375px]:gap-3">
          {ANSWER_OPTIONS.map((opt, i) => (
            <AnswerButton
              key={opt.value}
              label={opt.label}
              index={i}
              selected={selected === opt.value}
              disabled={locked}
              onSelect={() => onAnswer(opt.value)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
