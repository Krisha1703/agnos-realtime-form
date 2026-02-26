import React from "react"

interface Props {
  label: string
  name: string
  value: string
  options: string[]
  required?: boolean
  error?: string
  className?: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function SelectField({
  label,
  name,
  value,
  options,
  required = false,
  error,
  className = "",
  onChange
}: Props) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="mb-1 text-sm font-semibold label">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <select
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        className={`border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200 ${
          error
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-300"
        }`}
      >
        <option value="" disabled>
          Select {label}
        </option>

        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {error && (
        <span className="text-red-500 text-sm mt-1">{error}</span>
      )}
    </div>
  )
}