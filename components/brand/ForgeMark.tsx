export function ForgeMark({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="6" fill="#0B0B0F" />
      <rect x="6" y="20" width="20" height="4" rx="1" fill="#7C3AED" />
      <rect x="8" y="16" width="16" height="4" rx="1" fill="#9333EA" />
      <rect x="12" y="8" width="8" height="8" rx="1" fill="url(#fg)" />
      <rect x="10" y="4" width="12" height="4" rx="1" fill="#22D3EE" />
      <rect x="14" y="8" width="4" height="10" rx="1" fill="#A3A3B3" />
      <rect x="24" y="6" width="2" height="2" fill="#22D3EE" opacity="0.8" />
      <rect x="4" y="6" width="2" height="2" fill="#22D3EE" opacity="0.5" />
    </svg>
  );
}
