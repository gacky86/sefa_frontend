import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "store";

// api
import { searchWordByGemini } from "lib/api/gemini";

import { SearchMode } from "interfaces/index";

const SearchWordForm = () => {
  const [keyword, setKeyword] = useState('');
  const { searchMode } = useSelector((state:RootState) => state.aiDictionary);

  // gemini APIにリクエスト送信、responceを取得
  const handleSearchWordByGemini = async () => {
    const res = await searchWordByGemini(keyword, searchMode);
    console.log(res);
  }


  const placeholderMap: Record<SearchMode, string> = {
    ENtoJP: "Enter English word or phrases...",
    JPtoEN: "知りたい単語・表現を入力...",
  };

  return (
    <div className='mt-12 text-center relative'>
      <input className="bg-white border-1 border-dark-navy-blue rounded-sm w-[90%] py-0.5 px-1"
      placeholder={placeholderMap[searchMode]} type="text" id="email" name="email" value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
      <FaSearch className="absolute top-2 right-5" onClick={() => handleSearchWordByGemini()}/>
    </div>
  )
}

export default SearchWordForm
