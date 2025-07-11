'use server';

/**
 * @fileOverview A flow for fetching simulated live market index data.
 *
 * - getMarketIndices - A function that returns simulated data for major market indices.
 * - getMarketIndex - A function that returns simulated data for a single market index.
 */

import type { MarketIndex } from '@/ai/types';

// Helper to generate a random number within a range
const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

// Helper to generate chart data
const generateChartData = (base: number, points = 7, isUp: boolean) => {
  const data = [];
  let lastValue = base;
  for (let i = 0; i < points; i++) {
    const fluctuation = base * 0.05; // Fluctuate by up to 5%
    if (isUp) {
      lastValue += getRandom(-fluctuation * 0.2, fluctuation);
    } else {
      lastValue += getRandom(-fluctuation, fluctuation * 0.2);
    }
    lastValue = Math.max(lastValue, base * 0.8); // Don't let it dip too low
    data.push({ value: Math.round(lastValue) });
  }
  return data;
};


const indicesData: Record<string, { baseValue: number; changeRange: number }> = {
    'NIFTY 50': { baseValue: 23500, changeRange: 200 },
    'SENSEX': { baseValue: 77200, changeRange: 650 },
    'NIFTY BANK': { baseValue: 50500, changeRange: 300 },
};

function generateIndexData(ticker: string): MarketIndex {
    const { baseValue, changeRange } = indicesData[ticker] || { baseValue: 5000, changeRange: 100 };
    
    const randomChange = getRandom(-changeRange, changeRange);
    const isUp = randomChange >= 0;
    const value = baseValue + randomChange;

    const formattedValue = value.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    
    const changePercent = (randomChange / baseValue) * 100;
    const formattedChange = `${isUp ? '+' : ''}${randomChange.toFixed(2)} (${isUp ? '+' : ''}${changePercent.toFixed(2)}%)`;

    return {
        name: ticker,
        value: formattedValue,
        change: formattedChange,
        isUp,
        data: generateChartData(baseValue, 7, isUp),
    };
}


export async function getMarketIndices(): Promise<MarketIndex[]> {
  const tickers = ['NIFTY 50', 'SENSEX', 'NIFTY BANK'];
  return tickers.map(ticker => generateIndexData(ticker));
}

export async function getMarketIndex(ticker: string): Promise<MarketIndex> {
    return generateIndexData(ticker);
}
