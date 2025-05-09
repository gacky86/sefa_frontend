
import SearchForm from "components/pages/ytSearchingLearning/SearchForm";
import SearchResultsList from "components/pages/ytSearchingLearning/SearchResultsList";
import BookmarkedVideosList from "components/pages/ytSearchingLearning/BookmarkedVideosList";

const YTSearching = () => {

  return (
    <div className="mx-auto font-sans text-dark-navy-blue w-[300px]">
      <h1 className="text-2xl text-center mt-1 font-medium">Youtube動画学習</h1>
      {/* 検索窓コンポーネント */}
      <SearchForm/>
      {/* 検索結果コンポーネント */}
      <SearchResultsList/>
      {/* ブックマークした動画一覧コンポーネント */}
      <BookmarkedVideosList />

    </div>
  )
}

export default YTSearching
