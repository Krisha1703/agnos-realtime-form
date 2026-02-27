/* Status Indicator Component */

interface Props {
  status: "active" | "inactive" | "submitted"
}

export default function StatusIndicator({ status }: Props) {
  const styles = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-yellow-100 text-yellow-700",
    submitted: "bg-blue-100 text-blue-700"
  }

  const labels = {
    active: "Active",
    inactive: "Inactive",
    submitted: "Submitted"
  }

  return (
    <span
      className={`px-4 py-1 rounded-full text-sm font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  )
}