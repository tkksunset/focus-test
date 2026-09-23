import type { AnswerValue, Question } from "./questions";

export const MIN_SCORE = -100;
export const MAX_SCORE = 100;
const POINTS_PER_QUESTION = 4;

/** 1問あたりの点数（0〜4）。negative は逆転させる。 */
export function pointsFor(value: AnswerValue, polarity: Question["polarity"]): number {
  return polarity === "positive" ? value - 1 : 5 - value;
}

/** rawScore（10問なら 0〜40） */
export function calcRawScore(answers: AnswerValue[], questions: Question[]): number {
  return questions.reduce((sum, q, i) => sum + pointsFor(answers[i], q.polarity), 0);
}

/** rawScore を -100〜+100 に変換（四捨五入） */
export function toFocusScore(raw: number, questionCount: number): number {
  const max = questionCount * POINTS_PER_QUESTION;
  const score = Math.round((raw / max) * 200 - 100);
  return clampScore(score);
}

export function calcFocusScore(answers: AnswerValue[], questions: Question[]): number {
  return toFocusScore(calcRawScore(answers, questions), questions.length);
}

export function clampScore(n: number): number {
  return Math.min(MAX_SCORE, Math.max(MIN_SCORE, n));
}

/** プラスには必ず「+」を付ける。0 はそのまま。マイナスは数学記号の − ではなく半角 - */
export function formatScore(n: number): string {
  return n > 0 ? `+${n}` : `${n}`;
}

/** URL パラメータ等から受け取った値を安全にスコアへ変換。不正なら null */
export function parseScore(input: string | null | undefined): number | null {
  if (input == null || !/^[+-]?\d{1,3}$/.test(input.trim())) return null;
  const n = Number(input.trim());
  if (!Number.isInteger(n) || n < MIN_SCORE || n > MAX_SCORE) return null;
  return n;
}
