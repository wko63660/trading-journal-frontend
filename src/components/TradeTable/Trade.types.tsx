export interface Trade {
    id: number
    symbol: string
    entryDate: string
    exitDate?: string
    side: string
    quantity: number
    entryPrice: number
    exitPrice?: number
    pnl?: number
    tags: string[]
  }