import { formatScore } from "@/lib/scoring";

/**
 * スコア表示。符号を少し小さく・細くして数字を主役にする。
 * 読み上げ用には aria-label で「マイナス75」などを渡せる。
 */
export default function ScoreText({ value, className = "", smallSign = false }: { value: number; className?: string; smallSign?: boolean }) {
  const text = formatScore(value);
  const sign = text[0] === "+" || text[0] === "-" ? text[0] : "";
  const digits = sign ? text.slice(1) : text;
  return (
    <span className={`num inline-flex items-baseline ${className}`}>
      {sign && <span className={smallSign ? "mr-[0.04em] text-[0.62em] font-semibold" : "mr-[0.03em]"}>{sign === "-" ? "−" : "+"}</span>}
      <span>{digits}</span>
    </span>
  );
}
