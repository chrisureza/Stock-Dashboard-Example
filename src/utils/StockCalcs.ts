import { stockStaticData } from "../constants/StockStaticData";
import { Trend } from "../Interfaces/Stock.interface";

export const stockRandomData = (index: number) => {
  const stockKey = `Stock-${index + 1}`;
  const original = stockStaticData[stockKey];

  // Determine a price variation between -20 and +20 to simulate a smaller increase or decrease.
  const change = parseFloat((Math.random() * 40 - 20).toFixed(2));

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

export const stockPriceColor = (condition: boolean) => condition ? "text-green-300" : "text-red-400";
