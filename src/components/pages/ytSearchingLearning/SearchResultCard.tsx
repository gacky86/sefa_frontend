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

  return (
    <div className="mx-auto mb-1 grid grid-cols-2 grid-rows-1 gap-1 border-1 border-gray-300 rounded-sm w-[256px] h-[90px]"
         onClick={() => startYTLearning()}>
      <div className='rounded-md m-1 h-[100%]'>
        <img className=' object-cover' src={result.snippet.thumbnails.default.url} />
      </div>
      <div className='my-1 mr-1'>
        <h3 className='text-sm/4 font-light'>{result.snippet.title}</h3>
        <h4 className='text-right text-[10px] font-light'>{result.snippet.channelTitle}</h4>
        <div className="flex justify-end">
          <VideoBookmarkBtn/>
        </div>
      </div>
    </div>
  )
}

export default SearchResultCard
