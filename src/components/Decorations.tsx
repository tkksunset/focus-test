/** 背景に浮かぶ小さな図形。装飾のみなので aria-hidden */
type Props = { variant?: "start" | "quiet" };

export default function Decorations({ variant = "quiet" }: Props) {
  const loud = variant === "start";
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* ライトブルーの丸 */}
      <div
        className={`absolute rounded-full bg-sky transition-all duration-700 ${
          loud ? "-right-16 -top-16 h-56 w-56 sm:h-80 sm:w-80" : "-right-24 -top-24 h-44 w-44 opacity-70"
        }`}
      />
      {/* 淡いイエローの花 */}
      <svg
        viewBox="0 0 100 100"
        className={`absolute animate-spin-slow transition-all duration-700 ${
          loud ? "-left-10 bottom-24 h-36 w-36 sm:h-48 sm:w-48" : "-left-14 bottom-10 h-28 w-28 opacity-70"
        }`}
      >
        <path
          fill="var(--color-butter)"
          d="M50 4c6 0 10 9 14 12s14 1 18 5-1 13 1 18 11 5 11 11-9 7-11 12 3 13-1 17-13 2-18 4-8 13-14 13-9-10-14-13-14-1-18-5 1-13-1-18S2 56 2 50s9-7 11-12-3-13 1-17 13-2 18-4 12-13 18-13z"
        />
      </svg>
      {loud && (
        <>
          {/* 淡いオレンジのアーチ */}
          <svg viewBox="0 0 100 60" className="absolute right-6 bottom-40 hidden h-14 w-24 animate-float-slow min-[375px]:block sm:right-[12%]">
            <path d="M5 55a45 45 0 0 1 90 0" fill="none" stroke="var(--color-peach)" strokeWidth="12" strokeLinecap="round" />
          </svg>
          {/* キラッ */}
          <svg viewBox="0 0 24 24" className="absolute left-[12%] top-[16%] h-6 w-6 animate-float text-ink">
            <path fill="currentColor" d="M12 0c.8 6.4 5.6 11.2 12 12-6.4.8-11.2 5.6-12 12-.8-6.4-5.6-11.2-12-12C6.4 11.2 11.2 6.4 12 0z" />
          </svg>
          {/* くねくね */}
          <svg viewBox="0 0 80 20" className="absolute right-[18%] top-[20%] hidden h-4 w-16 opacity-80 sm:block">
            <path d="M2 10c6-8 12-8 18 0s12 8 18 0 12-8 18 0 12 8 18 0" fill="none" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </>
      )}
    </div>
  );
}
