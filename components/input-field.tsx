/* Input Field Component */

export default function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  error,
  className = ""
}: any) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="mb-1 text-sm font-semibold label">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`border rounded-lg input px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />

      {error && (
        <span className="text-red-500 text-sm mt-1">{error}</span>
      )}
    </div>
  )
}