
import { GoogleGenAI } from "@google/genai";

// Always initialize with the apiKey from process.env.API_KEY directly
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getPartyRecommendation = async (childAge: number, numChildren: number, interests: string) => {
  const prompt = `Un pare vol celebrar un aniversari al nostre parc de boles "Juga i Celebra" situat a Algemesí. 
  El seu fill té ${childAge} anys, vindran uns ${numChildren} nens i els agrada: ${interests}. 
  Recomana quin dels nostres packs (Bàsic 14€ o VIP 18€) li convé més i suggereix una temàtica divertida. 
  Respon de forma amable i entusiasta en valencià. Sigues concís.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: prompt }] }],
    });
    
    // Using .text property directly as it is a getter in GenerateContentResponse
    return response.text || "Ho sento, no he pogut calcular la teva recomanació. Truca'ns!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "¡Oups! Alguna cosa ha fallat. Per favor, contacta amb nosaltres directament.";
  }
};
