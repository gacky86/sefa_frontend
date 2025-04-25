import Answer from "components/pages/fclearning/Answer";
import Question from "components/pages/fclearning/Question";
import FCListBtn from "components/pages/fclearning/FCListBtn";
import CardEditBtn from "components/pages/fclearning/CardEditBtn";



const FCLearning = () => {
  // APIを叩く関数：@Backend FCが持つカード「学習するべき順番に並び替えたときの優先順位が一番目のカード」を取得してFrontendに返す
  // カードをもとに、AIと通信を行い、問題文と回答文を生成する関数

  return (
    <div className="text-center mx-auto">
      {/* モード名 */}
      <h2 className="text-dark-navy-blue text-xl font-extralight mt-3">Inputモード</h2>
      {/* 問題文 AIとの通信はこのコンポーネントで行い、得られた問題文をQuestionコンポーネントに渡す。 */}
      <Question/>
      <div className="border-t-1 border-dark-navy-blue w-[70%] mx-auto"></div>
      {/* 回答文 AIとの通信はこのコンポーネントで行い、得られた回答文をQuestionコンポーネントに渡す。 */}
      <Answer />

      <FCListBtn />
      <CardEditBtn />

    </div>
  )
}

export default FCLearning
