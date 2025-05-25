import VideoBookmarkBtn from "components/pages/ytSearchingLearning/VideoBookmarkBtn";
import { youtubeAPIResultItem } from "interfaces/index";
import { useNavigate } from "react-router-dom";
import { startLearning } from "store/ytLearningSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";


const VideoCard = ({video}: {video: youtubeAPIResultItem}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {bookmarkedVideoList} = useSelector((state:RootState) => state.bookmarkedVideo);

  const startYTLearning = () => {
    dispatch(startLearning(video));
    navigate('/yt-learning');
  }

  const omitHashTagsFromVideoTitle = (title: string) => {
    const hashtagIndex = title.indexOf('#')
    if (hashtagIndex !== -1) {
      return title.substring(0, hashtagIndex);
    } else {
      return title;
    }
  };

  const refineTitle = (originalTitle: string, maxLength: number) =>{
    const originalTitleWOHash = omitHashTagsFromVideoTitle(originalTitle);

    if(originalTitleWOHash.length > maxLength) {
      return `${originalTitleWOHash.slice(0, maxLength)}...`;
    } else {
      return originalTitleWOHash;
    }
  };

  const isBookmarked = bookmarkedVideoList?.some(
    (bookmarkedVideo) => bookmarkedVideo.videoJson.id.videoId === video.id.videoId
  );

  return (
    <div className="mx-auto mb-2 grid grid-cols-2 grid-rows-1 border-1 border-gray-300 rounded-sm w-[300px] h-[118px] relative"
        onClick={() => startYTLearning()}>
      <div className='p-1'>
        <img className='rounded-md object-cover w-[148px]' src={video.snippet.thumbnails.default.url} />
      </div>
      <div className="grid grid-cols-7 grid-rows-4 my-1 mr-1">
        <div className="col-span-7 row-span-3 text-sm/4 font-light">{refineTitle(video.snippet.title, 40)}</div>
        <div className="col-span-6 row-start-4 text-[10px] font-light">{refineTitle(video.snippet.channelTitle, 18)}</div>
        <div className="col-start-7 row-start-4 text-xl"><VideoBookmarkBtn video={video} bookmarked={isBookmarked ?? false}/></div>
      </div>
  </div>
  )
}

export default VideoCard
