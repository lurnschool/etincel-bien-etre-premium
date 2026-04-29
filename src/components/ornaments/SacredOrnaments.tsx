/**
 * Ornements SVG inspirés de l'univers de Céline :
 * féminin sacré, énergie d'Isis, chamanisme doux, cacao, lune, tambour.
 * À utiliser en arrière-plan transparent ou en accent décoratif.
 */

type IconProps = {
  size?: number;
  className?: string;
  strokeWidth?: number;
};

export function AnkhSymbol({ size = 64, className, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 32 44"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <ellipse cx="16" cy="11" rx="9" ry="10" />
      <line x1="16" y1="21" x2="16" y2="42" />
      <line x1="6" y1="25" x2="26" y2="25" />
    </svg>
  );
}

export function LotusOrnament({ size = 80, className, strokeWidth = 1 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M40 65 C 40 45 25 30 15 25 C 18 40 28 55 40 65 Z" />
      <path d="M40 65 C 40 45 55 30 65 25 C 62 40 52 55 40 65 Z" />
      <path d="M40 65 C 32 50 30 30 32 15 C 38 28 40 50 40 65 Z" />
      <path d="M40 65 C 48 50 50 30 48 15 C 42 28 40 50 40 65 Z" />
      <path d="M40 65 C 40 55 40 45 40 35" />
      <circle cx="40" cy="65" r="2" fill="currentColor" />
    </svg>
  );
}

export function MoonPhases({ size = 100, className, strokeWidth = 1 }: IconProps) {
  return (
    <svg
      width={size}
      height={size / 4}
      viewBox="0 0 200 50"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden
    >
      <circle cx="20" cy="25" r="14" fill="none" />
      <path d="M55 11 A 14 14 0 0 0 55 39 A 8 14 0 0 1 55 11 Z" fill="currentColor" />
      <circle cx="100" cy="25" r="14" fill="currentColor" />
      <path d="M145 11 A 14 14 0 0 1 145 39 A 8 14 0 0 0 145 11 Z" fill="currentColor" />
      <circle cx="180" cy="25" r="14" fill="none" />
    </svg>
  );
}

export function ShamanicDrum({ size = 80, className, strokeWidth = 1 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <circle cx="40" cy="40" r="32" />
      <circle cx="40" cy="40" r="22" />
      <line x1="40" y1="18" x2="40" y2="62" />
      <line x1="18" y1="40" x2="62" y2="40" />
      <line x1="25" y1="25" x2="55" y2="55" />
      <line x1="55" y1="25" x2="25" y2="55" />
      <circle cx="40" cy="40" r="3" fill="currentColor" />
    </svg>
  );
}

export function MandalaOrnament({ size = 200, className, strokeWidth = 0.6 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <circle cx="100" cy="100" r="90" />
      <circle cx="100" cy="100" r="70" />
      <circle cx="100" cy="100" r="50" />
      <circle cx="100" cy="100" r="30" />
      <circle cx="100" cy="100" r="14" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 100 + Math.cos(angle) * 14;
        const y1 = 100 + Math.sin(angle) * 14;
        const x2 = 100 + Math.cos(angle) * 90;
        const y2 = 100 + Math.sin(angle) * 90;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
      })}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 15 * Math.PI) / 180;
        const x = 100 + Math.cos(angle) * 70;
        const y = 100 + Math.sin(angle) * 70;
        return <circle key={`d-${i}`} cx={x} cy={y} r="1.5" fill="currentColor" />;
      })}
    </svg>
  );
}

export function CacaoCup({ size = 80, className, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M22 36 C 22 56 30 64 40 64 C 50 64 58 56 58 36 Z" />
      <path d="M22 36 L 58 36" />
      <path d="M58 40 C 64 40 68 44 68 50 C 68 56 64 60 58 60" />
      <path d="M30 22 C 30 18 32 14 32 10 M40 24 C 40 18 38 14 38 10 M50 22 C 50 18 52 14 52 10" opacity="0.7" />
      <path d="M40 50 L 40 56 M36 52 L 44 52" />
    </svg>
  );
}

export function FlameSpirit({ size = 80, className, strokeWidth = 1 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M40 70 C 25 65 20 50 28 35 C 32 28 38 24 36 12 C 44 18 52 28 54 38 C 56 50 50 65 40 70 Z" />
      <path d="M40 60 C 33 56 32 48 36 42 C 38 38 41 36 40 30 C 44 34 48 40 48 46 C 48 52 44 58 40 60 Z" opacity="0.6" />
      <circle cx="40" cy="50" r="2" fill="currentColor" />
    </svg>
  );
}

export function TripleSpiral({ size = 100, className, strokeWidth = 1 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden
    >
      <path d="M50 50 m -3 0 a 3 3 0 1 1 6 0 a 6 6 0 1 1 -12 0 a 9 9 0 1 1 18 0 a 12 12 0 1 1 -24 0 a 15 15 0 1 1 30 0" />
      <circle cx="50" cy="50" r="22" />
      <circle cx="50" cy="50" r="35" />
    </svg>
  );
}

export function FeminineSun({ size = 100, className, strokeWidth = 1 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <circle cx="50" cy="50" r="18" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 50 + Math.cos(angle) * 24;
        const y1 = 50 + Math.sin(angle) * 24;
        const x2 = 50 + Math.cos(angle) * (i % 2 === 0 ? 42 : 36);
        const y2 = 50 + Math.sin(angle) * (i % 2 === 0 ? 42 : 36);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
      })}
      <circle cx="50" cy="50" r="3" fill="currentColor" />
    </svg>
  );
}
