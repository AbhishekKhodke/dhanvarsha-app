
import { z } from 'genkit';

export const MarketIndexSchema = z.object({
  ticker: z.string(),
  name: z.string(),
  value: z.string(),
  change: z.string(),
  isUp: z.boolean(),
  iconUrl: z.string(),
  data: z.array(z.object({ value: z.number() })),
});

export type MarketIndex = z.infer<typeof MarketIndexSchema>;
