import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "store";
import { setKeyword, searchVideos } from 'store/ytLearningSlice'

const SearchForm = () => {
  const {keyword} = useSelector((state:RootState) => state.ytLearning);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className='my-12 text-center relative'>
      <input className="bg-white border-1 border-dark-navy-blue rounded-sm w-[90%] py-0.5 px-1 mb-2"
      placeholder="動画をYoutubeで探す" type="text" id="email" name="email" value={keyword} onChange={(e) => dispatch(setKeyword(e.target.value))}/>
      <FaSearch className="absolute top-2 right-5" onClick={() => dispatch(searchVideos(keyword))}/>
    </div>
  )
}

export default SearchForm
