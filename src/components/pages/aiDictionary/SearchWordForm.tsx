import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "store";
import { setKeyword, searchVideos } from 'store/ytLearningSlice'

const SearchWordForm = () => {
  const [keyword, setKeyword] = useState('');

  return (
    <div className='mt-12 text-center relative'>
      <input className="bg-white border-1 border-dark-navy-blue rounded-sm w-[90%] py-0.5 px-1"
      placeholder="知りたい表現を入力" type="text" id="email" name="email" value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
      <FaSearch className="absolute top-2 right-5"/>
    </div>
  )
}

export default SearchWordForm
