import { useDispatch, useSelector } from "react-redux"
import { RootState } from "store";

import { switchSearchMode } from "store/aiDictionarySlice";
import { SearchMode } from "interfaces/index";

const DictionaryModeSelector = () => {
  const dispatch = useDispatch();
  const { searchMode } = useSelector((state:RootState) => state.aiDictionary);

  const handleSetSearchMode = (mode: SearchMode) => {
    dispatch(switchSearchMode(mode));
  }

  return (
    <div className="mx-auto text-center mt-5">
      <button className={`border-1 border-dark-navy-blue rounded-sm px-1 ${searchMode === 'JPtoEN' ? 'text-white bg-auqa-blue': 'bg-white'}`}
              onClick={() => handleSetSearchMode('JPtoEN')}>日本語 → English</button>
      <button className={`border-1 border-dark-navy-blue rounded-sm px-1 ${searchMode === 'ENtoJP' ? 'text-white bg-auqa-blue': 'bg-white'}`}
              onClick={() => handleSetSearchMode('ENtoJP')}>English → 日本語</button>
    </div>
  )
}

export default DictionaryModeSelector
