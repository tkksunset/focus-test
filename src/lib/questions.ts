/**
 * 質問データ。
 * - text: 質問文（\n で改行位置を指定できます）
 * - polarity: "positive" = 当てはまるほど集中できている / "negative" = 当てはまるほど集中が散りやすい
 * 質問を差し替える・並べ替える場合は、この配列だけを編集してください。
 * （問題数を変えてもスコア計算は自動で追従します）
 */
export type Polarity = "positive" | "negative";

export type Question = {
  id: number;
  text: string;
  polarity: Polarity;
};

export const QUESTIONS: Question[] = [
  { id: 1, text: "やるべきことを始めたら、\nしばらくその作業に集中できる。", polarity: "positive" },
  { id: 2, text: "作業中に、\n無意識にスマホを確認してしまう。", polarity: "negative" },
  { id: 3, text: "一つのことをしている途中で、\n別のことが気になってしまう。", polarity: "negative" },
  { id: 4, text: "今日やると決めたことを、\n実際に終わらせられることが多い。", polarity: "positive" },
  { id: 5, text: "通知や周囲の音があると、\nすぐ集中が切れてしまう。", polarity: "negative" },
  { id: 6, text: "本や長い文章を、\n途中で別のことをせず読み続けられる。", polarity: "positive" },
  { id: 7, text: "何も刺激がない時間に耐えられず、\nスマホなどを触りたくなる。", polarity: "negative" },
  { id: 8, text: "仕事や勉強をしていて、\n気づいたら時間が経っていたということがある。", polarity: "positive" },
  { id: 9, text: "「あとでやろう」と思って、\nやりたいことを先延ばしにすることが多い。", polarity: "negative" },
  { id: 10, text: "最近、自分の時間を\n自分でコントロールできている感覚がある。", polarity: "positive" },
];

/** 回答の選択肢（value は内部値 1〜5） */
export type AnswerValue = 1 | 2 | 3 | 4 | 5;

export const ANSWER_OPTIONS: { value: AnswerValue; label: string }[] = [
  { value: 1, label: "まったく当てはまらない" },
  { value: 2, label: "あまり当てはまらない" },
  { value: 3, label: "どちらともいえない" },
  { value: 4, label: "まあまあ当てはまる" },
  { value: 5, label: "とても当てはまる" },
];
