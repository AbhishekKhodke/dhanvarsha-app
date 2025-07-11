
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MainLayout } from '@/components/main-layout';
import { StockChart } from '@/components/stock-chart';
import { AiInsights } from '@/components/ai-insights';
import { TradePanel } from '@/components/trade-panel';
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
import { Button } from '@/components/ui/button';

const stockDetails: Record<string, {name: string, sector: string, marketCap: string, peRatio: string, dividendYield: string, '52WeekHigh': string, '52WeekLow': string}> = {
    'NIFTY 50': { name: 'Nifty 50', sector: 'Index', marketCap: '₹150.7T', peRatio: '22.3', dividendYield: '1.2%', '52WeekHigh': '24,000.00', '52WeekLow': '18,000.00' },
    'SENSEX': { name: 'BSE Sensex', sector: 'Index', marketCap: '₹140.2T', peRatio: '30.1', dividendYield: '1.1%', '52WeekHigh': '78,000.00', '52WeekLow': '60,000.00' },
    'NIFTY BANK': { name: 'Nifty Bank', sector: 'Banking', marketCap: '₹35.1T', peRatio: '12.5', dividendYield: '1.5%', '52WeekHigh': '52,000.00', '52WeekLow': '40,000.00' },
    'RELIANCE.NS': { name: 'Reliance Industries', sector: 'Conglomerate', marketCap: '₹19.6T', peRatio: '28.5', dividendYield: '0.3%', '52WeekHigh': '3,024.90', '52WeekLow': '2,220.30' },
    'HDFCBANK.NS': { name: 'HDFC Bank', sector: 'Banking', marketCap: '₹12.2T', peRatio: '19.8', dividendYield: '1.2%', '52WeekHigh': '1,757.80', '52WeekLow': '1,363.45' },
    'ICICIBANK.NS': { name: 'ICICI Bank', sector: 'Banking', marketCap: '₹7.8T', peRatio: '18.2', dividendYield: '0.7%', '52WeekHigh': '1,169.00', '52WeekLow': '899.00' },
    'INFY.NS': { name: 'Infosys', sector: 'IT Services', marketCap: '₹6.3T', peRatio: '23.8', dividendYield: '2.4%', '52WeekHigh': '1,733.00', '52WeekLow': '1,262.25' },
    'TCS.NS': { name: 'Tata Consultancy Services', sector: 'IT Services', marketCap: '₹13.8T', peRatio: '30.1', dividendYield: '1.3%', '52WeekHigh': '4,254.45', '52WeekLow': '3,165.00' },
    'HINDUNILVR.NS': { name: 'Hindustan Unilever', sector: 'FMCG', marketCap: '₹5.8T', peRatio: '56.9', dividendYield: '1.6%', '52WeekHigh': '2,768.50', '52WeekLow': '2,242.00' },
    'ITC.NS': { name: 'ITC Limited', sector: 'Conglomerate', marketCap: '₹5.3T', peRatio: '25.6', dividendYield: '3.2%', '52WeekHigh': '499.60', '52WeekLow': '399.35' },
    'KOTAKBANK.NS': { name: 'Kotak Mahindra Bank', sector: 'Banking', marketCap: '₹3.5T', peRatio: '25.3', dividendYield: '0.1%', '52WeekHigh': '2,063.00', '52WeekLow': '1,544.50' },
    'SBIN.NS': { name: 'State Bank of India', sector: 'Banking', marketCap: '₹7.5T', peRatio: '10.9', dividendYield: '1.6%', '52WeekHigh': '912.00', '52WeekLow': '543.20' },
    'AXISBANK.NS': { name: 'Axis Bank', sector: 'Banking', marketCap: '₹3.7T', peRatio: '14.8', dividendYield: '0.2%', '52WeekHigh': '1,245.00', '52WeekLow': '927.00' },
    'LT.NS': { name: 'Larsen & Toubro', sector: 'Infrastructure', marketCap: '₹4.8T', peRatio: '35.4', dividendYield: '0.8%', '52WeekHigh': '3,948.60', '52WeekLow': '2,572.00' },
    'BAJFINANCE.NS': { name: 'Bajaj Finance', sector: 'Financial Services', marketCap: '₹4.4T', peRatio: '30.5', dividendYield: '0.5%', '52WeekHigh': '8,190.00', '52WeekLow': '6,189.00' },
    'BHARTIARTL.NS': { name: 'Bharti Airtel', sector: 'Telecom', marketCap: '₹8.5T', peRatio: '65.2', dividendYield: '0.3%', '52WeekHigh': '1,449.00', '52WeekLow': '854.00' },
    'ASIANPAINT.NS': { name: 'Asian Paints', sector: 'Paints', marketCap: '₹2.8T', peRatio: '50.1', dividendYield: '1.1%', '52WeekHigh': '3,568.00', '52WeekLow': '2,685.00' },
    'MARUTI.NS': { name: 'Maruti Suzuki', sector: 'Automobile', marketCap: '₹4.0T', peRatio: '29.3', dividendYield: '1.0%', '52WeekHigh': '13,065.00', '52WeekLow': '9,255.00' },
    'WIPRO.NS': { name: 'Wipro', sector: 'IT Services', marketCap: '₹2.6T', peRatio: '22.8', dividendYield: '0.2%', '52WeekHigh': '546.10', '52WeekLow': '375.00' },
    'SUNPHARMA.NS': { name: 'Sun Pharma', sector: 'Pharmaceuticals', marketCap: '₹3.6T', peRatio: '36.8', dividendYield: '0.9%', '52WeekHigh': '1,638.00', '52WeekLow': '1,051.00' },
    'ULTRACEMCO.NS': { name: 'UltraTech Cement', sector: 'Cement', marketCap: '₹3.1T', peRatio: '30.7', dividendYield: '0.7%', '52WeekHigh': '11,299.00', '52WeekLow': '8,010.00' },
    'NESTLEIND.NS': { name: 'Nestle India', sector: 'FMCG', marketCap: '₹2.4T', peRatio: '75.9', dividendYield: '1.4%', '52WeekHigh': '2,769.30', '52WeekLow': '2,145.00' },
    'POWERGRID.NS': { name: 'Power Grid Corp', sector: 'Power', marketCap: '₹3.1T', peRatio: '18.1', dividendYield: '2.3%', '52WeekHigh': '346.90', '52WeekLow': '186.20' },
    'M&M.NS': { name: 'Mahindra & Mahindra', sector: 'Automobile', marketCap: '₹3.6T', peRatio: '25.8', dividendYield: '0.7%', '52WeekHigh': '3,013.50', '52WeekLow': '1,373.00' },
    'TATASTEEL.NS': { name: 'Tata Steel', sector: 'Steel', marketCap: '₹2.2T', peRatio: '45.1', dividendYield: '2.0%', '52WeekHigh': '184.60', '52WeekLow': '108.15' },
    'TITAN.NS': { name: 'Titan Company', sector: 'Consumer Goods', marketCap: '₹3.0T', peRatio: '85.2', dividendYield: '0.3%', '52WeekHigh': '3,885.00', '52WeekLow': '2,882.00' },
    'BAJAJFINSV.NS': { name: 'Bajaj Finserv', sector: 'Financial Services', marketCap: '₹2.5T', peRatio: '32.1', dividendYield: '0.1%', '52WeekHigh': '1,741.00', '52WeekLow': '1,418.00' },
    'ADANIPORTS.NS': { name: 'Adani Ports', sector: 'Infrastructure', marketCap: '₹3.1T', peRatio: '38.5', dividendYield: '0.4%', '52WeekHigh': '1,607.00', '52WeekLow': '704.00' },
    'NTPC.NS': { name: 'NTPC', sector: 'Power', marketCap: '₹3.5T', peRatio: '16.9', dividendYield: '2.1%', '52WeekHigh': '394.95', '52WeekLow': '179.95' },
    'DIVISLAB.NS': { name: 'Divi\'s Labs', sector: 'Pharmaceuticals', marketCap: '₹1.2T', peRatio: '70.2', dividendYield: '0.7%', '52WeekHigh': '4,650.00', '52WeekLow': '3,142.00' },
    'JSWSTEEL.NS': { name: 'JSW Steel', sector: 'Steel', marketCap: '₹2.3T', peRatio: '24.8', dividendYield: '1.5%', '52WeekHigh': '943.90', '52WeekLow': '725.00' },
    'HCLTECH.NS': { name: 'HCL Technologies', sector: 'IT Services', marketCap: '₹3.9T', peRatio: '25.3', dividendYield: '3.6%', '52WeekHigh': '1,697.00', '52WeekLow': '1,087.00' },
    'ONGC.NS': { name: 'ONGC', sector: 'Oil & Gas', marketCap: '₹3.4T', peRatio: '7.1', dividendYield: '4.1%', '52WeekHigh': '292.95', '52WeekLow': '155.70' },
    'TATAMOTORS.NS': { name: 'Tata Motors', sector: 'Automobile', marketCap: '₹3.3T', peRatio: '15.9', dividendYield: '0.6%', '52WeekHigh': '1,065.60', '52WeekLow': '557.45' },
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
  const [showTradePanel, setShowTradePanel] = useState(false);
  const [tradeAction, setTradeAction] = useState<'BUY' | 'SELL'>('BUY');
  const ticker = decodeURIComponent(params.ticker);
  
  useEffect(() => {
    const fetchData = async () => {
        const data = await getMarketIndex(ticker);
        setStock(data);
        if (loading) {
            setLoading(false);
        }
    }
    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [ticker, loading])

  const handleTradeClick = (action: 'BUY' | 'SELL') => {
    setTradeAction(action);
    setShowTradePanel(true);
  }

  if(loading || !stock) {
      return <MainLayout><StockPageSkeleton /></MainLayout>
  }

  const details = stockDetails[stock.ticker] || {};

  return (
    <MainLayout>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <div className="md:col-span-2 lg:col-span-3">
          <Card className="mb-4">
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                   <Image src={stock.iconUrl} alt={`${stock.name} logo`} width={40} height={40} className="rounded-full" data-ai-hint={`${stock.name} logo`}/>
                   <div>
                    <h1 className="text-3xl font-bold">{stock.name}</h1>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{stock.ticker}</Badge>
                      {details.sector && <Badge variant="secondary">{details.sector}</Badge>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
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
                   {!showTradePanel && <div className="flex gap-2">
                    <Button onClick={() => handleTradeClick('BUY')} className="bg-green-600 hover:bg-green-700 text-white">Buy</Button>
                    <Button onClick={() => handleTradeClick('SELL')} variant="destructive">Sell</Button>
                  </div>}
                </div>

              </div>
            </CardHeader>
          </Card>

          <StockChart />
        </div>

        <div className="lg:col-span-1 flex flex-col gap-4">
          {showTradePanel ? (
            <TradePanel 
              key={tradeAction}
              stock={stock} 
              action={tradeAction} 
              onClose={() => setShowTradePanel(false)} 
            />
          ) : (
            <>
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
              <AiInsights ticker={stock.ticker} />
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
