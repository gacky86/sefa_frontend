import axios from "axios";

export const searchVideoByKeyword = async (keyword: string, max_results: number) => {

  return axios.post('http://localhost:3000/api/youtube/search_by_keyword',{
    keyword: keyword,
    max_results: max_results},
    { headers: {"Content-Type": "application/json"}}
  );
}
