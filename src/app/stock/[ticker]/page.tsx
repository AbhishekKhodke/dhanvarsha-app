'use client';

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/main-layout';
import { StockChart } from '@/components/stock-chart';
import { AiInsights } from '@/components/ai-insights';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { getMarketIndex } from '@/ai/flows/get-market-indices-flow';
import type { MarketIndex } from '@/ai/types';
import { Skeleton } from '@/components/ui/skeleton';

const stockDetails: Record<string, {name: string, sector: string, marketCap: string, peRatio: string, dividendYield: string, '52WeekHigh': string, '52WeekLow': string}> = {
    'NIFTY 50': { name: 'Nifty 50', sector: 'Index', marketCap: '₹150.7T', peRatio: '22.3', dividendYield: '1.2%', '52WeekHigh': '24,000.00', '52WeekLow': '18,000.00' },
    'SENSEX': { name: 'BSE Sensex', sector: 'Index', marketCap: '₹140.2T', peRatio: '30.1', dividendYield: '1.1%', '52WeekHigh': '78,000.00', '52WeekLow': '60,000.00' },
    'NIFTY BANK': { name: 'Nifty Bank', sector: 'Banking', marketCap: '₹35.1T', peRatio: '12.5', dividendYield: '1.5%', '52WeekHigh': '52,000.00', '52WeekLow': '40,000.00' },
};


const StockPageSkeleton = () => (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
      <div className="md:col-span-2 lg:col-span-3">
        <Card className="mb-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                 <Skeleton className="h-9 w-72 mb-2" />
                 <Skeleton className="h-4 w-96" />
              </div>
              <div className="text-right">
                <Skeleton className="h-9 w-32 mb-2" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>
          </CardHeader>
        </Card>
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-[400px] w-full" />
            </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1 flex flex-col gap-4">
        <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="grid gap-4 text-sm">
                <Skeleton className="h-5 w-full" />
                <Separator/>
                <Skeleton className="h-5 w-full" />
                <Separator/>
                <Skeleton className="h-5 w-full" />
                <Separator/>
                <Skeleton className="h-5 w-full" />
                <Separator/>
                <Skeleton className="h-5 w-full" />
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
                 <Skeleton className="h-6 w-40 mb-2" />
                 <Skeleton className="h-4 w-56" />
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
                 <Skeleton className="h-10 w-full mt-4" />
            </CardContent>
        </Card>
      </div>
  </div>
)


export default function StockPage({ params }: { params: { ticker: string } }) {
  const [stock, setStock] = useState<MarketIndex | null>(null);
  const [loading, setLoading] = useState(true);
  const ticker = decodeURIComponent(params.ticker);
  
  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        const data = await getMarketIndex(ticker);
        setStock(data);
        setLoading(false);
    }
    fetchData();
  }, [ticker])

  if(loading || !stock) {
      return <MainLayout><StockPageSkeleton /></MainLayout>
  }

  const details = stockDetails[stock.name] || {};

  return (
    <MainLayout>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <div className="md:col-span-2 lg:col-span-3">
          <Card className="mb-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-bold">{details.name || stock.name}</h1>
                    <Badge variant="outline">{stock.name}</Badge>
                    {details.sector && <Badge variant="secondary">{details.sector}</Badge>}
                  </div>
                  <CardDescription>
                    Track and analyze stock performance.
                  </CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">{stock.value}</p>
                  <div
                    className={`flex items-center justify-end gap-1 text-sm font-medium ${
                      stock.isUp ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {stock.isUp ? (
                      <ArrowUp className="h-4 w-4" />
                    ) : (
                      <ArrowDown className="h-4 w-4" />
                    )}
                    <span>{stock.change}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          <StockChart />
        </div>

        <div className="lg:col-span-1 flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Key Statistics</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Market Cap</span>
                <span>{details.marketCap}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">P/E Ratio</span>
                <span>{details.peRatio}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dividend Yield</span>
                <span>{details.dividendYield}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">52-Week High</span>
                <span>{details['52WeekHigh']}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">52-Week Low</span>
                <span>{details['52WeekLow']}</span>
              </div>
            </CardContent>
          </Card>
          <AiInsights ticker={stock.name} />
        </div>
      </div>
    </MainLayout>
  );
}
