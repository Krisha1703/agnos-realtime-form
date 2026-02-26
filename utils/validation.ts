import { z } from "zod"

export const patientSchema = z.object({
  firstName: z.string().min(1, "First name required"),
  lastName: z.string().min(1, "Last name required"),
  dob: z.string().min(1, "Date of birth required"),
  gender: z.string().min(1, "Gender required"),
  phone: z.string().regex(/^[0-9+\-() ]+$/, "Invalid phone"),
  email: z.string().email("Invalid email"),
  address: z.string().min(1, "Address required"),
  language: z.string().min(1, "Preferred language required"),
  nationality: z.string().min(1, "Nationality required")
})