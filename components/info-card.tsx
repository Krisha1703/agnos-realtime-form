/* InfoCard Component */

export default function InfoCard({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
      <p className="text-sm uppercase opacity-60 mb-2 info-label">{label}</p>
      <div className="text-md font-medium">{children}</div>
    </div>
  )
}