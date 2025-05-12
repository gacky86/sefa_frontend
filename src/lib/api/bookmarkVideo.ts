import { BookmarkVideo, BookmarkVideoParams } from "interfaces/index";
import client from 'lib/api/client';
import { getUserAuthHeader } from "lib/api/client";


// 一覧
export const getBookmarkVideosList = () => {
  const authHeader = getUserAuthHeader();
  return client.get<BookmarkVideo[]>('/bookmark_videos', {headers: authHeader});
};


// 新規作成
export const createBookmarkVideo = (params: BookmarkVideoParams) => {
  const authHeader = getUserAuthHeader();
  return client.post('/bookmark_videos', params, { headers: authHeader });
};


// 削除
export const deleteBookmarkVideo = (id: number) => {
  const authHeader = getUserAuthHeader();
  return client.delete(`/bookmark_videos/${id}`, {headers: authHeader});
};

// 指定したvideoIdを元に、currentUserが持つbookmarkVideoの中からvideoIdが一致するものがあるかどうかをチェックする
// 一致するものがある場合は、ブックマーク済みとしてtrueを返す
// それ以外の場合はfalseを返す
export const checkBookmarkedVideo = (videoId: number) => {
  const authHeader = getUserAuthHeader();
  return client.get('/bookmark_videos/check_bookmarked_video', {headers: authHeader, params: { video_id: videoId }});
}

// 詳細
// export const getBookmarkVideoDetail = (id: number) => {
//   return client.get<BookmarkVideo>(`/bookmark_videos/${id}`);
// };

// 更新
// export const updateBookmarkVideo = (id: number, params: BookmarkVideo) => {
  //   const authHeader = getUserAuthHeader();
  //   return client.patch(`/bookmark_videos/${id}`, params, { headers: authHeader });
  // };
