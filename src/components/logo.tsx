import { TrendingUp } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2" aria-label="DhanVarsha Home">
      <div className="bg-primary/20 p-2 rounded-lg">
        <TrendingUp className="h-6 w-6 text-primary" />
      </div>
      <span className="text-xl font-bold text-foreground tracking-wider">
        DhanVarsha
      </span>
    </div>
  );
}
