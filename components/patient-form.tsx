/* Patient Form Component */

"use client";
import { useState, useEffect, ChangeEvent, FormEvent, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { v4 as uuidv4 } from "uuid";

import { PatientData } from "@/types/patient";
import { patientSchema } from "@/utils/validation";
import { supabase } from "@/lib/supabase";

import InputField from "./input-field";
import SelectField from "./select-field";
import ControlButtons from "./control-buttons";
import SectionHeader from "./section-header";
import useInactivity from "@/hooks/use-inactivity";
import { User, Shield, Phone } from "lucide-react";

export default function PatientForm() {
  const t = useTranslations("Patient");
  const [patientId] = useState(uuidv4());

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

  const [data, setData] = useState(initialState)

  useInactivity(10000, () =>
    setData(prev => ({ ...prev, status: "inactive" }))
  )

  useEffect(() => {
    const save = async () => {
      await supabase.from("patients").upsert({
        id: patientId,
        first_name: data.firstName,
        middle_name: data.middleName,
        last_name: data.lastName,
        dob: data.dob || null,
        gender: data.gender,
        phone: data.phone,
        email: data.email,
        address: data.address,
        preferred_language: data.language,
        nationality: data.nationality,
        religion: data.religion,
        emergency_name: data.emergencyName,
        emergency_relationship: data.emergencyRelation,
        status: data.status,
        submitted,
        updated_at: new Date()
      })
    }

    save()
  }, [data, submitted, patientId])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value, status: "active" }))

    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev }
        delete copy[name]
        return copy
      })
    }
  }

  const validateStep = () => {
    const stepRequired: Record<number, string[]> = {
      1: ["firstName", "lastName", "dob", "gender"],
      2: ["phone", "email", "address", "language"],
      3: ["nationality"]
    }

    const required = stepRequired[step]
    const newErrors: Record<string, string> = {}

    required.forEach(field => {
      if (!(data as any)[field]) {
        newErrors[field] = t("validation.required")
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => validateStep() && setStep(prev => prev + 1)
  const prevStep = () => setStep(prev => prev - 1)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result = patientSchema.safeParse(data)
    if (!result.success) return

    setLoading(true)

    await supabase
      .from("patients")
      .update({
        submitted: true,
        status: "submitted",
        updated_at: new Date()
      })
      .eq("id", patientId)

    setSubmitted(true)
    setLoading(false)
  }

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
      field => (data as any)[field]
    ).length
    return Math.round((filled / requiredFields.length) * 100)
  }, [data])


  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <section className="w-full max-w-5xl form-modal bg-white rounded-2xl shadow-xl p-10">

        <ControlButtons />

        <header className="mb-8">
          <h1 className="md:text-3xl text-xl font-bold">{t("formTitle")}</h1>
          <p className="text-gray-500 mt-2">{t("formDescription")}</p>

          <div className="mt-6">
            <div className="w-full bg-gray-200 md:h-3 h-2 rounded-full">
              <div
                className="bg-blue-600 md:h-3 h-2 rounded-full transition-all"
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
                    icon={<User size={36}/>}
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