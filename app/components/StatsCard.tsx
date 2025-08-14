interface StatsCardProps {
  title: string
  value: string
  icon: React.ReactNode
  change: string
  positive: boolean
}

export default function StatsCard({ title, value, icon, change, positive }: StatsCardProps) {
  return (
    <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-primary-500 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="text-gray-400">{icon}</div>
        <div className={`text-sm font-medium ${
          positive ? 'text-green-400' : 'text-red-400'
        }`}>
          {change}
        </div>
      </div>
      <div>
        <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  )
}
