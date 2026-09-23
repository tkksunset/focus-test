import { scoreColor } from "@/lib/color";
import type { ScoreRecord } from "@/lib/storage";

const W = 300;
const H = 110;
const PAD_Y = 14;

/** ライブラリなしのミニ折れ線グラフ。点の位置は下の一覧の列中央にそろえる */
export default function ScoreChart({ records }: { records: ScoreRecord[] }) {
  const n = records.length;
  const x = (i: number) => ((i + 0.5) / n) * W;
  const y = (s: number) => PAD_Y + ((100 - s) / 200) * (H - PAD_Y * 2);
  const points = records.map((r, i) => `${x(i)},${y(r.score)}`).join(" ");
  const first = records[0].score;
  const last = records[n - 1].score;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="mt-3 h-auto w-full overflow-visible"
      role="img"
      aria-label={`直近${n}回の集中力の推移。${first}から${last}へ`}
    >
      {/* 0 ライン */}
      <line x1="0" x2={W} y1={y(0)} y2={y(0)} stroke="var(--color-ink)" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="4 5" />
      <text x="2" y={y(0) - 5} fontSize="10" fontWeight="700" fill="var(--color-ink-soft)">
        0
      </text>
      <polyline points={points} fill="none" stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {records.map((r, i) => {
        const last = i === n - 1;
        return (
          <circle
            key={r.takenAt}
            cx={x(i)}
            cy={y(r.score)}
            r={last ? 8 : 5.5}
            fill={scoreColor(r.score)}
            stroke="var(--color-ink)"
            strokeWidth="2"
          />
        );
      })}
    </svg>
  );
}
