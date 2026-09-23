"use client";

import { useState, type FormEvent } from "react";
import { addDoIt, loadTodayDoIts, removeDoIt, toggleDoIt, type DoItItem } from "@/lib/storage";

const EXAMPLES = ["30分だけ本を読む", "企画書を完成させる", "ジムに行く", "行きたかった店を予約する"];
const MAX_ITEMS = 5;

/** 「やりたい」を「やった」に。今日やることを1行で決める小さな機能 */
export default function DoItInput({ onToast }: { onToast: (msg: string) => void }) {
  // 結果画面はクライアントでのみ描画されるので、初期値で直接読み込める
  const [items, setItems] = useState<DoItItem[]>(() => loadTodayDoIts());
  const [text, setText] = useState("");
  const [placeholder] = useState(() => EXAMPLES[Math.floor(Math.random() * EXAMPLES.length)]);

  const full = items.length >= MAX_ITEMS;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const v = text.trim();
    if (!v || full) return;
    setItems(addDoIt(v));
    setText("");
    onToast("今日の「やった」候補に追加しました");
  };

  const toggle = (item: DoItItem) => {
    setItems(toggleDoIt(item.id));
    if (!item.done) onToast("やった！ 🎉");
  };

  return (
    <section aria-labelledby="doit-title" className="relative overflow-hidden rounded-3xl border-2 border-ink bg-sky/45 px-5 pb-6 pt-6">
      <p className="font-display text-[11px] font-bold tracking-[0.2em] text-ink-soft">WANT TO → DONE</p>
      <h3 id="doit-title" className="mt-1 text-[1.35rem] leading-snug font-black">
        じゃあ今日、
        <br />
        何を「やった」にする？
      </h3>

      <form onSubmit={submit} className="mt-4 flex flex-col gap-2.5">
        <label htmlFor="doit" className="sr-only">
          今日やること
        </label>
        <input
          id="doit"
          type="text"
          value={text}
          maxLength={60}
          onChange={(e) => setText(e.target.value)}
          placeholder={`例：${placeholder}`}
          enterKeyHint="done"
          autoComplete="off"
          disabled={full}
          className="w-full rounded-2xl border-2 border-ink bg-paper px-4 py-3.5 text-[16px] font-bold placeholder:font-medium placeholder:text-ink-soft/70 focus:outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-deep disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={!text.trim() || full}
          className="btn-pop rounded-full border-2 border-ink bg-ink px-6 py-3.5 text-base font-black text-ivory disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:transform-none"
        >
          今日これをやる
        </button>
      </form>

      {items.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-black">今日の「やった」候補</h4>
          <ul className="mt-2.5 flex flex-col gap-2">
            {items.map((item) => (
              <li key={item.id} className="animate-rise flex items-center gap-2 rounded-2xl border-2 border-ink bg-paper py-2 pl-2 pr-2">
                <button
                  type="button"
                  onClick={() => toggle(item)}
                  aria-pressed={item.done}
                  aria-label={item.done ? `「${item.text}」をやったから戻す` : `「${item.text}」をやったにする`}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-ink transition-colors duration-200 ${item.done ? "bg-mint" : "bg-paper hover:bg-butter-soft"}`}
                >
                  <svg viewBox="0 0 24 24" className={`h-4 w-4 transition-opacity ${item.done ? "opacity-100" : "opacity-20"}`} aria-hidden>
                    <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <span className={`min-w-0 flex-1 break-words text-[15px] font-bold ${item.done ? "text-ink-soft line-through decoration-2" : ""}`}>{item.text}</span>
                {item.done && (
                  <span className="animate-pop shrink-0 -rotate-6 rounded-md border-2 border-ink bg-butter px-1.5 py-0.5 text-[11px] font-black">やった！</span>
                )}
                <button
                  type="button"
                  onClick={() => setItems(removeDoIt(item.id))}
                  aria-label={`「${item.text}」を削除`}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-soft hover:bg-ink/5 hover:text-ink"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                    <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs font-medium text-ink-soft">終わったら ✓ をタップ。この端末にだけ保存されます。</p>
        </div>
      )}
    </section>
  );
}
