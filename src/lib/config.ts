/**
 * サイト全体の設定値。
 * Instagram の URL やサイト URL など、後から変わりうる値はここにまとめています。
 */
/** ブランドコンセプト（TOP・タイトル・シェア文に使われます） */
export const BRAND = {
  concept: "「やりたい」を、「やった」に。",
} as const;

export const SITE = {
  name: "集中力テスト",
  byline: "by TKK SUNSET",
  title: `集中力テスト｜${BRAND.concept} by TKK SUNSET`,
  description:
    "10個の質問で、今の集中状態をチェック。あなたの集中力は -100〜+100でいくつ？",
  /**
   * 本番URL。Vercel の環境変数 NEXT_PUBLIC_SITE_URL で上書きできます。
   * 未設定の場合は Vercel が自動で渡す本番ドメインを使います。
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  /** OGP 画像。public/og.png を差し替えるだけで変更できます（推奨 1200×630）。 */
  ogImage: "/og.png",
} as const;

export const INSTAGRAM = {
  handle: "@tkk_sunset_life",
  url: "https://www.instagram.com/tkk_sunset_life/",
} as const;
