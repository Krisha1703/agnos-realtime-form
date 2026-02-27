/* Helper functions for patient data processing and date formatting */

import { PatientData } from "../types/patient"; 

const REQUIRED_FIELDS: (keyof PatientData)[] = [
  "firstName",
  "lastName",
  "dob",
  "gender",
  "phone",

]
function calculateCompletion(patient: PatientData) {
  const total = REQUIRED_FIELDS.length

  const filled = REQUIRED_FIELDS.filter((field) => {
    const value = patient[field]
    return value !== undefined && value !== null && value !== ""
  }).length

  return Math.round((filled / total) * 100)
}

/* -------------------------------------------------- */
/* Date Formatter (Locale Aware) */
/* -------------------------------------------------- */

function formatDateTime(locale: string) {
  return new Date().toLocaleString(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })
}

export { calculateCompletion, formatDateTime, REQUIRED_FIELDS }