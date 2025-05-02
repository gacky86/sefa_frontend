import Answer from "components/pages/fclearning/Answer";
import Question from "components/pages/fclearning/Question";
import FCListBtn from "components/pages/fclearning/FCListBtn";
import CardEditBtn from "components/pages/fclearning/CardEditBtn";

// axios responce types
import { useEffect } from "react";

// Redux
import { RootState, AppDispatch } from 'store/index';
import { useDispatch, useSelector } from "react-redux";
import { fetchCardToLearn } from "store/fcLearningSlice";

const FCLearning = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { learningMode, flashcard, card, userThinking } = useSelector((state: RootState) => state.fcLearning);

  useEffect(() => {
    if (flashcard) {
      dispatch(fetchCardToLearn(flashcard.id));
    }
  }, [])

  return (
    <div className="text-center mx-auto">
      {/* モード名 */}
      <h2 className="text-dark-navy-blue text-xl font-extralight mt-3">{learningMode}モード</h2>

      {/* 問題文 AIとの通信はこのコンポーネントで行い、得られた問題文をQuestionコンポーネントに渡す。 */}
      {card ? (
        <Question question={card.japanese}/>
      ) : (
        <p className="my-3">本日学習するカードはありません。お疲れ様でした！</p>
      )}

      {card ? (
        <div className="border-t-1 border-dark-navy-blue w-[70%] mx-auto"></div>
      ) : (
        <></>
      )}


      {/* 回答文 AIとの通信はこのコンポーネントで行い、得られた回答文をQuestionコンポーネントに渡す。 */}
      {userThinking || !card ? (
        <></>
      ) : (
        <Answer answer={card.english}/>
      )}

      <FCListBtn />
      <CardEditBtn />

    </div>
  )
}

export default FCLearning
