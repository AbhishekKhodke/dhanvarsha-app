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
    'RELIANCE': { baseValue: 2900, changeRange: 50 },
    'HDFCBANK': { baseValue: 1600, changeRange: 40 },
    'ICICIBANK': { baseValue: 1100, changeRange: 30 },
    'INFY': { baseValue: 1500, changeRange: 35 },
    'TCS': { baseValue: 3800, changeRange: 70 },
    'HINDUNILVR': { baseValue: 2500, changeRange: 60 },
    'ITC': { baseValue: 430, changeRange: 15 },
    'KOTAKBANK': { baseValue: 1750, changeRange: 45 },
    'SBIN': { baseValue: 840, changeRange: 25 },
    'AXISBANK': { baseValue: 1200, changeRange: 30 },
    'LT': { baseValue: 3500, changeRange: 80 },
};

function generateIndexData(ticker: string): MarketIndex {
    const { baseValue, changeRange } = indicesData[ticker] || { baseValue: 1000, changeRange: 50 };
    
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
  const tickers = [
    'NIFTY 50', 
    'SENSEX', 
    'NIFTY BANK', 
    'RELIANCE', 
    'HDFCBANK', 
    'ICICIBANK',
    'INFY',
    'TCS',
    'SBIN',
    'KOTAKBANK',
    'AXISBANK',
    'LT'
  ];
  return tickers.map(ticker => generateIndexData(ticker));
}

export async function getMarketIndex(ticker: string): Promise<MarketIndex> {
    return generateIndexData(ticker);
}
