export default function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <p className={`text-center text-[11px] leading-relaxed text-ink-soft ${className}`}>
      ※医学的・心理学的な診断ではありません。
      <br />
      現在の状態を振り返るためのセルフチェックです。
    </p>
  );
}
