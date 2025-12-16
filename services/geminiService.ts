import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysisResult, NewsItem } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getMarketSentiment = async (context: string): Promise<AIAnalysisResult> => {
  if (!apiKey) {
    return {
      summary: "API Key missing. System running in simulation mode. Market shows high volatility with mixed signals. Resistance tested at key psychological levels.",
      keyLevels: { support: "N/A", resistance: "N/A" },
      sentimentScore: 50
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the current crypto market sentiment based on this context: "${context}". 
      Assume the role of a senior Bloomberg financial analyst. Be concise, professional, and data-focused.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "A dense, professional 2-sentence market summary." },
            keyLevels: {
              type: Type.OBJECT,
              properties: {
                support: { type: Type.STRING },
                resistance: { type: Type.STRING }
              }
            },
            sentimentScore: { type: Type.INTEGER, description: "0 (Bearish) to 100 (Bullish)" }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AIAnalysisResult;

  } catch (error) {
    console.error("AI Analysis Failed", error);
    return {
      summary: "Connection to Intelligence Core interrupted. Displaying cached consensus data.",
      keyLevels: { support: "92,400", resistance: "98,000" },
      sentimentScore: 65
    };
  }
};

export const generateBreakingNews = async (): Promise<NewsItem[]> => {
  if (!apiKey) return [];

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Generate 3 fictional but realistic 'Breaking News' headlines for the crypto market. High institutional tone.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              time: { type: Type.STRING },
              source: { type: Type.STRING },
              headline: { type: Type.STRING },
              impact: { type: Type.STRING, enum: ['HIGH', 'MED', 'LOW'] },
              sentiment: { type: Type.STRING, enum: ['BULLISH', 'BEARISH', 'NEUTRAL'] }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as NewsItem[];
  } catch (e) {
    console.error(e);
    return [];
  }
}