import VideoBookmarkBtn from "components/pages/ytSearchingLearning/VideoBookmarkBtn";
import { youtubeAPIResultItem } from "interfaces/index";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startLearning } from "store/ytLearningSlice";

const SearchResultCard = ({result}: {result:youtubeAPIResultItem}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startYTLearning = () => {
    dispatch(startLearning(result));
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
    <div className="mx-auto mb-1 grid grid-cols-2 grid-rows-1 border-1 border-gray-300 rounded-sm w-[256px] h-[90px] relative"
         onClick={() => startYTLearning()}>
      <div className='p-1'>
        <img className='rounded-md object-cover h-[82px]' src={result.snippet.thumbnails.default.url} />
      </div>
      <div className='my-1 mr-1'>
        <h3 className='text-sm/4 font-light'>{refineTitle(result.snippet.title, 40)}</h3>
        <h4 className='text-right text-[10px] font-light'>{refineTitle(result.snippet.channelTitle, 20)}</h4>
        <div className="absolute bottom-1 right-0">
          <VideoBookmarkBtn/>
        </div>
      </div>
    </div>
  )
}

export default SearchResultCard
