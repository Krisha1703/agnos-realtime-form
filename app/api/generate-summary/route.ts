// This API route receives patient data from the frontend, 
// constructs a prompt for the Groq LLM, and returns a concise medical intake summary 
// based on the provided patient information.

import { NextResponse } from "next/server"
import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
})

export async function POST(req: Request) {
  try {
    const patient = await req.json()

   const prompt = `
        You are a hospital intake AI assistant.

        Based on the patient data below, write a realistic, professional medical intake summary in a natural paragraph format (NOT bullet points and NOT section headings).

        The summary should read like a clinician’s note and flow naturally in complete sentences.

        Guidelines:
        - Begin by introducing the patient with name, age, gender, and nationality if available.
        - Include contact details naturally in sentence form.
        - The summary should be concise and include all information from the patient data, but avoid listing fields. Instead, weave the details into a coherent narrative.
        - Keep the tone clinical, professional, and human-like.
        - Do NOT use headings, bullet points, or labels like "Patient Overview".
        - Write everything as one cohesive paragraph.

        ${JSON.stringify(patient, null, 2)}
    `;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "You generate concise hospital registration notes in a single professional paragraph without greetings, bullet points, or formatting." },
        { role: "user", content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 400,
    })

    return NextResponse.json({
      summary: completion.choices[0].message.content
    })

  } catch (error) {
    console.error("Groq Error:", error)

    return NextResponse.json({
      summary: "Error generating summary."
    })
  }
}