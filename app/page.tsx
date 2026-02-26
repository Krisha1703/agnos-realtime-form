import Link from "next/link"

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-6">
      <h1 className="text-3xl font-bold text-gray-800">
        Agnos Real-Time Patient System
      </h1>

      <p className="text-gray-600 text-center max-w-md">
        This system allows patients to fill out their details in real-time
        while staff members monitor the information instantly.
      </p>

      <div className="flex gap-4">
        <Link
          href="/patient"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Patient Form
        </Link>

        <Link
          href="/staff"
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
        >
          Staff Dashboard
        </Link>
      </div>
    </main>
  )
}