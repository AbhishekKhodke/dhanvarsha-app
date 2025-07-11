export function Logo() {
  return (
    <div className="flex items-center gap-2" aria-label="DhanVarsha Home">
      <div className="bg-primary/20 p-2 rounded-lg">
        <svg
          className="h-6 w-6 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 8h12" />
          <path d="M6 12h12" />
          <path d="M12 12v8" />
          <path d="M9.5 12c-1.5 0-3-1.5-3-3.5a3.5 3.5 0 1 1 7 0" />
        </svg>
      </div>
      <span className="text-xl font-bold text-foreground tracking-wider">
        DhanVarsha
      </span>
    </div>
  );
}
