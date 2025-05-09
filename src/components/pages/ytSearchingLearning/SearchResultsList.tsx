import SearchResultCard from "components/pages/ytSearchingLearning/SearchResultCard";
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
            <SearchResultCard key={key} result={result}/>
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
