export interface Trade {
    id: number
    symbol: string
    entryDateTime: string
    exitDateTime?: string
    side: string
    quantity: number
    volume: number
    entryPrice: number
    exitPrice?: number
    pnl?: number
    tags: string[]
  }