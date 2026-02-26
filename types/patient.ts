export type PatientStatus = "active" | "inactive" | "submitted"

export interface PatientData {
  firstName: string
  middleName?: string
  lastName: string
  dob: string
  gender: string
  phone: string
  email: string
  address: string
  language: string
  nationality: string
  emergencyName?: string
  emergencyRelation?: string
  religion?: string
  status: PatientStatus
}