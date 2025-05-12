import axios from "axios";

export const searchVideoByKeyword = async (keyword: string, max_results: number) => {

  return axios.post('http://localhost:3000/api/youtube/search_by_keyword',{
    keyword: keyword,
    max_results: max_results},
    { headers: {"Content-Type": "application/json"}}
  );
}

export const fetchChannelThumbnail = async (channelId: string) => {

  return axios.post('http://localhost:3000/api/youtube/fetch_channel_thumbnail',{
    channel_id: channelId},
    { headers: {"Content-Type": "application/json"}}
  );
}
