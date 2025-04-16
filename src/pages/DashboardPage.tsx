import { useAuth } from "../context/AuthContext"
import StatCard from "../components/StatCard"
import NavItem from "../components/NavItem"
import { useState, useEffect } from "react"
import { getDashboardsStats } from "../services/getDashboardsStats"
import { DashboardData } from "../types/Dashboard"

export default function DashboardPage() {
  const { logout } = useAuth()
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
    <div className="w-full min-h-screen flex bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 p-6 space-y-4 shadow-md flex flex-col justify-between">
        <div>
          <div className="text-2xl font-bold mb-6">Trading Journal</div>
          <nav className="space-y-2 text-gray-700 dark:text-gray-200">
            <NavItem label="Dashboard" active />
            <NavItem label="Calendar" />
            <NavItem label="Reports" />
            <NavItem label="Trades" />
            <NavItem label="Journal" />
            <NavItem label="Notebook" />
            <NavItem label="New Trade" />
          </nav>
        </div>
        <div className="text-sm text-center">
          <button
            onClick={logout}
            className="mt-2 w-full bg-red-500 text-white py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-12 py-10 w-full">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">May, 2024</p>
          </div>
          <button className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-1 rounded">
            Edit layout
          </button>
        </header>

        {/* Daily PnL Cards */}
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

        {/* Stat Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Profit Factor" value={stats.profitFactor} />
          <StatCard title="Winning vs Losing Trades" value={stats.winVsLoss} />
          <StatCard title="Average Win/Loss R:R" value={stats.winLossRatio} />
          <StatCard title="Avg Holding Time" value={stats.avgHoldingTime} />
        </section>
      </main>
    </div>
  )
}
