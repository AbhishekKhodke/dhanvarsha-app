
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

// State to hold the last value for more realistic fluctuations
const lastValues: Record<string, number> = {};

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


const indicesData: Record<string, { name: string, baseValue: number; iconUrl: string }> = {
    'NIFTY 50': { name: 'Nifty 50', baseValue: 23500, iconUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/25/Nifty_50_logo.svg/1200px-Nifty_50_logo.svg.png' },
    'SENSEX': { name: 'BSE Sensex', baseValue: 77200, iconUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/54/BSE_SENSEX.svg/1200px-BSE_SENSEX.svg.png' },
    'NIFTY BANK': { name: 'Nifty Bank', baseValue: 50500, iconUrl: 'https://cdn.upstox.com/indices/nifty-bank.png' },
    'RELIANCE.NS': { name: 'Reliance Industries', baseValue: 2900, iconUrl: 'https://logo.clearbit.com/ril.com' },
    'HDFCBANK.NS': { name: 'HDFC Bank', baseValue: 1600, iconUrl: 'https://logo.clearbit.com/hdfcbank.com' },
    'ICICIBANK.NS': { name: 'ICICI Bank', baseValue: 1100, iconUrl: 'https://logo.clearbit.com/icicibank.com' },
    'INFY.NS': { name: 'Infosys', baseValue: 1500, iconUrl: 'https://logo.clearbit.com/infosys.com' },
    'TCS.NS': { name: 'Tata Consultancy Services', baseValue: 3800, iconUrl: 'https://logo.clearbit.com/tcs.com' },
    'HINDUNILVR.NS': { name: 'Hindustan Unilever', baseValue: 2500, iconUrl: 'https://logo.clearbit.com/hul.co.in' },
    'ITC.NS': { name: 'ITC Limited', baseValue: 430, iconUrl: 'https://logo.clearbit.com/itcportal.com' },
    'KOTAKBANK.NS': { name: 'Kotak Mahindra Bank', baseValue: 1750, iconUrl: 'https://logo.clearbit.com/kotak.com' },
    'SBIN.NS': { name: 'State Bank of India', baseValue: 840, iconUrl: 'https://logo.clearbit.com/sbi.co.in' },
    'AXISBANK.NS': { name: 'Axis Bank', baseValue: 1200, iconUrl: 'https://logo.clearbit.com/axisbank.com' },
    'LT.NS': { name: 'Larsen & Toubro', baseValue: 3500, iconUrl: 'https://logo.clearbit.com/larsentoubro.com' },
};

function generateIndexData(ticker: string): MarketIndex {
    const { name, baseValue, iconUrl } = indicesData[ticker] || { name: ticker, baseValue: 1000, iconUrl: 'https://placehold.co/40x40.png' };
    
    // Use the last stored value, or the base value if it's the first run.
    const currentBase = lastValues[ticker] || baseValue;

    // The maximum percentage change per tick.
    const maxTickChangePercent = 0.0005; // 0.05%
    const changeAmount = currentBase * maxTickChangePercent;
    
    const randomChange = getRandom(-changeAmount, changeAmount);
    const value = currentBase + randomChange;

    // Store the new value for the next tick.
    lastValues[ticker] = value;
    
    // Calculate change from the original base value for display
    const totalChange = value - baseValue;
    const isUp = totalChange >= 0;

    const formattedValue = value.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    
    const changePercent = (totalChange / baseValue) * 100;
    const formattedChange = `${isUp ? '+' : ''}${totalChange.toFixed(2)} (${isUp ? '+' : ''}${changePercent.toFixed(2)}%)`;

    return {
        ticker,
        name,
        value: formattedValue,
        change: formattedChange,
        isUp,
        iconUrl,
        data: generateChartData(value, 7, isUp),
    };
}


export async function getMarketIndices(): Promise<MarketIndex[]> {
  const tickers = Object.keys(indicesData);
  return tickers.map(ticker => generateIndexData(ticker));
}

export async function getMarketIndex(ticker: string): Promise<MarketIndex> {
    return generateIndexData(ticker);
}
