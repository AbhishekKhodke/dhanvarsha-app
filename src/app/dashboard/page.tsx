
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { MainLayout } from '@/components/main-layout';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { getMarketIndices } from '@/ai/flows/get-market-indices-flow';
import type { MarketIndex } from '@/ai/types';
import { Skeleton } from '@/components/ui/skeleton';


const MarketIndexCard = ({ name, value, change, isUp, data, ticker, iconUrl }: MarketIndex) => (
  <Link href={`/stock/${encodeURIComponent(ticker || name)}`} className="block">
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 w-[200px]">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-1 gap-2">
         <Image src={iconUrl} alt={`${name} logo`} width={40} height={40} className="rounded-full" data-ai-hint={`${name} logo`}/>
        <div className="flex-grow text-right">
          <CardTitle className="text-sm font-medium whitespace-nowrap">{name}</CardTitle>
          <p className={`text-xs ${isUp ? 'text-green-500' : 'text-red-500'}`}>{change}</p>
        </div>
      </CardHeader>
      <CardContent className="pt-1">
        <div className="flex items-end justify-between">
          <div className="text-lg font-bold">{value}</div>
          <div className="h-8 w-16">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                 <RechartsTooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                    fontSize: '12px',
                    padding: '4px 8px'
                  }}
                  labelStyle={{ display: 'none' }}
                />
                <defs>
                   <linearGradient id="chartGreen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                  </linearGradient>
                   <linearGradient id="chartRed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke={isUp ? "#22C55E" : "#EF4444"} fillOpacity={1} fill={isUp ? "url(#chartGreen)" : "url(#chartRed)"} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  </Link>
);

const MarketIndexSkeleton = () => (
    <Card className="shadow-lg w-[200px]">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-1 gap-2">
             <Skeleton className="h-10 w-10 rounded-full" />
             <div className="flex-grow text-right">
                <Skeleton className="h-4 w-16 mb-1 ml-auto" />
                <Skeleton className="h-3 w-12 ml-auto" />
             </div>
        </CardHeader>
        <CardContent className="pt-1">
            <div className="flex items-end justify-between">
                <div>
                    <Skeleton className="h-5 w-20" />
                </div>
                <div className="h-8 w-16">
                    <Skeleton className="h-full w-full" />
                </div>
            </div>
        </CardContent>
    </Card>
);


export default function DashboardPage() {
  const [data, setData] = useState<MarketIndex[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getMarketIndices();
      setData(result);
      if (loading) {
          setLoading(false);
      }
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [loading]);

  const indices = data.filter(d => ['NIFTY 50', 'SENSEX', 'NIFTY BANK'].includes(d.ticker || ''));
  const stocks = data.filter(d => !['NIFTY 50', 'SENSEX', 'NIFTY BANK'].includes(d.ticker || ''));

  return (
    <MainLayout>
       <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's a look at the market today.</p>
       </div>
       
       <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Market Indices</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {loading ? (
              <>
                <MarketIndexSkeleton />
                <MarketIndexSkeleton />
                <MarketIndexSkeleton />
              </>
            ) : (
              indices.map((index) => (
                <MarketIndexCard key={index.ticker} {...index} />
              ))
            )}
          </div>
       </section>

       <section>
          <Card>
            <CardHeader>
                <CardTitle>Top Stocks</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Company</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead className="text-right">Change</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                         {loading ? (
                            Array.from({length: 5}).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-5 w-24 ml-auto" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-5 w-20 ml-auto" /></TableCell>
                                </TableRow>
                            ))
                         ) : (
                            stocks.map((stock) => (
                                <TableRow key={stock.ticker} className="cursor-pointer">
                                    <TableCell>
                                        <Link href={`/stock/${encodeURIComponent(stock.ticker || stock.name)}`} className="font-medium hover:underline flex items-center gap-3">
                                          <Image src={stock.iconUrl} alt={`${stock.name} logo`} width={40} height={40} className="rounded-full" data-ai-hint={`${stock.name} logo`}/>
                                          <div>
                                              <div>{stock.name}</div>
                                              <div className="text-xs text-muted-foreground">{stock.ticker}</div>
                                          </div>
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-right font-mono">{stock.value}</TableCell>
                                    <TableCell className={`flex items-center justify-end gap-1 text-right font-mono ${stock.isUp ? 'text-green-500' : 'text-red-500'}`}>
                                        {stock.isUp ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                                        {stock.change}
                                    </TableCell>
                                </TableRow>
                            ))
                         )}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
       </section>
    </MainLayout>
  );
}
