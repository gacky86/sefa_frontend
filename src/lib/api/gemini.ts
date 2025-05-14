import axios from "axios"
import { SearchMode, CardQA, dictionaryRes } from "interfaces/index";

const generateSentence = async (systemInstruction: string, text: string) => {

  return axios.post('http://localhost:3000/api/gemini/generate_sentence',{
    system_instruction: systemInstruction,
    text: text},
    { headers: {"Content-Type": "application/json"}}
  );
}


export const generateCardQAByGemini = async (
  learningMode: 'input'|'output',
  japanese: string,
  english: string): Promise<CardQA | undefined> => {
  try {
    const res = await generateSentence("次の英単語を次の日本語の意味で使い、ランダムな英文とその日本語訳を作成してください。次のJSON schemaで出力してください。{\"type\":\"object\",\"properties\":{\"english\":{\"type\":\"string\"},\"english\":{\"type\":\"string\"}}}",
      `${english}, ${japanese}`);
    const parsedResult = JSON.parse(res.data.result);

    switch (learningMode) {
      case 'input':
        return { question: parsedResult.english, answer: parsedResult.japanese }
      case 'output':
        return { question: parsedResult.japanese, answer: parsedResult.english }
      default:
        break;
    }

  } catch (error) {
    console.log(error);
  }
}

export const searchWordByGemini = async (
  keyword: string,
  mode: SearchMode): Promise<dictionaryRes | undefined> => {
  let systemInstruction = "";
  switch (mode) {
    case 'JPtoEN':
      systemInstruction = "次の日本語の単語または表現の意味に沿うような英語の単語または表現、どのような場面で使うかの説明(日本語で)、それを使った例文を一つ出力してください、複数の候補がある場合はそれら全てを出力してください。一つの単語または表現について次のJSON schemaで出力し、配列に格納して出力してください。{\"type\":\"object\",\"properties\":{\"wordOrPhrase\":{\"type\":\"string\"},\"context\":{\"type\":\"string\"},\"example\":{\"type\":\"string\"},\"checked\":{\"type\":\"false\"},\"registered\":{\"type\":\"false\"}}} ただし、日本語として意味が通らない文字列が渡された場合は空の配列を返してください。";
      break
    case 'ENtoJP':
      systemInstruction = "次の英語の単語または表現の日本語での意味と、どのような場面で使うかの説明(日本語で)、その英語を使った例文を一つ出力してください、複数の意味がある場合はそれら全てを出力してください。一つの日本語での意味とその例文について次のJSON schemaで出力し、配列に格納して出力してください。{\"type\":\"object\",\"properties\":{\"wordOrPhrase\":{\"type\":\"string\"},\"context\":{\"type\":\"string\"},\"example\":{\"type\":\"string\"},\"checked\":{\"type\":\"false\"},\"registered\":{\"type\":\"false\"}}} ただし、英語として意味が通らない文字列が渡された場合は空の配列を返してください。";
      break
    default:
      break;
  }

  try {
    const res = await generateSentence(systemInstruction, keyword);
    const parsedResult = JSON.parse(res.data.result);
    return parsedResult;
  } catch (error) {
    console.log(error);
  }
}
