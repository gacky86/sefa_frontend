import axios from "axios"

// import client from 'lib/api/client';

export const checkBoolean = async (systemInstruction: string, text: string) => {

  return axios.post('http://localhost:3000/api/gemini',{
    system_instruction: systemInstruction,
    text: text},
    { headers: {"Content-Type": "application/json"}}
  );
}
