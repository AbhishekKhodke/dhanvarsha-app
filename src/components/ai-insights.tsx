'use client';

import { useState, useTransition } from 'react';
import { Wand2 } from 'lucide-react';
import { stockInsightSummary } from '@/ai/flows/stock-insight-summary';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

export function AiInsights({ ticker }: { ticker: string }) {
  const [isPending, startTransition] = useTransition();
  const [summary, setSummary] = useState('');
  const { toast } = useToast();

  const handleGenerateSummary = () => {
    startTransition(async () => {
      try {
        const result = await stockInsightSummary({ ticker });
        setSummary(result.summary);
      } catch (error) {
        console.error('Failed to generate summary:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not generate AI summary. Please try again.',
        });
      }
    });
  };

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-primary" />
          <span>AI-Powered Insights</span>
        </CardTitle>
        <CardDescription>
          Generate an AI summary and sentiment analysis for {ticker}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {summary ? (
          <div className="prose prose-sm max-w-none text-foreground">
            <p>{summary}</p>
          </div>
        ) : isPending ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
           <p className="text-sm text-muted-foreground">Click the button to generate insights.</p>
        )}
        <Button
          onClick={handleGenerateSummary}
          disabled={isPending}
          className="mt-4 w-full"
        >
          <Wand2 className="mr-2 h-4 w-4" />
          {isPending ? 'Generating...' : 'Generate Summary'}
        </Button>
      </CardContent>
    </Card>
  );
}
