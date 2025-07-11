import { z } from 'genkit';

export const MarketIndexSchema = z.object({
  name: z.string(),
  value: z.string(),
  change: z.string(),
  isUp: z.boolean(),
  data: z.array(z.object({ value: z.number() })),
});

export type MarketIndex = z.infer<typeof MarketIndexSchema>;
