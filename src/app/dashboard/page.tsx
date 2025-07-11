'use client';

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

const indices = [
  {
    name: 'NIFTY 50',
    value: '23,516.00',
    change: '+189.40 (0.81%)',
    isUp: true,
    data: [
      { value: 4500 },
      { value: 4800 },
      { value: 4700 },
      { value: 5200 },
      { value: 5100 },
      { value: 5300 },
      { value: 5400 },
    ],
  },
  {
    name: 'SENSEX',
    value: '77,209.90',
    change: '+620.73 (0.80%)',
    isUp: true,
    data: [
      { value: 3000 },
      { value: 3200 },
      { value: 3100 },
      { value: 3400 },
      { value: 3500 },
      { value: 3300 },
      { value: 3600 },
    ],
  },
   {
    name: 'NIFTY BANK',
    value: '50,440.00',
    change: '-200.50 (0.40%)',
    isUp: false,
    data: [
      { value: 7000 },
      { value: 6800 },
      { value: 6900 },
      { value: 6500 },
      { value: 6600 },
      { value: 6400 },
      { value: 6300 },
    ],
  },
];

const MarketIndexCard = ({ name, value, change, isUp, data }: (typeof indices)[0]) => (
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

export default function DashboardPage() {
  return (
    <MainLayout>
       <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's a look at the market today.</p>
       </div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {indices.map((index) => (
          <MarketIndexCard key={index.name} {...index} />
        ))}
      </div>
    </MainLayout>
  );
}
