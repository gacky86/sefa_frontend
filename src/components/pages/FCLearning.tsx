import Answer from "components/pages/fclearning/Answer";
import Question from "components/pages/fclearning/Question";
import FCListBtn from "components/pages/fclearning/FCListBtn";
import CardEditBtn from "components/pages/fclearning/CardEditBtn";

// api
import { checkBoolean } from "lib/api/gemini";

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

  const generateCardQA = async () => {
    if(card) {
      const japanese = card.japanese
      const english = card.english
      try {
        const res = await checkBoolean("次の英単語を次の日本語の意味で使い、ランダムな英文とその日本語訳を作成してください。次のJSON schemaで出力してください。{\"type\":\"object\",\"properties\":{\"english\":{\"type\":\"string\"},\"english\":{\"type\":\"string\"}}}",
          `${english}, ${japanese}`);
        const parsedResult = JSON.parse(res.data.result);

        switch (learningMode) {
          case 'input':
            setCardQA({ ...cardQA, question: parsedResult.english, answer: parsedResult.japanese });
          case 'output':
            setCardQA({ ...cardQA, question: parsedResult.japanese, answer: parsedResult.english });
          default:
            break;
        }
        console.log(parsedResult.japanese);
        console.log(parsedResult.english);

      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    if (flashcard) {
      dispatch(fetchCardToLearn(flashcard.id));
    }
  }, [])

  useEffect(() => {
    if(card) {
      generateCardQA();
    }
  }, [card]);

  return (
    <div className="text-center mx-auto">
      {/* モード名 */}
      <h2 className="text-dark-navy-blue text-xl font-extralight mt-3">{learningMode}モード</h2>

      {/* 問題文 AIとの通信はこのコンポーネントで行い、得られた問題文をQuestionコンポーネントに渡す。 */}
      {card ? (
        <Question question={cardQA.question}/>
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
        <Answer answer={cardQA.answer}/>
      )}

      <FCListBtn />
      <CardEditBtn />

    </div>
  )
}

export default FCLearning
