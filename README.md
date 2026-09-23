# 集中力テスト by TKK SUNSET

10個の質問で今の集中状態を -100〜+100 のスコアで確認できる、Instagram 連動のセルフチェックサイト（MVP）。
Next.js (App Router) + TypeScript + Tailwind CSS v4。バックエンドなし・データは LocalStorage のみ。

## ローカルで起動

```bash
npm install
npm run dev        # http://localhost:3000
```

本番ビルドの確認：`npm run build && npm start`

## Vercel へデプロイ

1. このフォルダを GitHub リポジトリに push
2. https://vercel.com/new でリポジトリを Import（Framework は自動で Next.js）
3. Deploy を押す
4. （任意）独自ドメインを使う場合は、Project Settings → Environment Variables に
   `NEXT_PUBLIC_SITE_URL=https://あなたのドメイン` を追加して再デプロイ（OGP の絶対 URL に使われます）

CLI の場合：`npx vercel` → `npx vercel --prod`

## 後から変更する場所

| 変更したいもの | ファイル |
| --- | --- |
| Instagram URL / ハンドル名 | `src/lib/config.ts` の `INSTAGRAM` |
| サイト名・説明文（title / description / OGP） | `src/lib/config.ts` の `SITE` |
| OGP 画像 | `public/og.png` を差し替え（1200×630 推奨） |
| 質問文・positive / negative | `src/lib/questions.ts` の `QUESTIONS` |
| 回答の選択肢 | `src/lib/questions.ts` の `ANSWER_OPTIONS` |
| 評価タイトル・メッセージ・スコア範囲 | `src/lib/ranks.ts` の `RANKS` |
| スコア計算式 | `src/lib/scoring.ts` |
| シェア文言 | `src/lib/share.ts` の `buildShareText` |
| 色・フォント・アニメーション | `src/app/globals.css` の `@theme` |
| ファビコン | `src/app/icon.svg` / `src/app/apple-icon.png` |

## ディレクトリ構成

```
src/
  app/
    layout.tsx          メタデータ・OGP・フォント読み込み
    page.tsx            FocusTestApp を表示するだけ
    globals.css         デザイントークン（色・フォント・アニメーション）
  components/
    FocusTestApp.tsx    画面遷移と回答状態（TOP → 質問 → 結果 / 共有結果）
    StartScreen.tsx     TOP
    QuestionScreen.tsx  質問（ProgressBar / AnswerButton）
    ResultScreen.tsx    結果ページ全体
    ResultCard.tsx      スコア・ゲージ・評価のカード
    ScoreGauge.tsx      -100〜+100 ゲージ（キャラクター Dot が移動）
    ScoreChange.tsx     前回との比較
    ScoreHistory.tsx    直近5回の履歴 + ScoreChart（SVG ミニグラフ）
    ShareButton.tsx     Web Share API / コピー
    DoItInput.tsx       「今日何を『やった』にする？」
    InstagramCta.tsx / Disclaimer.tsx / Confetti.tsx / Toast.tsx / Decorations.tsx / Dot.tsx
    SharedResultScreen.tsx  ?score=-75 で開いたときの結果カード
  hooks/                useCountUp / useReducedMotion
  lib/                  config / questions / scoring / ranks / storage / share / color
```

## LocalStorage のキー

- `focus-test:history:v1` … `[{ score, takenAt }]`（最大30件、表示は直近5件）
- `focus-test:doits:v1` … 今日の「やった」候補（日付が変わると表示されなくなります）

## 補足

- `?score=-75` のような URL で開くと、そのスコアの結果カードと「自分も測ってみる」ボタンを表示します（シェア URL に自動で付与）。
- Instagram のアプリ内ブラウザなど Web Share API が使えない環境では「結果をコピー」ボタンに切り替わります。
- 将来テストを増やす場合は、`FocusTestApp.tsx` の `Screen` に画面を追加し、スコア計算は `lib/` に関数を追加する想定です。
- このテストは医学的・心理学的診断を目的としたものではありません。
