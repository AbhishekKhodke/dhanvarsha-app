'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { MainLayout } from '@/components/main-layout';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { getMarketIndices, type MarketIndex } from '@/ai/flows/get-market-indices-flow';
import { Skeleton } from '@/components/ui/skeleton';


const MarketIndexCard = ({ name, value, change, isUp, data }: MarketIndex) => (
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
  const [indices, setIndices] = useState<MarketIndex[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getMarketIndices();
      setIndices(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <MainLayout>
       <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's a look at the market today.</p>
       </div>
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
    </MainLayout>
  );
}
