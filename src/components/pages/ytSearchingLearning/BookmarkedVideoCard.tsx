import VideoBookmarkBtn from "components/pages/ytSearchingLearning/VideoBookmarkBtn";
import { youtubeAPIResultItem } from "interfaces/index";
import { useNavigate } from "react-router-dom";
import { startLearning } from "store/ytLearningSlice";
import { useDispatch } from "react-redux";

const BookmarkedVideoCard = ({video}: {video:youtubeAPIResultItem}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startYTLearning = () => {
    dispatch(startLearning(video));
    navigate('/yt-learning');
  }

  const refineTitle = (originalTitle: string, maxLength: number) =>{
    if(originalTitle.length > maxLength) {
      return `${originalTitle.slice(0, maxLength)}...`;
    } else {
      return originalTitle;
    }
  }

  return (
    <div className='w-[145px] h-[145px] px-2 pt-2 border-1 border-gray-400 rounded-md bg-white'
         onClick={() => startYTLearning()}>
      {/* image */}
      <img className='rounded-md object-cover w-[100%] h-[60%]' src={video.snippet.thumbnails.default.url} />
      <div className='grid grid-cols-8 grid-rows-1 mt-1'>
        {/* channel icon */}
        <div className='col-span-2 rounded-full bg-black w-[20px] h-[20px]'>s</div>
        {/* title */}
        <div className='col-span-5 col-start-3 text-sm/4 text-black'>
          <h3 className='text-sm/4 font-light'>{refineTitle(video.snippet.title, 20)}</h3>
        </div>
        {/* bookmark btn */}
        <div className="col-start-8">
          <VideoBookmarkBtn video={video} bookmarked={true}/>
        </div>
      </div>

    </div>
  )
}

export default BookmarkedVideoCard
