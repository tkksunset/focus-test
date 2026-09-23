"use client";

/** 画面下に一瞬だけ出る小さなお知らせ */
export default function Toast({ message }: { message: string | null }) {
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-4">
      {message && (
        <div className="animate-rise rounded-full border-2 border-ink bg-ink px-5 py-2.5 text-sm font-bold text-ivory shadow-lg">
          {message}
        </div>
      )}
    </div>
  );
}
