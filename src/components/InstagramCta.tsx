import { INSTAGRAM } from "@/lib/config";

export default function InstagramCta() {
  return (
    <section className="text-center">
      <p className="text-[15px] font-bold">僕も集中力を取り戻す実験中です。</p>
      <a
        href={INSTAGRAM.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Instagram ${INSTAGRAM.handle} を開く（新しいタブ）`}
        className="btn-pop mt-3 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper px-5 py-2.5 text-base font-black"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="5.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="17.3" cy="6.7" r="1.3" fill="currentColor" />
        </svg>
        <span className="font-display tracking-tight">{INSTAGRAM.handle}</span>
      </a>
    </section>
  );
}
