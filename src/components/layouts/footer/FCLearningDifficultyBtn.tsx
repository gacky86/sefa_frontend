type DifficultyBtnProps = {
  difficulty: "Again"|"Hard"|"Good"|"Easy";
  reviewInterval: string;
};

const FCLearningDifficultyBtn = ({difficulty, reviewInterval}:DifficultyBtnProps) => {
  return (
    <div className="text-center">
      <button className="text-white text-base bg-auqa-blue border-1 border-dark-navy-blue rounded-full w-[90%]">
        {difficulty}
      </button>
      <p className="text-sm">{reviewInterval}</p>
    </div>
  )
}

export default FCLearningDifficultyBtn
