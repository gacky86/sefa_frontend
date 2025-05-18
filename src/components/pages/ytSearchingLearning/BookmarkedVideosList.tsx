// import BookmarkedVideoCard from "components/pages/ytSearchingLearning/BookmarkedVideoCard";
import VideoCard from "components/pages/ytSearchingLearning/VideoCard";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getBookmarkedVideos } from "store/bookmarkedVideoSlice";
import { RootState, AppDispatch } from "store";


const BookmarkedVideosList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {bookmarkedVideoList} = useSelector((state:RootState) => state.bookmarkedVideo);


  useEffect(() => {
    dispatch(getBookmarkedVideos());
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl text-center">ブックマーク済み動画</h2>
      <div className="flex flex-wrap gap-2">
        {bookmarkedVideoList.length > 0 ? (
          bookmarkedVideoList.map((bookmarkedVideo, key) => {
          return (
            <VideoCard key={key} video={bookmarkedVideo.videoJson} />
          )
        })
        ) : (
          <h3 className="mt-3 mx-auto">ブックマーク済みの動画はありません。</h3>
        ) }
      </div>
    </div>
  )
}

export default BookmarkedVideosList
