// components
import Answer from "components/pages/fclearning/Answer";
import Question from "components/pages/fclearning/Question";
import FCListBtn from "components/pages/fclearning/FCListBtn";
import CardEditBtn from "components/pages/fclearning/CardEditBtn";
import PageTitle from "components/shared/PageTitle";

// api
import { generateCardQAByGemini } from "lib/api/gemini";

// axios responce types
import { useEffect, useState } from "react";

// Redux
import { RootState, AppDispatch } from 'store/index';
import { useDispatch, useSelector } from "react-redux";
import { fetchCardToLearn } from "store/fcLearningSlice";

const FCLearning = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { learningMode, flashcard, card, userThinking } = useSelector((state: RootState) => state.fcLearning);

  const intialCardQA = {
    question: "",
    answer: ""
  }
  const [ cardQA, setCardQA ] = useState(intialCardQA);

  useEffect(() => {
    if (flashcard) {
      dispatch(fetchCardToLearn(flashcard.id));
    }
  }, [])

  useEffect(() => {
    if (card && learningMode && flashcard) {
      const fetchQA = async () => {
        const generateResult = await generateCardQAByGemini(learningMode, card.japanese, card.english, flashcard.language, flashcard.level);
        if (generateResult) {
          setCardQA(generateResult);
        }
      };
      fetchQA();
    }
  }, [card]);

  return (
    <div className="text-center mx-auto">
      {/* モード名 */}
      {learningMode && <PageTitle title={`${learningMode}モード`}/>}

      {/* 問題文 AIとの通信はこのコンポーネントで行い、得られた問題文をQuestionコンポーネントに渡す。 */}
      {card ? (
        <Question question={cardQA.question}/>
      ) : (
        <p className="my-10">本日学習するカードはありません。お疲れ様でした！</p>
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
        <Answer answer={cardQA.answer}/>
      )}

      <FCListBtn />
      <CardEditBtn />

    </div>
  )
}

export default FCLearning
