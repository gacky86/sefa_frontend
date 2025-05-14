import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setResponse, setKeyword } from "store/aiDictionarySlice";

// api
import { searchWordByGemini } from "lib/api/gemini";

import { SearchMode } from "interfaces/index";

const SearchWordForm = () => {
  const { searchMode, keyword } = useSelector((state:RootState) => state.aiDictionary);
  const dispatch = useDispatch();

  // gemini APIにリクエスト送信、responceを取得
  const handleSearchWordByGemini = async () => {
    const res = await searchWordByGemini(keyword, searchMode);
    dispatch(setResponse(res));
  }

  const placeholderMap: Record<SearchMode, string> = {
    ENtoJP: "Enter English word or phrases...",
    JPtoEN: "知りたい単語・表現を入力...",
  };

  return (
    <div className='mt-12 text-center relative'>
      <input className="bg-white border-1 border-dark-navy-blue rounded-sm w-[90%] py-0.5 px-1"
      placeholder={placeholderMap[searchMode]} type="text" id="email" name="email" value={keyword} onChange={(e) => dispatch(setKeyword(e.target.value))}/>
      <FaSearch className="absolute top-2 right-5" onClick={() => handleSearchWordByGemini()}/>
    </div>
  )
}

export default SearchWordForm
