/* Patient Section Component */

import { PatientData } from "@/types/patient"
import { REQUIRED_FIELDS } from "@/utils/helper-functions"

export default function PatientSection({
  title,
  icon,
  data,
  t,
}: {
  title: string
  icon: React.ReactNode
  data: Record<string, any>
  t: any
}) {
  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-blue-600">{icon}</div>
        <h2 className="text-xl font-semibold info-label">{title}</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(data).map(([key, value]) => {
          const isRequired = REQUIRED_FIELDS.includes(
            key as keyof PatientData
          )

          return (
            <div key={key}>
              <p className="text-xs info-label uppercase opacity-60">
                {t(`fields.${key}`)}
                {isRequired && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </p>
              <p className="font-medium info-label">
                {value ? String(value) : "—"}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}