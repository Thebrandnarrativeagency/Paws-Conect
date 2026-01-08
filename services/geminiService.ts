
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function askDrPaws(question: string, petContext?: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User Question: ${question}
      ${petContext ? `Pet Context: ${petContext}` : ''}`,
      config: {
        systemInstruction: "You are 'Dr. Paws', a friendly, knowledgeable AI veterinary assistant for the Paws Connect app. CRITICAL: This app is EXCLUSIVELY for Dogs and Cats. If the user asks about birds, reptiles, or any other animals, politely inform them that you are a specialist in canine and feline health only. Always include a medical disclaimer. Use dog/cat emojis. Keep answers concise.",
        temperature: 0.7,
      },
    });
    return response.text || "I'm having a catnap... please try again! 🐾";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a bit of a nap right now. Please try again later! 🐾";
  }
}
