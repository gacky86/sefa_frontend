import { FaLock } from "react-icons/fa";
import { Flashcard } from "interfaces/index";

import ModalCloseBtn from "components/layouts/ModalCloseBtn";
import FlashcardProficiency from "components/pages/flashcards/flashcardDetail/FlashcardProficiency";
import FlashcardTodaysTarget from "components/pages/flashcards/flashcardDetail/FlashcardTodaysTarget";
import FlashcardLearningStartBtn from "components/pages/flashcards/flashcardDetail/FlashcardLearningStartBtn";
import FlashcardEditBtn from "components/pages/flashcards/flashcardDetail/FlashcardEditBtn";


const FlashcardDetailModal = ({flashcard}:{flashcard:Flashcard}) => {
  return (
    <div className="p-4" data-testid="flashcard-detail">
      <ModalCloseBtn/>
      {flashcard.shared && (<FaLock className="w-[16px]"/>)}
      <p className="text-xl text-center">{flashcard.title}</p>
      <p className="text-sm text-center">{flashcard.description}</p>
      <p className="text-sm text-center">{`設定言語：${flashcard.language}`}</p>
      <div className="m-auto w-[90%]">
        <FlashcardProficiency flashcard={flashcard}/>
        <FlashcardTodaysTarget flashcard={flashcard}/>
        <FlashcardLearningStartBtn flashcard={flashcard}/>
        <FlashcardEditBtn flashcard={flashcard}/>
      </div>
    </div>
  )
};

export default FlashcardDetailModal
