export interface ParsedTrade {
  symbol: string
  date: string
  side: string
  qty: number
  entry: number
  exit: number
  pnl: number
  notes: string
  tags: string
}