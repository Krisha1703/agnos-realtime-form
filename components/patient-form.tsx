"use client"

import { useState, useEffect } from "react"
import { useSocket } from "@/context/socket-context"
import { PatientData } from "@/types/patient"
import { patientSchema } from "@/utils/validation"
import InputField from "./input-field"
import SelectField from "./select-field"
import useInactivity from "@/hooks/use-inactivity"

import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { useLocale } from "next-intl"

export default function PatientForm() {
  const { socket } = useSocket()
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const locale = useLocale()

  const [data, setData] = useState<PatientData>({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    language: "",
    nationality: "",
    status: "active"
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  // Inactivity → mark inactive
  useInactivity(10000, () =>
    setData((prev) => ({ ...prev, status: "inactive" }))
  )

  // Realtime socket update
  useEffect(() => {
    if (socket) socket.emit("patient-update", data)
  }, [data, socket])

  const handleChange = (e: any) => {
    const { name, value } = e.target

    setData({ ...data, [name]: value, status: "active" })

    // 🔥 Clear error in real-time when fixed
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev }
        delete updated[name]
        return updated
      })
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setLoading(true)

    const result = patientSchema.safeParse(data)

    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message
      })
      setErrors(fieldErrors)
      setToast({ message: "Please fix the highlighted fields.", type: "error" })
      setLoading(false)
      return
    }

    setErrors({})
    setData({ ...data, status: "submitted" })
    setToast({ message: "Form submitted successfully!", type: "success" })
    setLoading(false)

    setTimeout(() => setToast(null), 3000)
  }

  const switchLanguage = (lang: string) => {
    router.push(`/${lang}/patient`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-5xl form-modal rounded-2xl shadow-xl p-8 transition-all duration-300">

        {/* Top Controls */}
        <div className="flex justify-between items-center mb-6">
          {/* Theme Toggle */}
          <button
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm shadow"
          >
            {theme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>

          {/* Language Switch */}
          <div className="space-x-2">
            <button
              onClick={() => switchLanguage("en")}
              className={`px-3 py-1 rounded text-sm ${
                locale === "en"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              EN
            </button>

            <button
              onClick={() => switchLanguage("th")}
              className={`px-3 py-1 rounded text-sm ${
                locale === "th"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              TH
            </button>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold  mb-2">
          Patient Registration
        </h1>
        <p className=" mb-8">
          Please provide your details below. All required fields must be completed.
        </p>

        <form
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          onSubmit={handleSubmit}
        >
          {/* First Name */}
          <InputField
            label="First Name"
            name="firstName"
            value={data.firstName}
            required
            onChange={handleChange}
            error={errors.firstName}
          />

          {/* Middle Name (Optional) */}
          <InputField
            label="Middle Name"
            name="middleName"
            value={data.middleName || ""}
            onChange={handleChange}
            error={errors.middleName}
          />

          {/* Last Name */}
          <InputField
            label="Last Name"
            name="lastName"
            value={data.lastName}
            required
            onChange={handleChange}
            error={errors.lastName}
          />

          {/* Date of Birth */}
          <InputField
            label="Date of Birth"
            type="date"
            name="dob"
            value={data.dob}
            required
            onChange={handleChange}
            error={errors.dob}
          />

          {/* Gender */}
          <SelectField
            label="Gender"
            name="gender"
            value={data.gender}
            options={["Male", "Female", "Other"]}
            required
            onChange={handleChange}
            error={errors.gender}
          />

          {/* Phone */}
          <InputField
            label="Phone Number"
            name="phone"
            value={data.phone}
            required
            onChange={handleChange}
            error={errors.phone}
          />

          {/* Email */}
          <InputField
            label="Email Address"
            name="email"
            value={data.email}
            required
            onChange={handleChange}
            error={errors.email}
          />

          {/* Address (Full Width) */}
          <InputField
            label="Address"
            name="address"
            value={data.address}
            required
            onChange={handleChange}
            error={errors.address}
            className="md:col-span-2"
          />

          {/* Language */}
          <InputField
            label="Preferred Language"
            name="language"
            value={data.language}
            required
            onChange={handleChange}
            error={errors.language}
          />

          {/* Nationality */}
          <InputField
            label="Nationality"
            name="nationality"
            value={data.nationality}
            required
            onChange={handleChange}
            error={errors.nationality}
          />

          {/* Religion (Optional) */}
          <InputField
            label="Religion"
            name="religion"
            value={data.religion || ""}
            onChange={handleChange}
            error={errors.religion}
          />

          {/* Emergency Contact Name */}
          <InputField
            label="Emergency Contact Name"
            name="emergencyName"
            value={data.emergencyName || ""}
            onChange={handleChange}
            error={errors.emergencyName}
          />

          {/* Emergency Contact Relation */}
          <InputField
            label="Emergency Contact Relation"
            name="emergencyRelation"
            value={data.emergencyRelation || ""}
            onChange={handleChange}
            error={errors.emergencyRelation}
          />

          {/* Submit Button */}
          <div className="md:col-span-1 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit Form"}
            </button>
          </div>
        </form>

        {/* Toast */}
        {toast && (
          <div
            className={`fixed bottom-6 right-6 px-6 py-4 rounded-xl shadow-lg text-white transition-all duration-300 ${
              toast.type === "success"
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >
            {toast.message}
          </div>
        )}
      </div>
    </div>
  )
}