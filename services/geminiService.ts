import { GoogleGenAI } from "@google/genai";
import { PAPER_CONFIG } from "../constants";

const getClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is not set in environment variables");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const askPaperAgent = async (question: string): Promise<string> => {
  try {
    const ai = getClient();
    const systemInstruction = `
      You are a specialized scientific research assistant for the paper titled "${PAPER_CONFIG.title}".
      
      CONTEXT OF THE PAPER:
      ${PAPER_CONFIG.paperContext}

      YOUR ROLE:
      1. Answer questions strictly based on the scientific content of the paper provided above.
      2. If the answer is not in the context, explicitly state that the paper does not cover that aspect, but you can offer general scientific knowledge if requested.
      3. Be concise, professional, and encouraging. Use scientific terminology where appropriate but explain complex concepts.
      4. Format your response using Markdown.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: question,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.3, // Low temperature for factual accuracy based on the text
      },
    });

    return response.text || "I could not generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to the AI research assistant. Please check your API key or try again later.";
  }
};