import { SITE } from "./config";
import { formatScore } from "./scoring";

/** シェア用URL（?score= で結果カードを表示できる） */
export function buildShareUrl(score: number, origin?: string): string {
  const base = origin ?? (typeof window !== "undefined" ? window.location.origin : SITE.url);
  return `${base}/?score=${encodeURIComponent(formatScore(score))}`;
}

export function buildShareText(score: number): string {
  return `私の集中力は ${formatScore(score)} でした。\n\n${SITE.name}\n${SITE.byline}\n\nあなたも測ってみる？`;
}

/** クリップボードへコピー。Instagram のアプリ内ブラウザなど API が使えない環境向けのフォールバック付き */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* フォールバックへ */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}
