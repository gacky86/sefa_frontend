import FCLearningDifficultyBtn from "components/layouts/footer/FCLearningDifficultyBtn";

const FooterFCLearningAnswer = () => {
  return (
    <div className="w-[300px] mx-auto grid grid-cols-4 grid-rows-1 gap-1">
      <FCLearningDifficultyBtn difficulty="Again" reviewInterval="5m"/>
      <FCLearningDifficultyBtn difficulty="Hard" reviewInterval="10m"/>
      <FCLearningDifficultyBtn difficulty="Good" reviewInterval="1d"/>
      <FCLearningDifficultyBtn difficulty="Easy" reviewInterval="5d"/>
    </div>
  )
}

export default FooterFCLearningAnswer
