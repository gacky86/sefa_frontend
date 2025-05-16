// Redux
import { useDispatch } from "react-redux";
import { openModal } from "store/modalSlice";

import { Flashcard } from "interfaces/index";

// components
import FlashcardCardTitle from "components/pages/flashcards/flashcardCard/FlashcardCardTitle";
import FlashcardCardProficiency from "components/pages/flashcards/flashcardCard/FlashcardCardProficiency";

const FlashcardCard = ({flashcard}:{flashcard:Flashcard}) => {

  const dispatch = useDispatch();

  return (
    <div data-testid="flashcard-card">
      <button className="mx-auto w-[100%] h-[64px] grid grid-cols-10 grid-rows-3 bg-white my-[24px] px-[5px] border-[0.5px] rounded-sm shadow-xl/20"
              onClick={() => dispatch(openModal({modalType: 'flashcard', modalProps: flashcard}))}>
        <FlashcardCardTitle flashcard={flashcard}/>
        <FlashcardCardProficiency flashcard={flashcard}/>
      </button>
    </div>
  )
}

export default FlashcardCard
