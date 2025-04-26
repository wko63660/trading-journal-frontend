import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
import { Trade } from "../components/TradeTable/Trade.types"

export default function TradesPage() {
  const [trades, setTrades] = useState<Trade[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await api.get("/trades")
        console.log("Fetched trades:", response.data)
        setTrades(response.data)
      } catch (err) {
        console.error("Failed to fetch trades", err)
      } finally {
        setLoading(false)
      }
    }
    fetchTrades()
  }, [])

  const handleRowClick = (tradeId: number) => {
    navigate(`/trades/${tradeId}`)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">My Trades</h1>

      {loading ? (
        <div className="text-center text-gray-500 text-lg">Loading trades...</div>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="min-w-full table-auto bg-white dark:bg-gray-800 border rounded-lg">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase text-sm">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Symbol</th>
                <th className="p-3 text-left">Side</th>
                <th className="p-3 text-left">Entry Price</th>
                <th className="p-3 text-left">Exit Price</th>
                <th className="p-3 text-left">Volume</th>
                <th className="p-3 text-left">P&L</th>
                <th className="p-3 text-left">Tags</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((t) => (
                <tr
                  key={t.id}
                  onClick={() => handleRowClick(t.id)}
                  className="border-t hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition"
                >
                  <td className="p-3">{t.entryDateTime?.split("T")[0] || "--"}</td>
                  <td className="p-3 font-semibold">{t.symbol}</td>
                  <td className="p-3">{t.side}</td>
                  <td className="p-3">${t.entryPrice.toFixed(2)}</td>
                  <td className="p-3">{t.exitPrice ? `$${t.exitPrice.toFixed(2)}` : "--"}</td>
                  <td className="p-3">{t.quantity || "--"}</td>
                  <td className={`p-3 font-semibold ${t.pnl && t.pnl < 0 ? "text-red-500" : "text-green-600"}`}>
                    {t.pnl !== undefined ? `$${Number(t.pnl).toFixed(2)}` : "--"}
                  </td>
                  <td className="p-3">{t.tags?.join(", ") || "--"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
