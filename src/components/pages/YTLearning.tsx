import PlayingVideo from "components/pages/ytSearchingLearning/PlayingVideo";
import RegisterWordsForm from "components/pages/ytSearchingLearning/RegisterWordsForm";
import SearchWordForm from "components/pages/ytSearchingLearning/SearchWordForm";

const YTLearning = () => {

  return (
    <div className="mx-auto font-sans text-dark-navy-blue">
      <h1 className="mb-6 text-2xl text-center mt-1 font-medium">Youtube動画学習</h1>
      <PlayingVideo/>

      <SearchWordForm/>
      <RegisterWordsForm />


    </div>
  )
}

export default YTLearning
