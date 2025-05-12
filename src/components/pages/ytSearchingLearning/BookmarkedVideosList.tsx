import BookmarkedVideoCard from "components/pages/ytSearchingLearning/BookmarkedVideoCard";
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
        {bookmarkedVideoList ? (
          bookmarkedVideoList.map((bookmarkedVideo, key) => {
          return (
            <BookmarkedVideoCard key={key} video={bookmarkedVideo.videoJson} />
          )
        })
        ) : (
          <></>
        ) }
      </div>
    </div>
  )
}

export default BookmarkedVideosList
