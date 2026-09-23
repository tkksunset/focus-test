import ScoreText from "./ScoreText";

type Props = { previous: number; current: number };

/** 前回との比較。下がっても責めない、ニュートラルな表現にする */
export default function ScoreChange({ previous, current }: Props) {
  const diff = current - previous;
  const note = diff > 0 ? "ちゃんと動いてる。" : diff === 0 ? "キープ中。" : "波があるのも、自然なこと。";
  return (
    <section aria-label="前回との比較" className="rounded-3xl border-2 border-ink bg-paper px-5 py-5">
      <dl className="grid grid-cols-3 items-end text-center">
        <div>
          <dt className="text-xs font-bold text-ink-soft">前回</dt>
          <dd className="mt-1 text-2xl font-extrabold text-ink-soft">
            <ScoreText value={previous} />
          </dd>
        </div>
        <div>
          <dt className="text-xs font-bold text-ink-soft">今回</dt>
          <dd className="mt-1 text-2xl font-extrabold">
            <ScoreText value={current} />
          </dd>
        </div>
        <div>
          <dt className="text-xs font-bold text-ink-soft">変化</dt>
          <dd className="mt-1">
            <span className={`inline-block rounded-full border-2 border-ink px-3 py-0.5 text-xl font-extrabold ${diff > 0 ? "bg-mint" : diff < 0 ? "bg-butter-soft" : "bg-paper"}`}>
              <ScoreText value={diff} />
            </span>
          </dd>
        </div>
      </dl>
      <p className="mt-3 text-center text-sm font-bold text-ink-soft">{note}</p>
    </section>
  );
}
