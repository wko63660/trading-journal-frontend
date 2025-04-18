import { useAuth } from "../context/AuthContext"
import StatCard from "../components/StatCard"
import { useState, useEffect } from "react"
import { getDashboardsStats } from "../services/getDashboardsStats"
import { DashboardData } from "../types/Dashboard"

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardData | null>(null)

  useEffect(() => {
    getDashboardsStats()
      .then((res) => {
        setStats(res)
      })
      .catch((err) => {
        console.error("Failed to fetch dashboard stats", err)
      })
  }, [])

  if (!stats) {
    return (
      <div className="p-10 text-center text-gray-500 dark:text-gray-400">
        Loading dashboard...
      </div>
    )
  }

  return (
    <div className="flex w-full min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">April, 2025</p>
          </div>
          <button className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-1 rounded">
            Edit layout
          </button>
        </header>

        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
          {stats.days.map((d, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center"
            >
              <div className="text-sm text-gray-500">{d.day}</div>
              <div
                className={`text-lg font-semibold ${
                  d.pnl >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {d.pnl >= 0 ? "+" : "-"}${Math.abs(d.pnl / 1000).toFixed(2)}k
              </div>
              <div className="text-xs text-gray-400">{d.trades} trades</div>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Profit Factor" value="1.24" />
          <StatCard title="Winning vs Losing Trades" value="60% win" />
          <StatCard title="Average Win/Loss R:R" value="1.5" />
        </section>
      </div>
    </div>
  )
}
