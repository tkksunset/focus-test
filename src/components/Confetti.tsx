"use client";

import { useEffect, useState } from "react";

const COLORS = ["var(--color-sky)", "var(--color-butter)", "var(--color-peach)", "var(--color-mint)"];

type Piece = { left: number; delay: number; dur: number; size: number; color: string; shape: "circle" | "square" | "star"; drift: number; rot: number };

/** 決まった乱数で配置を作る（毎回同じ気持ちよさにするため） */
function makePieces(n: number): Piece[] {
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  return Array.from({ length: n }, (_, i) => ({
    left: rnd() * 100,
    delay: rnd() * 350,
    dur: 1300 + rnd() * 700,
    size: 7 + rnd() * 8,
    color: COLORS[i % COLORS.length],
    shape: (["circle", "square", "star"] as const)[i % 3],
    drift: (rnd() - 0.5) * 120,
    rot: (rnd() - 0.5) * 540,
  }));
}

const PIECES = makePieces(34);

/** +100 のときだけ出る、控えめな紙吹雪（約2秒で消える） */
export default function Confetti() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = window.setTimeout(() => setVisible(false), 2400);
    return () => window.clearTimeout(t);
  }, []);
  if (!visible) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden motion-reduce:hidden">
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translate3d(0,-10vh,0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translate3d(var(--drift), 70vh, 0) rotate(var(--rot)); opacity: 0; }
        }
      `}</style>
      {PIECES.map((p, i) => (
        <span
          key={i}
          className="absolute top-0"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              "--drift": `${p.drift}px`,
              "--rot": `${p.rot}deg`,
              animation: `confetti-fall ${p.dur}ms cubic-bezier(0.2,0.6,0.4,1) ${p.delay}ms both`,
            } as React.CSSProperties
          }
        >
          {p.shape === "star" ? (
            <svg viewBox="0 0 24 24" width="100%" height="100%">
              <path fill={p.color} stroke="var(--color-ink)" strokeWidth="1.5" d="M12 1c.8 6 4.9 10.2 11 11-6.1.8-10.2 5-11 11-.8-6-4.9-10.2-11-11 6.1-.8 10.2-5 11-11z" />
            </svg>
          ) : (
            <span
              className={`block h-full w-full border-[1.5px] border-ink ${p.shape === "circle" ? "rounded-full" : "rounded-[2px]"}`}
              style={{ background: p.color }}
            />
          )}
        </span>
      ))}
    </div>
  );
}
