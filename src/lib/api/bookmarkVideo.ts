import { BookmarkVideo, BookmarkVideoParams } from "interfaces/index";
import client from 'lib/api/client';

// 一覧
export const getBookmarkVideosList = () => {
  return client.get<BookmarkVideo[]>('/bookmark_videos');
};

// 新規作成
export const createBookmarkVideo = (params: BookmarkVideoParams) => {
  return client.post('/bookmark_videos', params);
};


// 削除
export const deleteBookmarkVideo = (id: number) => {
  return client.delete(`/bookmark_videos/${id}`);
};

// 指定したvideoIdを元に、currentUserが持つbookmarkVideoの中からvideoIdが一致するものがあるかどうかをチェックする
// 一致するものがある場合は、ブックマーク済みとしてtrueを返す
// それ以外の場合はfalseを返す
export const checkBookmarkedVideo = (videoId: number) => {
  return client.get('/bookmark_videos/check_bookmarked_video', {params: { video_id: videoId }});
}
