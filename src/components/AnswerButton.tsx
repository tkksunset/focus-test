type Props = {
  label: string;
  index: number;
  selected: boolean;
  disabled: boolean;
  onSelect: () => void;
};

/** 5段階のうち、どれだけ「当てはまる」かを小さなドットの数で示す */
function Pips({ n, active }: { n: number; active: boolean }) {
  return (
    <span className="flex shrink-0 gap-[3px] min-[375px]:gap-1" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full border-[1.5px] border-ink transition-colors duration-200 ${
            i < n ? (active ? "bg-ink" : "bg-ink/70") : "bg-transparent"
          }`}
        />
      ))}
    </span>
  );
}

export default function AnswerButton({ label, index, selected, disabled, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled && !selected}
      aria-pressed={selected}
      className={`flex min-h-[3.25rem] w-full items-center justify-between gap-2 rounded-2xl border-2 border-ink px-4 py-2.5 text-left text-[15px] min-[375px]:min-h-[3.5rem] min-[375px]:gap-3 min-[375px]:px-5 min-[375px]:py-3 min-[375px]:text-[16px] font-bold transition-[background-color,transform,box-shadow,opacity] duration-200 ${
        selected
          ? "animate-pop bg-butter shadow-[0_1px_0_0_var(--color-ink)] translate-y-[2px]"
          : "bg-paper shadow-[0_3px_0_0_var(--color-ink)] hover:bg-butter-soft active:translate-y-[3px] active:shadow-none"
      } disabled:opacity-60`}
    >
      <span>{label}</span>
      <Pips n={index + 1} active={selected} />
    </button>
  );
}
