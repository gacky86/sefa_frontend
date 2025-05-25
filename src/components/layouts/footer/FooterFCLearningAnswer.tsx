// components
import FooterSignedIn from "components/layouts/footer/FooterSignedIn";
import FCLearningDifficultyBtn from "components/layouts/footer/FCLearningDifficultyBtn";

// react
import { useEffect, useState } from "react";

// api
import { getReviewInterval } from "lib/api/card";

// Redux
import { useSelector } from 'react-redux';
import { RootState } from 'store/index';

const FooterFCLearningAnswer = () => {
  const { flashcard, card, learningMode } = useSelector((state: RootState) => state.fcLearning);

  const initialReviewIntervals = {
    againInterval: '-',
    hardInterval: '-',
    goodInterval: '-',
    easyInterval: '-',
  }

  const [ reviewIntervals, setReviewIntervals ] = useState(initialReviewIntervals);

  // Reduxに持っているstate.cardから、現在表示しているcardをselectorで読み取る
  // そのカードに対応したreviewInterval(4つの選択肢分)をBackendに計算させるAPIを叩く
  const handleGetReviewInterval = async () => {
    if(flashcard && card && learningMode) {
      try {
        const res = await getReviewInterval(flashcard.id, card.id, learningMode);
        console.log(res);

        setReviewIntervals({...reviewIntervals,
          againInterval: res.data.intervals.againInterval,
          hardInterval: res.data.intervals.hardInterval,
          goodInterval: res.data.intervals.goodInterval,
          easyInterval: res.data.intervals.easyInterval});

      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    handleGetReviewInterval();
  }, []);


  if(card) {
    return (
      <div className="w-[300px] mx-auto grid grid-cols-4 grid-rows-1 gap-1">
        <FCLearningDifficultyBtn difficulty="Again" reviewInterval={reviewIntervals.againInterval}/>
        <FCLearningDifficultyBtn difficulty="Hard" reviewInterval={reviewIntervals.hardInterval}/>
        <FCLearningDifficultyBtn difficulty="Good" reviewInterval={reviewIntervals.goodInterval}/>
        <FCLearningDifficultyBtn difficulty="Easy" reviewInterval={reviewIntervals.easyInterval}/>
      </div>
    )
  } else {
    return <FooterSignedIn />
  }
}

export default FooterFCLearningAnswer
