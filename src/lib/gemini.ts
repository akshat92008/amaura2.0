import { Client } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const client = new Client({ apiKey });

export const getGeminiResponse = async (prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) => {
  try {
    const response = await client.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [...history, { role: 'user', parts: [{ text: prompt }] }],
      systemInstruction: "You are Amaura AI (Version 4.5), the core intelligence of the Amaura revenue engine. Your goal is to help businesses optimize their infrastructure, lead routing, and project fulfillment. Be professional, concise, and focused on revenue growth. Use markdown for formatting."
    });

    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm experiencing a neural sync delay. Please try again in a moment.";
  }
};
