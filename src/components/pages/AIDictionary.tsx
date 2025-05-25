// components
import SearchWordForm from "components/pages/aiDictionary/SearchWordForm";
import DictionaryModeSelector from "components/pages/aiDictionary/DictionaryModeSelector";
import DictionaryResultsList from "components/pages/aiDictionary/DictionaryResultsList";
import PageTitle from "components/shared/PageTitle";

const AIDictionary = () => {
  return (
    <div className="mx-auto font-sans text-dark-navy-blue w-[90%]">
      <PageTitle title="単語・表現検索"/>
      {/* 英和か和英かのモード選択ボタン */}
      {/* モードはグローバルに管理したいのでslice作成する */}
      <DictionaryModeSelector />
      {/* 辞書検索用のフォームと検索ボタン */}
      <SearchWordForm/>
      {/* 検索結果表示（カード形式　和英or英和で分岐） */}
      <DictionaryResultsList/>
    </div>
  )
}

export default AIDictionary
