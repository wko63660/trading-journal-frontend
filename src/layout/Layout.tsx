import Sidebar from "../components/Sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 px-6 py-6 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
