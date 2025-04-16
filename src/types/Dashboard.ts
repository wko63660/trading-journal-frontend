// types/Dashboard.ts
export interface DailyStats {
    day: string;
    pnl: number;
    trades: number;
  }
  
export interface DashboardData {
profitFactor: number;
winLossRatio: number;
winVsLoss: number;
avgHoldingTime: string;
days: DailyStats[];
}
  