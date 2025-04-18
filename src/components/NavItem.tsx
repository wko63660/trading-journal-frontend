import { NavLink } from "react-router-dom"

interface NavItemProps {
  to: string
  label: string
}

export default function NavItem({ to, label }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-3 py-2 rounded text-sm font-medium ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
        }`
      }
    >
      {label}
    </NavLink>
  )
}
