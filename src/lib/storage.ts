/**
 * LocalStorage まわり。
 * すべて try/catch で囲み、使えない環境（プライベートモード等）でも落ちないようにしています。
 */
export type ScoreRecord = {
  score: number;
  /** ISO 8601 */
  takenAt: string;
};

export type DoItItem = {
  id: string;
  text: string;
  /** ローカル日付 YYYY-MM-DD（「今日の」判定用） */
  date: string;
  createdAt: string;
  done: boolean;
};

const KEYS = {
  history: "focus-test:history:v1",
  doits: "focus-test:doits:v1",
} as const;

const MAX_HISTORY = 30;

function read<T>(key: string, fallback: T): T {
  try {
    if (typeof window === "undefined") return fallback;
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* 保存できない環境では何もしない */
  }
}

function isScoreRecord(x: unknown): x is ScoreRecord {
  return (
    typeof x === "object" &&
    x !== null &&
    typeof (x as ScoreRecord).score === "number" &&
    typeof (x as ScoreRecord).takenAt === "string"
  );
}

/* ---------- 履歴 ---------- */

/** 古い順に並んだ履歴 */
export function loadHistory(): ScoreRecord[] {
  const list = read<unknown>(KEYS.history, []);
  return Array.isArray(list) ? list.filter(isScoreRecord) : [];
}

/** 追加して、追加後の履歴を返す */
export function addHistory(score: number, date = new Date()): ScoreRecord[] {
  const next = [...loadHistory(), { score, takenAt: date.toISOString() }].slice(-MAX_HISTORY);
  write(KEYS.history, next);
  return next;
}

/* ---------- 今日の「やった」候補 ---------- */

export function localDateKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** 今日の分だけ返す（前日以前のものは保存時に自然に消える） */
export function loadTodayDoIts(): DoItItem[] {
  const today = localDateKey();
  const list = read<DoItItem[]>(KEYS.doits, []);
  return Array.isArray(list) ? list.filter((i) => i && i.date === today) : [];
}

function saveDoIts(list: DoItItem[]) {
  write(KEYS.doits, list);
}

export function addDoIt(text: string): DoItItem[] {
  const now = new Date();
  const item: DoItItem = {
    id: `${now.getTime()}-${Math.random().toString(36).slice(2, 7)}`,
    text: text.trim().slice(0, 60),
    date: localDateKey(now),
    createdAt: now.toISOString(),
    done: false,
  };
  const next = [...loadTodayDoIts(), item];
  saveDoIts(next);
  return next;
}

export function toggleDoIt(id: string): DoItItem[] {
  const next = loadTodayDoIts().map((i) => (i.id === id ? { ...i, done: !i.done } : i));
  saveDoIts(next);
  return next;
}

export function removeDoIt(id: string): DoItItem[] {
  const next = loadTodayDoIts().filter((i) => i.id !== id);
  saveDoIts(next);
  return next;
}
