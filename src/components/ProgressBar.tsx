type Props = { current: number; total: number };

/** current は 1 始まり */
export default function ProgressBar({ current, total }: Props) {
  const pct = Math.round((current / total) * 100);
  return (
    <div
      role="progressbar"
      aria-label="回答の進み具合"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={current}
      aria-valuetext={`${total}問中${current}問目`}
      className="h-3 w-full overflow-hidden rounded-full border-2 border-ink bg-paper"
    >
      <div
        className="h-full rounded-full bg-sky transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
