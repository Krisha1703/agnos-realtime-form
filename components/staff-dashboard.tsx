/* Staff Dashboard Page */

"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; 
import { PatientData } from "@/types/patient";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import StatusIndicator from "./status-indicator";
import ControlButtons from "./control-buttons";
import { User, Phone, Shield, Sparkles } from "lucide-react";
import InfoCard from "./info-card";
import PatientSection from "./patient-section";
import { calculateCompletion, formatDateTime } from "@/utils/helper-functions";

export default function StaffDashboard() {
  const t = useTranslations("Staff");
  const locale = useLocale();

  const [patient, setPatient] = useState<PatientData | null>(null);
  const [lastUpdated, setLastUpdated] = useState("");
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);
  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);

  useEffect(() => {
    const channel = supabase
      .channel("patients-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "patients",
        },
        (payload) => {
          const row = payload.new as any;
          console.log("Realtime payload:", payload);

          if (!row) return;

          const mappedPatient: PatientData = {
            firstName: row.first_name,
            middleName: row.middle_name,
            lastName: row.last_name,
            dob: row.dob,
            gender: row.gender,
            phone: row.phone,
            email: row.email,
            address: row.address,
            language: row.preferred_language,
            nationality: row.nationality,
            religion: row.religion,
            emergencyName: row.emergency_name,
            emergencyRelation: row.emergency_relationship,
            status: row.status,
          };

          setPatient(mappedPatient);
          setLastUpdated(formatDateTime(locale));

          if (row.status === "submitted") {
            setSubmittedAt(formatDateTime(locale));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [locale]);

  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-xl text-center">
          <h2 className="text-xl font-semibold">
            {t("waitingTitle")}
          </h2>
          <p className="text-gray-500 mt-2">
            {t("waitingDescription")}
          </p>
        </div>
      </div>
    );
  }

  const completion = calculateCompletion(patient);

  const generateSummary = async () => {
    setLoadingSummary(true);

    try {
      const res = await fetch("/api/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patient),
      });

      const data = await res.json();
      setSummary(data.summary || "");
    } catch (error) {
      console.error("Summary error:", error);
    } finally {
      setLoadingSummary(false);
    }
  };

  return (
    <main className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-5xl mx-auto space-y-10 bg-white form-modal rounded-2xl shadow-xl p-10">

        <ControlButtons />

        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold">{t("title")}</h1>
          <p className="text-gray-500 mt-1">{t("subtitle")}</p>
        </div>

        {/* Top Layout */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-6 flex-1">

            <InfoCard label={t("currentStatus")}>
              <StatusIndicator status={patient.status} />
            </InfoCard>

            <InfoCard label={t("lastUpdated")}>
              {lastUpdated}
            </InfoCard>

            <InfoCard label={t("completion")}>
              <div>
                <div className="font-semibold">{completion}%</div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${completion}%` }}
                    transition={{ duration: 0.6 }}
                    className="bg-emerald-500 h-2 rounded-full"
                  />
                </div>
              </div>
            </InfoCard>

            <InfoCard label={t("submittedAt")}>
              {submittedAt || t("notSubmitted")}
            </InfoCard>

          </div>

          {/* AI Summary */}
          <div className="flex-1 bg-white summary p-8 rounded-2xl shadow-lg flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Sparkles size={18} />
                {t("aiSummary")}
              </h2>

              <button
                onClick={generateSummary}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer text-sm hover:bg-blue-700 transition"
              >
                {loadingSummary ? t("generating") : t("generateSummary")}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto text-sm text-gray-700 whitespace-pre-line">
              {summary || t("noSummary")}
            </div>
          </div>

        </div>

        {/* Patient Sections */}
        <PatientSection
          icon={<User />}
          title={t("sections.personal")}
          t={t}
          data={{
            firstName: patient.firstName,
            lastName: patient.lastName,
            dob: patient.dob,
            gender: patient.gender,
          }}
        />

        <PatientSection
          icon={<Phone />}
          title={t("sections.contact")}
          t={t}
          data={{
            phone: patient.phone,
            email: patient.email,
            address: patient.address,
            language: patient.language,
          }}
        />

        <PatientSection
          icon={<Shield />}
          title={t("sections.background")}
          t={t}
          data={{
            nationality: patient.nationality,
            religion: patient.religion,
            emergencyName: patient.emergencyName,
            emergencyRelation: patient.emergencyRelation,
          }}
        />

      </div>
    </main>
  );
}