/**
 * スコアに応じたアクセントカラー。
 * マイナス = やわらかいピーチ → 0 = サンド → プラス = ミント → スカイ。
 * 「赤＝ダメ」にならないよう、彩度を抑えたトーンだけで構成しています。
 */
type RGB = [number, number, number];

const STOPS: { at: number; color: RGB }[] = [
  { at: -100, color: [255, 176, 140] }, // peach
  { at: -40, color: [255, 208, 140] }, // apricot
  { at: 0, color: [247, 228, 170] }, // butter-sand
  { at: 50, color: [170, 224, 196] }, // mint
  { at: 100, color: [150, 208, 245] }, // sky
];

function hex([r, g, b]: RGB) {
  return `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`;
}

export function scoreColor(score: number): string {
  const s = Math.min(100, Math.max(-100, score));
  for (let i = 0; i < STOPS.length - 1; i++) {
    const a = STOPS[i];
    const b = STOPS[i + 1];
    if (s >= a.at && s <= b.at) {
      const t = (s - a.at) / (b.at - a.at);
      return hex(a.color.map((c, k) => c + (b.color[k] - c) * t) as RGB);
    }
  }
  return hex(STOPS[STOPS.length - 1].color);
}
