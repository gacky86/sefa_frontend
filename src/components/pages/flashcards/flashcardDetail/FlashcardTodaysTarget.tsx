import { getCountsTodaysCards } from "lib/api/flashcard";
import { Flashcard } from "interfaces/index";
import { useEffect, useState } from "react";


const FlashcardTodaysTarget = ({flashcard}: {flashcard: Flashcard}) => {
  const initialTargetCount = {
    inputNewCardsCount: 0,
    inputReviewCardsCount: 0,
    outputNewCardsCount: 0,
    outputReviewCardsCount: 0,
  }

  const [cardsTargetCount, setCardsTargetCount] = useState(initialTargetCount);

  const getTodaysTarget = async () => {
    try {
      const response = await getCountsTodaysCards(flashcard.id)

      setCardsTargetCount({...cardsTargetCount,
        inputNewCardsCount: response.data.inputCardsCount.newCardsCount,
        inputReviewCardsCount: response.data.inputCardsCount.reviewCardsCount,
        outputNewCardsCount: response.data.outputCardsCount.newCardsCount,
        outputReviewCardsCount: response.data.outputCardsCount.reviewCardsCount});

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTodaysTarget();
  }, []);

  return (
    <div className="border-t-1 mt-2 py-2">
      <h3 className="text-base font-semibold">本日の目標</h3>
      <div className="text-sm text-right grid grid-cols-3 grid-rows-2">
        <div className="pr-5">Input</div>
        <div className="text-red-500">new:{cardsTargetCount.inputNewCardsCount}</div>
        <div className="text-green-700">review:{cardsTargetCount.inputReviewCardsCount}</div>
        <div className="pr-5">Output</div>
        <div className="text-red-500">new:{cardsTargetCount.outputNewCardsCount}</div>
        <div className="text-green-700">review:{cardsTargetCount.outputReviewCardsCount}</div>
      </div>
    </div>
  )
}

export default FlashcardTodaysTarget
