import { useSelector } from "react-redux";
import { RootState } from "store";
import VideoBookmarkBtn from "components/pages/ytSearchingLearning/VideoBookmarkBtn";
import { useEffect, useState } from "react";

const PlayingVideo = () => {
  const { video } = useSelector((state:RootState) => state.ytLearning);
  const [bookmarked, setBookmarked] = useState(false);
  const {bookmarkedVideoList} = useSelector((state:RootState) => state.bookmarkedVideo);

  const checkBookmarked = () => {
    // 渡されたresultがすでにbookmarkに入っているかどうかをチェックする
    // 結果をVideoBookmarkBtnコンポーネントに渡す
    if(video) {
      const matchedVideo = bookmarkedVideoList?.find(
      (bookmarkedVideo) =>
        bookmarkedVideo.videoJson.id.videoId === video.id.videoId
      );
      matchedVideo ? setBookmarked(true) : setBookmarked(false) ;
    }
  }

  useEffect(() => {
    console.log(bookmarkedVideoList);

    if(bookmarkedVideoList !== null) {

      checkBookmarked();
    }
  }, []);

  return (
    <div>
      {video ? (
        <>
          <iframe
            id="player"
            width="280"
            height="173"
            src={`https://www.youtube.com/embed/${video?.id.videoId}`}
            allowFullScreen
            className="rounded-md mx-auto"
          />
          <VideoBookmarkBtn video={video} bookmarked={bookmarked}/>
        </>
      ) : (
        <div>動画が見つかりませんでした</div>
      )}


    </div>
  )
}

export default PlayingVideo
