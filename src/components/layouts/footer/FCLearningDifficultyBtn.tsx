// Redux
import { RootState, AppDispatch } from 'store/index';
import { useSelector, useDispatch } from "react-redux"
import { fetchCardToLearn, setUserThinking } from "store/fcLearningSlice";

// api
import { updateCardLearningFactor } from "lib/api/card";

type DifficultyBtnProps = {
  difficulty: "Again"|"Hard"|"Good"|"Easy";
  reviewInterval: string;
};

const FCLearningDifficultyBtn = ({difficulty, reviewInterval}:DifficultyBtnProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { learningMode, card, flashcard } = useSelector((state: RootState) => state.fcLearning);

  const handleCardDone = async () => {
    // cardのlearning_factorを更新するapiを叩く
    if (flashcard && card && learningMode) {
      try {
        const res = await updateCardLearningFactor(flashcard.id, card.id, difficulty, learningMode);
        console.log(res);

      } catch (error) {
        console.log(error);
      }
    }

    // 次のカードをfetchする
    if (flashcard) {
      dispatch(fetchCardToLearn(flashcard.id));
    }

    // Questionのみ表示状態(userThinking === true)にする
    dispatch(setUserThinking());
  }

  // Reduxに持っているstate.cardから、現在表示しているcardをselectorで読み取る
  // クリックされたら、渡されているdifficultyをbackendに渡して、そのカードの習熟度を更新するAPIを叩く
  return (
    <div className="text-center">
      <button className="text-white text-base bg-auqa-blue border-1 border-dark-navy-blue rounded-full w-[90%]"
              onClick={() => handleCardDone()}>
        {difficulty}
      </button>
      <p className="text-sm">{reviewInterval}</p>
    </div>
  )
}

export default FCLearningDifficultyBtn
