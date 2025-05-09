import axios from "axios"

export const generateSentence = async (systemInstruction: string, text: string) => {

  return axios.post('http://localhost:3000/api/generate_sentence',{
    system_instruction: systemInstruction,
    text: text},
    { headers: {"Content-Type": "application/json"}}
  );
}
