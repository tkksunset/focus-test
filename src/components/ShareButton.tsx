"use client";

import { useSyncExternalStore } from "react";
import { buildShareText, buildShareUrl, copyText } from "@/lib/share";

const noop = () => () => {};

/** Web Share API が使える端末かどうか（SSR 時は false） */
function useCanShare() {
  return useSyncExternalStore(
    noop,
    () => typeof navigator !== "undefined" && typeof navigator.share === "function",
    () => false,
  );
}

type Props = { score: number; onToast: (msg: string) => void };

export default function ShareButton({ score, onToast }: Props) {
  const canShare = useCanShare();

  const handleCopy = async () => {
    const ok = await copyText(`${buildShareText(score)}\n${buildShareUrl(score)}`);
    onToast(ok ? "コピーしました！" : "コピーできませんでした…");
  };

  const handleShare = async () => {
    if (!canShare) return handleCopy();
    try {
      await navigator.share({ title: "集中力テスト", text: buildShareText(score), url: buildShareUrl(score) });
    } catch (e) {
      // ユーザーが共有シートを閉じただけなら何もしない
      if (e instanceof DOMException && e.name === "AbortError") return;
      await handleCopy();
    }
  };

  return (
    <div className="flex flex-col items-stretch gap-2">
      <button
        type="button"
        onClick={handleShare}
        className="btn-pop inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-ink bg-butter px-6 py-4 text-lg font-black"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          {canShare ? (
            <path d="M12 15V3m0 0L7.5 7.5M12 3l4.5 4.5M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <path d="M9 9V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4M5 9h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          )}
        </svg>
        {canShare ? "結果をシェアする" : "結果をコピー"}
      </button>
      {canShare && (
        <button type="button" onClick={handleCopy} className="mx-auto rounded-full px-3 py-1.5 text-xs font-bold text-ink-soft underline decoration-2 underline-offset-4 hover:text-ink">
          テキストをコピーする
        </button>
      )}
    </div>
  );
}
