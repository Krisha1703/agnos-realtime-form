# 🏥 Real-Time Patient Registration & Staff Monitoring System

A modern, real-time hospital intake system built with **Next.js**, **Socket.IO**, and **AI-powered summary generation**.

This system allows patients to submit registration details while hospital staff monitor submissions live and generate AI-assisted intake summaries.

---

## 🚀 Overview

This project is a real-time patient intake and staff monitoring dashboard designed for clinical or hospital environments.

It enables:

* Live patient form submission
* Real-time updates for staff dashboard
* Required-field based completion tracking
* AI-generated registration summaries
* Multi-language support (English / Thai)
* Clean, scalable architecture

---

## 🧠 Core Features

### 👩‍⚕️ Patient Side

* Multi-step patient registration form
* Required vs optional field handling
* Live submission status
* Real-time socket sync

### 🖥️ Staff Dashboard

* Live patient monitoring
* Required-field completion tracking (accurate 100% logic)
* Submission timestamp with full date/time
* AI-powered intake summary generation
* Structured personal / contact / background sections
* Smooth animated progress bar

### 🌍 Internationalization

* Multi-language support using `next-intl`
* English 🇺🇸
* Thai 🇹🇭
* Dynamic re-render on language switch

### 🤖 AI Integration

* Secure API-based AI summary generation
* Natural paragraph-style hospital intake note
* Structured, concise, professional output

---

## 🏗️ Tech Stack

| Technology           | Purpose                 |
| -------------------- | ----------------------- |
| Next.js (App Router) | Frontend + API routes   |
| TypeScript           | Type safety             |
| Socket.IO            | Real-time communication |
| Framer Motion        | Animations              |
| Tailwind CSS         | Styling                 |
| next-intl            | Internationalization    |
| Groq / LLM API       | AI summary generation   |
| Lucide Icons         | UI icons                |

---

## 📂 Project Structure

```
app/
 ├── [locale]/
 │    ├── staff/
 │    ├── patient/
 │
 ├── api/
 │    └── generate-summary/
 │         └── route.ts

components/
 ├── control-buttons.tsx
 ├── info-card.tsx
 ├── input-field.tsx
 ├── patient-form.tsx
 ├── patient-section.tsx
 ├── section-header.tsx
 ├── select-field.tsx
 ├── staff-dashboard.tsx
 ├── status-indicator.tsx


context/
 └── socket-context.tsx
 ├── theme-context.tsx

hooks/
 └── use-inactivity.ts

i18n/
 └── request.ts

messages/
 ├── en.json
 └── th.json

utils/
 ├── helper-functions.ts
 └── validation.ts

types/
 └── patient.ts

server.ts

```
---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Krisha1703/agnos-realtime-form.git
cd agnos-realtime-form
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Create Environment Variables

Create a file:

```
.env.local
```

Add:

```
GROQ_API_KEY=your_api_key_here
```

Restart dev server after adding env variables.

---

### 4️⃣ Run Development Server

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

---

## 🔄 Real-Time Architecture

1. Patient fills form
2. Form emits data via Socket.IO
3. Staff dashboard listens via `staff-update`
4. Completion recalculates based only on required fields
5. Staff can generate AI summary via API route
6. AI returns structured paragraph summary

---

## 🌍 Internationalization

* Uses `next-intl`
* Locale-aware timestamps
* Dynamic language switching
* Field labels translated via JSON key mapping

Example:

```json
"fields": {
  "firstName": "ชื่อ",
  "dob": "วันเดือนปีเกิด"
}
```

---

## 📸 Demo

### 👩‍⚕️ Home Page
![Home Page](public/screenshots/home-page-en.png)

### 👩‍⚕️ Patient Form
![Patient Form EN](public/screenshots/patient-page-en.png)
![Patient Form TH](public/screenshots/patient-page-th.png)

### 🖥️ Staff Dashboard
![Staff Dashboard 1](public/screenshots/staff-page-1.png)
![Staff Dashboard 2](public/screenshots/staff-page-2.png)

---

# ⭐ Future Vision

This project can evolve into:

* A full hospital digital intake system
* AI-assisted triage assistant
* Cloud-based medical onboarding SaaS
* Enterprise-grade healthcare workflow platform

