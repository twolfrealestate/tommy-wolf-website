export interface MonthEntry {
  period: string
  medianPrice: number
  medianDOM: number
  totalSold: number
  listToSaleRatio: number
}

export interface MarketDataMap {
  'Single Family': MonthEntry[]
  'Townhome': MonthEntry[]
  'All': MonthEntry[]
  [key: string]: MonthEntry[]
}

export declare const lastUpdated: string
declare const marketData: MarketDataMap
export default marketData
