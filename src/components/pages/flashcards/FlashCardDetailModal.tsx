import { FaLock } from "react-icons/fa";
import { FlashCard } from "interfaces/index";

import ModalCloseBtn from "components/layouts/ModalCloseBtn";
import FlashcardProficiency from "components/pages/flashcards/flashcardDetail/FlashcardProficiency";
import FlashcardTodaysTarget from "components/pages/flashcards/flashcardDetail/FlashcardTodaysTarget";
import FlashcardLearningStartBtn from "components/pages/flashcards/flashcardDetail/FlashcardLearningStartBtn";
import FlashcardEditBtn from "components/pages/flashcards/flashcardDetail/FlashcardEditBtn";


const FlashCardDetailModal = ({flashcard}:{flashcard:FlashCard}) => {
  return (
    <div className="p-4" data-testid="flashcard-detail">
      <ModalCloseBtn/>
      {flashcard.shared && (<FaLock className="w-[16px]"/>)}
      <p className="text-xl text-center">{flashcard.title}</p>
      <p className="text-sm text-center">{flashcard.description}</p>
      <div className="m-auto w-[90%]">
        <FlashcardProficiency />
        <FlashcardTodaysTarget flashcard={flashcard}/>
        <FlashcardLearningStartBtn flashcard={flashcard}/>
        <FlashcardEditBtn flashcard={flashcard}/>
      </div>
    </div>
  )
};

export default FlashCardDetailModal
