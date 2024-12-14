export type Trend = 'up' | 'down' | 'neutral';

export interface Stock {
	name: string;
	ticket: string;
	sector: string;
	price: number[];
	timestamp: string;
	volume: number;
	change: number;
	percentageChange: number;
	trend: Trend;
}

export interface StockStaticData {
	[key: string]: {
		name: string,
		ticket: string,
		sector: string,
		price: number,
	}
}