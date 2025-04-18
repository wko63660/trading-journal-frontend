import { useAuth } from "../context/AuthContext"
import NavItem from "./NavItem"

export default function Sidebar() {
  const { logout } = useAuth()

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 p-6 space-y-6 shadow-md h-screen sticky top-0">
      <div className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Trading Journal</div>

      <nav className="space-y-3">
        <NavItem to="/dashboard" label="Dashboard" />
        <NavItem to="/trades" label="All Trades" />
        <NavItem to="/trades/new" label="New Trade" />
        <NavItem to="/analytics" label="Analytics" />
      </nav>

      <button
        onClick={logout}
        className="mt-10 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded text-sm"
      >
        Logout
      </button>
    </aside>
  )
}
