export function Logo() {
  return (
    <div className="flex items-center gap-2" aria-label="DhanVarsha Home">
      <div className="bg-white p-1 rounded-lg">
        <svg
          className="h-8 w-8"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
            fill="url(#gradient)"
          />
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="white"
            fontSize="14"
            fontWeight="bold"
            dy=".1em"
          >
            ₹
          </text>
          <defs>
            <linearGradient
              id="gradient"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop offset="0%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#4ADE80" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span className="text-xl font-bold text-foreground tracking-wider">
        DhanVarsha
      </span>
    </div>
  );
}
