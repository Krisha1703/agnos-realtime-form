"use client"

import { useState, useEffect, ChangeEvent, FormEvent, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useSocket } from "@/context/socket-context";
import { PatientData } from "@/types/patient";
import { patientSchema } from "@/utils/validation";
import InputField from "./input-field";
import SelectField from "./select-field";
import useInactivity from "@/hooks/use-inactivity";
import ControlButtons from "./control-buttons";
import { User, Phone, Shield } from "lucide-react";
import SectionHeader from "./section-header";

export default function PatientForm() {
  const t = useTranslations("Patient");
  const { socket } = useSocket();

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const initialState: PatientData = {
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    language: "",
    nationality: "",
    religion: "",
    emergencyName: "",
    emergencyRelation: "",
    status: "active"
  }

  const [data, setData] = useState(initialState);

  useInactivity(10000, () =>
    setData((prev) => ({ ...prev, status: "inactive" }))
  )

  useEffect(() => {
    if (socket) socket.emit("patient-update", data)
  }, [data, socket])

  /* ---------------- Field Change ---------------- */

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value, status: "active" }))

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev }
        delete updated[name]
        return updated
      })
    }
  }

  /* ---------------- Step Validation ---------------- */

  const validateStep = () => {
    const stepRequired: Record<number, string[]> = {
      1: ["firstName", "lastName", "dob", "gender"],
      2: ["phone", "email", "address", "language"],
      3: ["nationality"]
    }

    const requiredFields = stepRequired[step]
    const newErrors: Record<string, string> = {}

    requiredFields.forEach((field) => {
      if (!(data as any)[field]) {
        newErrors[field] = t("validation.required")
      }
    })

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1)
    }
  }

  const prevStep = () => setStep((prev) => prev - 1)

  /* ---------------- Submit ---------------- */

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result = patientSchema.safeParse(data)
    if (!result.success) return

    setData((prev) => ({ ...prev, status: "submitted" }))
    setSubmitted(true)
  }

  /* ---------------- Progress ---------------- */

  const requiredFields = [
    "firstName",
    "lastName",
    "dob",
    "gender",
    "phone",
    "email",
    "address",
    "language",
    "nationality"
  ]

  const progress = useMemo(() => {
    const filled = requiredFields.filter(
      (field) => (data as any)[field]
    ).length
    return Math.round((filled / requiredFields.length) * 100)
  }, [data])

  /* ---------------- UI ---------------- */

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <section className="w-full max-w-5xl bg-white form-modal rounded-2xl shadow-xl p-10">

        <ControlButtons />

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold">
            {t("formTitle")}
          </h1>
          <p className="text-gray-500 mt-2">
            {t("formDescription")}
          </p>

          {/* Progress */}
          <div className="mt-6">
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="relative overflow-hidden">

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >

              {/* STEP 1 */}
              {step === 1 && (
                <>
                  <SectionHeader
                    step={1}
                    title={t("steps.personal.title")}
                    description={t("steps.personal.description")}
                    icon={<User />}
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <InputField label={t("fields.firstName")} name="firstName" required value={data.firstName} onChange={handleChange} error={errors.firstName}/>
                    <InputField label={t("fields.middleName")} name="middleName" value={data.middleName || ""} onChange={handleChange}/>
                    <InputField label={t("fields.lastName")} name="lastName" required value={data.lastName} onChange={handleChange} error={errors.lastName}/>
                    <InputField type="date" label={t("fields.dob")} name="dob" required value={data.dob} onChange={handleChange} error={errors.dob}/>
                    <SelectField label={t("fields.gender")} name="gender" required value={data.gender} options={[t("gender.male"), t("gender.female"), t("gender.other")]} onChange={handleChange} error={errors.gender}/>
                  </div>
                </>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <>
                  <SectionHeader
                    step={2}
                    title={t("steps.contact.title")}
                    description={t("steps.contact.description")}
                    icon={<Phone />}
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <InputField label={t("fields.phone")} name="phone" required value={data.phone} onChange={handleChange} error={errors.phone}/>
                    <InputField label={t("fields.email")} name="email" required value={data.email} onChange={handleChange} error={errors.email}/>
                    <InputField label={t("fields.address")} name="address" required value={data.address} onChange={handleChange} error={errors.address}/>
                    <InputField label={t("fields.language")} name="language" required value={data.language} onChange={handleChange} error={errors.language}/>
                  </div>
                </>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <>
                  <SectionHeader
                    step={3}
                    title={t("steps.background.title")}
                    description={t("steps.background.description")}
                    icon={<Shield />}
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <InputField label={t("fields.nationality")} name="nationality" required value={data.nationality} onChange={handleChange} error={errors.nationality}/>
                    <InputField label={t("fields.religion")} name="religion" value={data.religion || ""} onChange={handleChange}/>
                    <InputField label={t("fields.emergencyName")} name="emergencyName" value={data.emergencyName || ""} onChange={handleChange}/>
                    <InputField label={t("fields.emergencyRelation")} name="emergencyRelation" value={data.emergencyRelation || ""} onChange={handleChange}/>
                  </div>
                </>
              )}

            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-10">
            {step > 1 && (
              <button type="button" onClick={prevStep} className="px-6 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg">
                {t("back")}
              </button>
            )}

            {step < 3 ? (
              <button type="button" onClick={nextStep} className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg">
                {t("next")}
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading || submitted}
                className={`ml-auto px-6 py-2 text-white rounded-lg transition-all duration-300
                  ${submitted ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"}
                `}
              >
                {submitted ? t("submitted") : t("submit")}
              </button>
            )}
          </div>

        </form>
      </section>
    </main>
  )
}