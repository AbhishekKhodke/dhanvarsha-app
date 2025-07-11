'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
import { ArrowUpRight, ArrowDownRight, ArrowUp, ArrowDown } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { getMarketIndices } from '@/ai/flows/get-market-indices-flow';
import type { MarketIndex } from '@/ai/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';


const MarketIndexCard = ({ name, value, change, isUp, data }: MarketIndex) => (
  <Link href={`/stock/${encodeURIComponent(name)}`} className="block">
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 min-w-[300px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
        {isUp ? (
          <ArrowUpRight className="h-4 w-4 text-green-500" />
        ) : (
          <ArrowDownRight className="h-4 w-4 text-red-500" />
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold">{value}</div>
            <p className={`text-xs ${isUp ? 'text-green-500' : 'text-red-500'}`}>{change}</p>
          </div>
          <div className="h-16 w-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                 <RechartsTooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                  }}
                />
                <defs>
                   <linearGradient id={isUp ? "colorUv" : "colorPv" } x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isUp ? 'hsl(var(--primary))' : '#ef4444'} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={isUp ? 'hsl(var(--primary))' : '#ef4444'} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke={isUp ? 'hsl(var(--primary))' : '#ef4444'} fillOpacity={1} fill={`url(#${isUp ? 'colorUv' : 'colorPv'})`} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  </Link>
);

const MarketIndexSkeleton = () => (
    <Card className="shadow-lg min-w-[300px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-4" />
        </CardHeader>
        <CardContent>
            <div className="flex items-end justify-between">
                <div>
                    <Skeleton className="h-8 w-32 mb-2" />
                    <Skeleton className="h-3 w-24" />
                </div>
                <div className="h-16 w-32">
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
      setLoading(true);
      const result = await getMarketIndices();
      setData(result);
      setLoading(false);
    };
    fetchData();
  }, []);

  const indices = data.filter(d => ['NIFTY 50', 'SENSEX', 'NIFTY BANK'].includes(d.name));
  const stocks = data.filter(d => !['NIFTY 50', 'SENSEX', 'NIFTY BANK'].includes(d.name));

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
                <MarketIndexCard key={index.name} {...index} />
              ))
            )}
          </div>
       </section>

       <section>
          <Card>
            <CardHeader>
                <CardTitle>Top Stocks</CardTitle>
                <CardDescription>A list of top-performing stocks in the market.</CardDescription>
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
                                <TableRow key={stock.name} className="cursor-pointer">
                                    <TableCell>
                                        <Link href={`/stock/${encodeURIComponent(stock.name)}`} className="font-medium hover:underline">{stock.name}</Link>
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