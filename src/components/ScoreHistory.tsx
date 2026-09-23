import ScoreChart from "./ScoreChart";
import ScoreText from "./ScoreText";
import type { ScoreRecord } from "@/lib/storage";

const SHOW = 5;

function md(iso: string) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

/** 直近5回の推移（ミニグラフ＋日付とスコア） */
export default function ScoreHistory({ history }: { history: ScoreRecord[] }) {
  const recent = history.slice(-SHOW);
  return (
    <section aria-labelledby="history-title" className="rounded-3xl border-2 border-ink bg-paper px-5 py-5">
      <div className="flex items-baseline justify-between">
        <h3 id="history-title" className="text-base font-black">
          集中力のきろく
        </h3>
        <span className="text-xs font-bold text-ink-soft">直近{recent.length}回</span>
      </div>

      {recent.length >= 2 ? (
        <>
          <ScoreChart records={recent} />
          <ol className="grid" style={{ gridTemplateColumns: `repeat(${recent.length}, minmax(0, 1fr))` }}>
            {recent.map((r, i) => {
              const last = i === recent.length - 1;
              return (
                <li key={r.takenAt} className="text-center">
                  <span className="block text-[11px] font-bold text-ink-soft">{md(r.takenAt)}</span>
                  <span className={`block text-[15px] font-extrabold ${last ? "" : "text-ink-soft"}`}>
                    <ScoreText value={r.score} />
                  </span>
                </li>
              );
            })}
          </ol>
        </>
      ) : (
        <p className="mt-3 text-sm leading-relaxed font-medium text-ink-soft">
          次に測ると、ここに変化のグラフが出ます。
          <br />
          1週間後くらいに、また測ってみてね。
        </p>
      )}
    </section>
  );
}
