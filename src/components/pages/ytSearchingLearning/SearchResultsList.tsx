// import SearchResultCard from "components/pages/ytSearchingLearning/SearchResultCard";
import VideoCard from "components/pages/ytSearchingLearning/VideoCard";
import { useSelector } from "react-redux";
import { RootState } from "store";

const SearchResultsList = () => {
  const { results } = useSelector((state:RootState) => state.ytLearning);
  return (
    <div>
      {results ? (
        <div className="mx-auto h-52 overflow-scroll">
          {results.map((result, key) => {
            return (
            <VideoCard key={key} video={result}/>
            )
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default SearchResultsList
