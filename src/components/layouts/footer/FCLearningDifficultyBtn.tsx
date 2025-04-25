import { useDispatch } from "react-redux"
import { setUserThinking } from "store/fcLearningSlice";

type DifficultyBtnProps = {
  difficulty: "Again"|"Hard"|"Good"|"Easy";
  reviewInterval: string;
};

const FCLearningDifficultyBtn = ({difficulty, reviewInterval}:DifficultyBtnProps) => {
  const dispatch = useDispatch();

  // Reduxに持っているstate.cardから、現在表示しているcardをselectorで読み取る
  // クリックされたら、渡されているdifficultyをbackendに渡して、そのカードの習熟度を更新するAPIを叩く
  return (
    <div className="text-center">
      <button className="text-white text-base bg-auqa-blue border-1 border-dark-navy-blue rounded-full w-[90%]"
              onClick={() => {dispatch(setUserThinking())}}>
        {difficulty}
      </button>
      <p className="text-sm">{reviewInterval}</p>
    </div>
  )
}

export default FCLearningDifficultyBtn
