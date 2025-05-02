import FCLearningDifficultyBtn from "components/layouts/footer/FCLearningDifficultyBtn";




const FooterFCLearningAnswer = () => {

  // Reduxに持っているstate.cardから、現在表示しているcardをselectorで読み取る
  // そのカードに対応したreviewInterval(4つの選択肢分)をBackendに計算させるAPIを叩く

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
