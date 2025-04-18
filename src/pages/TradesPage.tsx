import { useEffect, useState } from "react"
import api from "../services/api"
import { Trade } from "../components/TradeTable/Trade.types"

export default function TradesPage() {
  const [trades, setTrades] = useState<Trade[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await api.get("/trades")
        setTrades(response.data)
      } catch (err) {
        console.error("Failed to fetch trades", err)
      } finally {
        setLoading(false)
      }
    }
    fetchTrades()
  }, [])

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Trades</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full bg-white dark:bg-gray-800 border">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="text-left p-2">Symbol</th>
              <th className="text-left p-2">Side</th>
              <th className="text-left p-2">Entry</th>
              <th className="text-left p-2">Exit</th>
              <th className="text-left p-2">PnL</th>
              <th className="text-left p-2">Tags</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="p-2 font-medium">{t.symbol}</td>
                <td className="p-2">{t.side}</td>
                <td className="p-2">{t.entryDate}</td>
                <td className="p-2">{t.exitDate || "--"}</td>
                <td className={`p-2 ${t.pnl && t.pnl < 0 ? "text-red-500" : "text-green-600"}`}>
                  {t.pnl !== undefined ? `$${t.pnl.toFixed(2)}` : "--"}
                </td>
                <td className="p-2 text-sm">{t.tags?.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
