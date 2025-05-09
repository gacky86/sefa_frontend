import BookmarkedVideoCard from "components/pages/ytSearchingLearning/BookmarkedVideoCard";


const BookmarkedVideosList = () => {
  // BEからbookmarkのvideoのurlを取得して、それをBEでYTのAPI経由で取得してFEに返す


  return (
    <div>
      <h2 className="text-xl text-center">ブックマーク</h2>
      <BookmarkedVideoCard/>
    </div>
  )
}

export default BookmarkedVideosList
