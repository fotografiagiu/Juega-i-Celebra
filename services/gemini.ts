
import { GoogleGenAI } from "@google/genai";

export const getPartyRecommendation = async (childAge: number, numChildren: number, interests: string) => {
  // Always create a new instance right before making an API call to ensure latest API key is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Un padre/madre quiere celebrar un cumpleaños en nuestro parque de bolas "Juga i Celebra" situado en Algemesí. 
  Su hijo/a tiene ${childAge} años, vendrán unos ${numChildren} niños y les gusta: ${interests}. 
  Recomienda cuál de nuestros packs o tipos de alquiler le conviene más basándote en que tenemos:
  - Lunes a Jueves: 80€
  - Viernes/Tardes Finde: 150€
  - Finde Completo: 200€
  Sugiere una temática divertida. Responde de forma amable y entusiasta en español de España. Sé conciso.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    // Correctly access .text property
    return response.text || "Lo siento, no he podido calcular tu recomendación. ¡Llámanos!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "¡Ups! Algo ha fallado. Por favor, contacta con nosotros directamente.";
  }
};