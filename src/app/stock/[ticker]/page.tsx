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

// This is mock data. In a real app, you would fetch this from an API.
const getStockData = (ticker: string) => {
  return {
    name: 'Reliance Industries Ltd.',
    ticker: ticker.toUpperCase(),
    price: '2,958.05',
    change: '+49.85 (1.71%)',
    isUp: true,
    sector: 'Energy',
    marketCap: '₹20.01T',
    peRatio: '27.53',
    dividendYield: '0.30%',
    '52WeekHigh': '3,029.00',
    '52WeekLow': '2,220.30',
  };
};

export default function StockPage({ params }: { params: { ticker: string } }) {
  const stock = getStockData(params.ticker);

  return (
    <MainLayout>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <div className="md:col-span-2 lg:col-span-3">
          <Card className="mb-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-bold">{stock.name}</h1>
                    <Badge variant="outline">{stock.ticker}</Badge>
                    <Badge variant="secondary">{stock.sector}</Badge>
                  </div>
                  <CardDescription>
                    Track and analyze stock performance.
                  </CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">{stock.price}</p>
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
                <span>{stock.marketCap}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">P/E Ratio</span>
                <span>{stock.peRatio}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dividend Yield</span>
                <span>{stock.dividendYield}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">52-Week High</span>
                <span>{stock['52WeekHigh']}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">52-Week Low</span>
                <span>{stock['52WeekLow']}</span>
              </div>
            </CardContent>
          </Card>
          <AiInsights ticker={stock.ticker} />
        </div>
      </div>
    </MainLayout>
  );
}
