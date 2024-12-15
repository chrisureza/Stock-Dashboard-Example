import { StockStaticData, Trend } from "../Interfaces/Stock.interface";

const stockStaticData: StockStaticData = {
  'Stock-1': {
    name: 'Apple Inc.',
    ticket: 'AAPL',
    sector: 'Technology',
    price: 174.55,
  },
  'Stock-2': {
    name: 'Microsoft Corporation',
    ticket: 'MSFT',
    sector: 'Technology',
    price: 312.85,
  },
  'Stock-3': {
    name: 'Tesla, Inc.',
    ticket: 'TSLA',
    sector: 'Automotive',
    price: 850.34,
  },
  'Stock-4': {
    name: 'Pfizer Inc.',
    ticket: 'PFE',
    sector: 'Healthcare',
    price: 38.22,
  },
  'Stock-5': {
    name: 'Coca-Cola Company',
    ticket: 'KO',
    sector: 'Consumer Goods',
    price: 58.90,
  },
  'Stock-6': {
    name: 'Chevron Corporation',
    ticket: 'CVX',
    sector: 'Energy',
    price: 164.12,
  },
  'Stock-7': {
    name: 'JPMorgan Chase & Co.',
    ticket: 'JPM',
    sector: 'Finance',
    price: 152.34,
  },
  'Stock-8': {
    name: 'Boeing Company',
    ticket: 'BA',
    sector: 'Aerospace',
    price: 209.87,
  },
  'Stock-9': {
    name: 'Walmart Inc.',
    ticket: 'WMT',
    sector: 'Retail',
    price: 157.45,
  },
};

export const stockRandomData = (index: number) => {
  const stockKey = `Stock-${index + 1}`;
  const original = stockStaticData[stockKey];

  // Determine a price variation between -10 and +10 to simulate an increase or decrease.
  const change = parseFloat((Math.random() * 20 - 10).toFixed(2));

  // Calculate the new price based on the original price and the variation.
  const newPrice = parseFloat((original.price + change).toFixed(2));

  // Calculate the percentage change based on the original price.
  const percentageChange = parseFloat(((change / original.price) * 100).toFixed(2));

  // Traded volume
  const volume = Math.floor(Math.random() * 10000) + 100;

  // Determine the trend based on the price change.
  let trend: Trend = 'neutral';
  if (change > 0) trend = 'up';
  else if (change < 0) trend = 'down';

  return {
    ...stockStaticData[stockKey],
    price: [newPrice],
    timestamp: new Date().toISOString(),
    volume,
    change,
    percentageChange,
    trend,
  };
};