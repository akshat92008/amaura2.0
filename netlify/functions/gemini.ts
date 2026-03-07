import { Handler } from '@netlify/functions';
import { GoogleGenAI } from '@google/genai';

export const handler: Handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { prompt, history } = JSON.parse(event.body || '{}');

    if (!prompt) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Prompt is required' }),
      };
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error('❌ Gemini Error: API key missing from process.env');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Gemini API key not configured on server' }),
      };
    }

    console.log('🤖 Gemini: Initializing client with key:', apiKey.substring(0, 8) + '...');
    const ai = new GoogleGenAI({ apiKey });
    
    console.log('🤖 Gemini: Generating content for prompt:', prompt.substring(0, 50) + '...');
    const result = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [...(history || []), { role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: "You are Amaura AI (Version 4.5), the core intelligence of the Amaura revenue engine. Your goal is to help businesses optimize their infrastructure, lead routing, and project fulfillment. Be professional, concise, and focused on revenue growth. Use markdown for formatting."
      }
    });

    const responseText = result.text || "I'm processing your request, but I couldn't generate a text response at this moment.";
    console.log('🤖 Gemini: Response received successfully');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ text: responseText }),
    };
  } catch (error: any) {
    console.error('❌ Gemini Function Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: error.message || 'Internal Server Error',
        details: error.toString()
      }),
    };
  }
};
