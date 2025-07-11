'use server';

/**
 * @fileOverview Generates a summary of a stock, including market sentiment analysis.
 *
 * - stockInsightSummary - A function that generates a stock insight summary.
 * - StockInsightSummaryInput - The input type for the stockInsightSummary function.
 * - StockInsightSummaryOutput - The return type for the stockInsightSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StockInsightSummaryInputSchema = z.object({
  ticker: z.string().describe('The ticker symbol of the stock.'),
});
export type StockInsightSummaryInput = z.infer<typeof StockInsightSummaryInputSchema>;

const StockInsightSummaryOutputSchema = z.object({
  summary: z.string().describe('A summary of the stock, including market sentiment analysis.'),
});
export type StockInsightSummaryOutput = z.infer<typeof StockInsightSummaryOutputSchema>;

export async function stockInsightSummary(input: StockInsightSummaryInput): Promise<StockInsightSummaryOutput> {
  return stockInsightSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'stockInsightSummaryPrompt',
  input: {schema: StockInsightSummaryInputSchema},
  output: {schema: StockInsightSummaryOutputSchema},
  prompt: `You are an AI assistant that provides summaries of stocks, including market sentiment analysis.

  Provide a detailed summary, including market sentiment, for the following stock ticker: {{{ticker}}}.\n`,
});

const stockInsightSummaryFlow = ai.defineFlow(
  {
    name: 'stockInsightSummaryFlow',
    inputSchema: StockInsightSummaryInputSchema,
    outputSchema: StockInsightSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
