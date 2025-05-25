// components
import SearchForm from "components/pages/ytSearchingLearning/SearchForm";
import SearchResultsList from "components/pages/ytSearchingLearning/SearchResultsList";
import BookmarkedVideosList from "components/pages/ytSearchingLearning/BookmarkedVideosList";
import PageTitle from "components/shared/PageTitle";

const YTSearching = () => {

  return (
    <div className="mx-auto font-sans text-dark-navy-blue w-[300px]">
      <PageTitle title="Youtube動画学習"/>
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
