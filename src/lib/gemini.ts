import { GoogleGenerativeAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  systemInstruction: "You are Amaura AI (Version 4.5), the core intelligence of the Amaura revenue engine. Your goal is to help businesses optimize their infrastructure, lead routing, and project fulfillment. Be professional, concise, and focused on revenue growth. Use markdown for formatting."
});

export const getGeminiResponse = async (prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) => {
  try {
    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm experiencing a neural sync delay. Please try again in a moment.";
  }
};
