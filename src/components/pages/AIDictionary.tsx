import SearchWordForm from "components/pages/aiDictionary/SearchWordForm";
import DictionaryModeSelector from "components/pages/aiDictionary/DictionaryModeSelector";
import DictionaryResultsList from "components/pages/aiDictionary/DictionaryResultsList";
import FlashcardRegisterForm from "components/pages/aiDictionary/FlashcardRegisterForm";


const AIDictionary = () => {
  return (
    <div className="mx-auto font-sans text-dark-navy-blue w-[90%]">
      <h1 className="text-2xl text-center mt-1 font-medium">単語・表現検索</h1>
      {/* 英和か和英かのモード選択ボタン */}
      {/* モードはグローバルに管理したいのでslice作成する */}
      <DictionaryModeSelector />
      {/* 辞書検索用のフォームと検索ボタン */}
      <SearchWordForm/>
      {/* 検索結果表示（カード形式　和英or英和で分岐） */}
      <DictionaryResultsList/>
      {/* 既存の単語帳へ登録するためのフォーム */}
      {/* 単語帳がない場合は、ここで新規作成もできる（後で実装） */}
      <FlashcardRegisterForm/>

    </div>
  )
}

export default AIDictionary
