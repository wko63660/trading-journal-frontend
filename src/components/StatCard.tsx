type StatCardProps = {
    title: string
    value: string | number
    color?: string
  }
  
  export default function StatCard({ title, value, color = "text-blue-500" }: StatCardProps) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
      </div>
    )
  }
  