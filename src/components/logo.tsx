export function Logo() {
  return (
    <div className="flex items-center gap-2" aria-label="DhanVarsha Home">
      <div className="bg-primary/20 p-2 rounded-lg">
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#22c55e' }} />
              <stop offset="100%" style={{ stopColor: '#ef4444' }} />
            </linearGradient>
          </defs>
          <path d="M6 8h12" stroke="url(#logoGradient)" />
          <path d="M6 12h12" stroke="url(#logoGradient)" />
          <path d="M12 12v8" stroke="url(#logoGradient)" />
          <path d="M9.5 12c-1.5 0-3-1.5-3-3.5a3.5 3.5 0 1 1 7 0" stroke="url(#logoGradient)" />
        </svg>
      </div>
      <span className="text-xl font-bold text-foreground tracking-wider">
        DhanVarsha
      </span>
    </div>
  );
}
