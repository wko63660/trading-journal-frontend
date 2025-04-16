type NavItem = {
    label: string
    active?: boolean
}

export default function NavItem({ label, active = false }: NavItem) {
    return (
        <div
            className={`px-3 py-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${
                active ? "bg-gray-200 dark:bg-gray-700 font-semibold" : ""
            }`}
        >
            {label}
        </div>
    )
}