'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartData = [
  { month: 'January', price: 186 },
  { month: 'February', price: 305 },
  { month: 'March', price: 237 },
  { month: 'April', price: 273 },
  { month: 'May', price: 209 },
  { month: 'June', price: 214 },
  { month: 'July', price: 225 },
  { month: 'August', price: 250 },
  { month: 'September', price: 230 },
  { month: 'October', price: 260 },
  { month: 'November', price: 280 },
  { month: 'December', price: 295 },
];

const chartConfig = {
  price: {
    label: 'Price (INR)',
    color: 'hsl(var(--primary))',
  },
};

export function StockChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historical Performance</CardTitle>
        <CardDescription>Price chart for the last 12 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
             <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `₹${value}`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <defs>
              <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-price)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-price)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="price"
              type="natural"
              fill="url(#fillPrice)"
              stroke="var(--color-price)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
