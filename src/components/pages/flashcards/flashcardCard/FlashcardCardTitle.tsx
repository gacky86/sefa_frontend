import { FaLock } from "react-icons/fa";

import { Flashcard } from "interfaces/index";

const FlashcardCardTitle = ({flashcard}: {flashcard: Flashcard}) => {
  return (
    <div className="col-span-5 row-span-3 flex items-center border-r-1 border-dark-navy-blue my-1">
      {flashcard.shared && (<FaLock className="w-[11px]" aria-label="lock-icon"/>)}
      <p className="text-h3">{flashcard.title}</p>
    </div>
  )
}

export default FlashcardCardTitle
