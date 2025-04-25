import Answer from "components/pages/fclearning/Answer";
import Question from "components/pages/fclearning/Question";
import FCListBtn from "components/pages/fclearning/FCListBtn";
import CardEditBtn from "components/pages/fclearning/CardEditBtn";



const FCLearning = () => {
  return (
    <div className="text-center mx-auto">
      {/* モード名 */}
      <h2 className="text-dark-navy-blue text-xl font-extralight mt-3">Inputモード</h2>
      {/* 問題文 */}
      <Question/>
      <div className="border-t-1 border-dark-navy-blue w-[70%] mx-auto"></div>
      {/* 回答文 */}
      <Answer />

      <FCListBtn />
      <CardEditBtn />

    </div>
  )
}

export default FCLearning
