// redux
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "store";
import { switchSearchMode, setLanguage } from "store/aiDictionarySlice";

// interfaces
import { SearchMode } from "interfaces/index";

// util
import { languages } from "utils/languageList";

const DictionaryModeSelector = () => {
  const dispatch = useDispatch();
  const { searchMode, language } = useSelector((state:RootState) => state.aiDictionary);

  const handleSetSearchMode = (mode: SearchMode) => {
    dispatch(switchSearchMode(mode));
  }

  return (
    <div className="mx-auto text-center mt-5">
      <div className="mb-5 flex gap-2 justify-center">
        <p>検索する言語:</p>
        <select name="lang-selector" className="bg-white border-1 border-dark-navy-blue rounded-sm"
                onChange={(e) => dispatch(setLanguage(e.target.value))}>
          {/* valueは送信する値 */}
          {/* 表示する値はタグの間のやつ */}
          {languages.map((language, key) => {
            return <option value={language} key={key}>{language}</option>
          })}
        </select>
      </div>
      <button className={`border-1 border-dark-navy-blue rounded-sm px-1 ${searchMode === 'JPtoEN' ? 'text-white bg-auqa-blue': 'bg-white'}`}
              onClick={() => handleSetSearchMode('JPtoEN')}>{`日本語 → ${language}`}</button>
      <button className={`border-1 border-dark-navy-blue rounded-sm px-1 ${searchMode === 'ENtoJP' ? 'text-white bg-auqa-blue': 'bg-white'}`}
              onClick={() => handleSetSearchMode('ENtoJP')}>{`${language} → 日本語`}</button>
    </div>
  )
}

export default DictionaryModeSelector
