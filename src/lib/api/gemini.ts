import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyBV5ujlARcPaMqXxr8Yl6gGrSbYpHRWciQ" });

export async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Please make a sentence using words [take it easy] and give me a Japanese-transrated sentence.",
  });
  console.log(response.text);
}

main();
