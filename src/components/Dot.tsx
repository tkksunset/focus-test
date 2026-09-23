/** ゲージの上を動く、小さなキャラクター「ドット」 */
type Props = {
  size?: number;
  color?: string;
  className?: string;
  /** 目線の向き（-1 左 / 0 正面 / 1 右） */
  look?: -1 | 0 | 1;
};

export default function Dot({ size = 40, color = "var(--color-butter)", className = "", look = 0 }: Props) {
  const dx = look * 3;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden>
      <circle cx="20" cy="20" r="17" fill={color} stroke="var(--color-ink)" strokeWidth="2.5" />
      <ellipse cx={14.5 + dx} cy="18" rx="2.2" ry="3" fill="var(--color-ink)" />
      <ellipse cx={25.5 + dx} cy="18" rx="2.2" ry="3" fill="var(--color-ink)" />
      <path d={`M${16 + dx} 25.5q${4} 3 ${8} 0`} fill="none" stroke="var(--color-ink)" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="10" cy="24" r="2.2" fill="#ff9f8a" opacity="0.55" />
      <circle cx="30" cy="24" r="2.2" fill="#ff9f8a" opacity="0.55" />
    </svg>
  );
}
