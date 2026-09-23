"use client";

import { useEffect, useState } from "react";
import Dot from "./Dot";
import { scoreColor } from "@/lib/color";
import { formatScore } from "@/lib/scoring";

type Props = { score: number; animate: boolean };

/** -100 ─ 0 ─ +100 のゲージ。ドットが左端から自分の位置まで移動する */
export default function ScoreGauge({ score, animate }: Props) {
  const target = ((score + 100) / 200) * 100;
  const [pos, setPos] = useState(animate ? 0 : target);
  const [arrived, setArrived] = useState(!animate);

  useEffect(() => {
    if (!animate) return;
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setPos(target)));
    const t = window.setTimeout(() => setArrived(true), 1300);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, [animate, target]);

  const track = `linear-gradient(90deg, ${scoreColor(-100)} 0%, ${scoreColor(-40)} 30%, ${scoreColor(0)} 50%, ${scoreColor(50)} 75%, ${scoreColor(100)} 100%)`;
  const shownPos = animate ? pos : target;

  return (
    <figure className="w-full" aria-label={`-100から+100のゲージ上で、${formatScore(score)}の位置`}>
      <div className="relative px-5 pt-11">
        <div className="relative">
          <div className="h-4 w-full rounded-full border-2 border-ink" style={{ background: track }} />
          {/* 0 の目印 */}
          <span className="absolute left-1/2 top-1/2 h-7 w-[2px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" aria-hidden />
          {/* ドット */}
          <div
            className="absolute bottom-[calc(100%-6px)] -translate-x-1/2 transition-[left] duration-[1200ms] ease-[cubic-bezier(0.34,1.2,0.5,1)]"
            style={{ left: `${shownPos}%` }}
            aria-hidden
          >
            <Dot size={38} color={scoreColor(score)} look={arrived ? 0 : 1} className={arrived ? "animate-pop" : ""} />
          </div>
        </div>
      </div>
      <div className="num mt-2 flex justify-between px-1 text-xs font-bold text-ink-soft" aria-hidden>
        <span>−100</span>
        <span>0</span>
        <span>+100</span>
      </div>
    </figure>
  );
}
