"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Decorations from "./Decorations";
import QuestionScreen from "./QuestionScreen";
import ResultScreen from "./ResultScreen";
import SharedResultScreen from "./SharedResultScreen";
import StartScreen from "./StartScreen";
import Toast from "./Toast";
import { QUESTIONS, type AnswerValue } from "@/lib/questions";
import { calcFocusScore, parseScore } from "@/lib/scoring";
import { addHistory, loadHistory, type ScoreRecord } from "@/lib/storage";

type Screen =
  | { name: "start" }
  | { name: "question"; index: number; direction: "forward" | "back" }
  | { name: "result"; score: number; previous: number | null; history: ScoreRecord[]; takenAt: string }
  | { name: "shared"; score: number };

const ADVANCE_DELAY_MS = 320;

/**
 * 画面遷移と回答状態を持つ、アプリ本体（TOP → 質問 → 結果 の1ページ完結）
 * 将来テストの種類が増えたら、ここに画面を足していく想定です。
 */
export default function FocusTestApp() {
  const [screen, setScreen] = useState<Screen>({ name: "start" });
  const [answers, setAnswers] = useState<(AnswerValue | null)[]>(() => QUESTIONS.map(() => null));
  const [locked, setLocked] = useState(false);
  const [lastRecord, setLastRecord] = useState<ScoreRecord | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const toastTimer = useRef<number | undefined>(undefined);

  // 初回：共有URL（?score=）と前回スコアを読み込む。LocalStorage はブラウザでしか読めないためここで行う
  useEffect(() => {
    const shared = parseScore(new URLSearchParams(window.location.search).get("score"));
    const history = loadHistory();
    /* eslint-disable react-hooks/set-state-in-effect -- 外部ストレージ／URLとの同期のため */
    if (shared !== null) setScreen({ name: "shared", score: shared });
    setLastRecord(history.at(-1) ?? null);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => () => {
    window.clearTimeout(timer.current);
    window.clearTimeout(toastTimer.current);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });

  const showToast = useCallback((msg: string) => {
    window.clearTimeout(toastTimer.current);
    setToast(msg);
    toastTimer.current = window.setTimeout(() => setToast(null), 2200);
  }, []);

  const start = useCallback(() => {
    window.clearTimeout(timer.current);
    setAnswers(QUESTIONS.map(() => null));
    setLocked(false);
    // 共有URLから来た場合は、URLをきれいにしておく
    if (window.location.search) window.history.replaceState(null, "", window.location.pathname);
    setScreen({ name: "question", index: 0, direction: "forward" });
    scrollTop();
  }, []);

  const finish = useCallback((final: AnswerValue[]) => {
    const score = calcFocusScore(final, QUESTIONS);
    const before = loadHistory();
    const previous = before.at(-1)?.score ?? null;
    const now = new Date();
    const history = addHistory(score, now);
    setLastRecord(history.at(-1) ?? null);
    setScreen({ name: "result", score, previous, history, takenAt: now.toISOString() });
    scrollTop();
  }, []);

  const answer = useCallback(
    (value: AnswerValue) => {
      if (screen.name !== "question" || locked) return;
      const i = screen.index;
      const next = [...answers];
      next[i] = value;
      setAnswers(next);
      setLocked(true);
      timer.current = window.setTimeout(() => {
        setLocked(false);
        if (i + 1 < QUESTIONS.length) {
          setScreen({ name: "question", index: i + 1, direction: "forward" });
        } else {
          finish(next as AnswerValue[]);
        }
      }, ADVANCE_DELAY_MS);
    },
    [screen, locked, answers, finish],
  );

  const back = useCallback(() => {
    if (screen.name !== "question") return;
    window.clearTimeout(timer.current);
    setLocked(false);
    if (screen.index === 0) setScreen({ name: "start" });
    else setScreen({ name: "question", index: screen.index - 1, direction: "back" });
  }, [screen]);

  return (
    <>
      <Decorations variant={screen.name === "start" ? "start" : "quiet"} />

      {screen.name === "start" && <StartScreen onStart={start} lastRecord={lastRecord} />}

      {screen.name === "question" && (
        <QuestionScreen
          question={QUESTIONS[screen.index]}
          index={screen.index}
          total={QUESTIONS.length}
          selected={answers[screen.index]}
          locked={locked}
          direction={screen.direction}
          onAnswer={answer}
          onBack={back}
        />
      )}

      {screen.name === "result" && (
        <ResultScreen
          key={screen.takenAt}
          score={screen.score}
          previous={screen.previous}
          history={screen.history}
          takenAt={screen.takenAt}
          onRetake={start}
          onToast={showToast}
        />
      )}

      {screen.name === "shared" && <SharedResultScreen score={screen.score} onStart={start} />}

      <Toast message={toast} />
    </>
  );
}
