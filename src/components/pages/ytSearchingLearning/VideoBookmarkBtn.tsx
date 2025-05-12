import { FaRegBookmark } from "react-icons/fa6";

import { FaBookmark } from "react-icons/fa6";

import { createBookmarkVideo, deleteBookmarkVideo } from "lib/api/bookmarkVideo";

import { youtubeAPIResultItem } from "interfaces/index";

import { useDispatch, useSelector } from "react-redux";
import { addBookmarkedVideo, removeBookmarkedVideo } from "store/bookmarkedVideoSlice";
import { RootState } from "store";


const VideoBookmarkBtn = ({video, bookmarked} : {video: youtubeAPIResultItem, bookmarked: boolean}) => {
  const {bookmarkedVideoList} = useSelector((state:RootState) => state.bookmarkedVideo);
  const dispatch = useDispatch();

  const handleCreateBookmarkVideo = async () => {
    try {
      const res = await createBookmarkVideo({videoJson: video});
      dispatch(addBookmarkedVideo(res.data));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteBookmarkVideo = async () => {
    // bookmarkedVideoListの中からvideoのvideoIdが一致する要素を探す
    const matchedVideo = bookmarkedVideoList?.find(
    (bookmarkedVideo) =>
      bookmarkedVideo.videoJson.id.videoId === video.id.videoId
    );

    const deleteVideoId = matchedVideo?.id ?? -1;

    if (deleteVideoId === -1) {
      return
    }

    try {
      const res = await deleteBookmarkVideo(deleteVideoId);
      dispatch(removeBookmarkedVideo(matchedVideo));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {bookmarked ? (
        <FaBookmark onClick={() => handleDeleteBookmarkVideo()}/>
      ) : (
        <FaRegBookmark onClick={() => handleCreateBookmarkVideo()}/>
      )}
    </>
  )
}

export default VideoBookmarkBtn
