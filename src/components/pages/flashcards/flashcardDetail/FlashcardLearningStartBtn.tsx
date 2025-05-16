import { useDispatch } from "react-redux";
import { closeModal } from "store/modalSlice";
import { startLearning } from "store/fcLearningSlice";

import { Flashcard } from "interfaces/index";

import { useNavigate } from "react-router-dom";


const FlashcardLearningStartBtn = ({flashcard}: {flashcard: Flashcard}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const learningStart = (learningMode: 'input'|'output') => {
    dispatch(closeModal());
    dispatch(startLearning({learningMode:learningMode, flashcard: flashcard}));
    navigate('/fc-learning');
  };

  return (
    <div className="border-t-1 mt-2 py-4 text-center">
      <button className="text-base text-white bg-auqa-blue px-3 py-1 rounded-sm mb-3 border-1 border-dark-navy-blue"
              onClick={() => learningStart('input')}>Inputモードで学習</button>
      <button className="text-base text-white bg-auqa-blue px-3 py-1 rounded-sm border-1 border-dark-navy-blue"
              onClick={() => learningStart('output')}>Outputモードで学習</button>
    </div>
  )
}

export default FlashcardLearningStartBtn
