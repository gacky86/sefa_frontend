import axios from "axios"

// interface
import { SearchMode, CardQA, dictionaryRes, checkLangRes } from "interfaces/index";

const generateSentence = async (systemInstruction: string, text: string) => {
  // AWS本番環境時
  // return axios.post('https://api.sefa-ai.com/api/gemini/generate_sentence',{
  //   system_instruction: systemInstruction,
  //   text: text},
  //   { headers: {"Content-Type": "application/json"}}
  // );
  // ローカル開発時
  return axios.post('http://localhost:3000/api/gemini/generate_sentence',{
    system_instruction: systemInstruction,
    text: text},
    { headers: {"Content-Type": "application/json"}}
  );
}


export const generateCardQAByGemini = async (
  learningMode: 'input'|'output',
  japanese: string,
  english: string,
  language: string,
  level: string): Promise<CardQA | undefined> => {
  try {
    const res = await generateSentence(`次の${language}の単語を次の日本語の意味で使うような、ランダムな${language}の文章とその日本語訳を作成してください。ただし、文章に使う単語のレベルは${level}レベルで、一文でお願いします。次のJSON schemaで出力してください。{\"type\":\"object\",\"properties\":{\"sentence\":{\"type\":\"string\"},\"translatedJapanese\":{\"type\":\"string\"}}}`,
      `${english}, ${japanese}`);
    // geminiからのレスポンスをJSONにparseする必要がある
    const parsedResult = JSON.parse(res.data.result);

    // learningModeの値によって、問題文と回答文を割り当てる
    switch (learningMode) {
      case 'input':
        return { question: parsedResult.sentence, answer: parsedResult.translatedJapanese }
      case 'output':
        return { question: parsedResult.translatedJapanese, answer: parsedResult.sentence }
      default:
        break;
    }

  } catch (error) {
    console.log(error);
  }
}

export const searchWordByGemini = async (
  keyword: string,
  mode: SearchMode,
  language: string): Promise<dictionaryRes | undefined> => {
  let systemInstruction = "";
  switch (mode) {
    case 'JPtoEN':
      systemInstruction = `次の日本語の単語または表現の意味に沿うような${language}の単語または表現、どのような場面で使うかの説明(日本語で)、それを使った例文を一つ出力してください、複数の候補がある場合はそれら全てを出力してください。一つの単語または表現について次のJSON schemaで出力し、配列に格納して出力してください。{\"type\":\"object\",\"properties\":{\"wordOrPhrase\":{\"type\":\"string\"},\"context\":{\"type\":\"string\"},\"example\":{\"type\":\"string\"},\"checked\":{\"type\":\"false\"},\"registered\":{\"type\":\"false\"}}} ただし、日本語として意味が通らない文字列が渡された場合は空の配列を返してください。`;
      break
    case 'ENtoJP':
      systemInstruction = `次の${language}の単語または表現の日本語での意味と、どのような場面で使うかの説明(日本語で)、その${language}を使った例文を一つ出力してください、複数の意味がある場合はそれら全てを出力してください。一つの日本語での意味とその例文について次のJSON schemaで出力し、配列に格納して出力してください。{\"type\":\"object\",\"properties\":{\"wordOrPhrase\":{\"type\":\"string\"},\"context\":{\"type\":\"string\"},\"example\":{\"type\":\"string\"},\"checked\":{\"type\":\"false\"},\"registered\":{\"type\":\"false\"}}} ただし、${language}として意味が通らない文字列が渡された場合は空の配列を返してください。`;
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

export const checkWordExistance = async (
  japanese: string,
  learningLang: string,
  language: string): Promise<checkLangRes | undefined> => {
  const systemInstruction = `${language}において、次の単語または表現が存在するかどうかをチェックしてtrueまたはfalseで回答してください。次のJSON schemaで出力してください。{\"type\":\"object\",\"properties\":{\"existance\":{\"type\":\"boolean\"}}}`
  try {
    const res = await generateSentence(systemInstruction, `${japanese}, ${learningLang}`);
    const parsedResult = JSON.parse(res.data.result);
    return parsedResult;
  } catch (error) {
    console.log(error);
  }

}
