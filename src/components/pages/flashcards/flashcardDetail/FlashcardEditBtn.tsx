import { useDispatch } from "react-redux";
import { openModal } from "store/modalSlice";
import { Flashcard } from "interfaces/index";

const FlashcardEditBtn = ({flashcard}: {flashcard: Flashcard}) => {
  const dispatch = useDispatch();
  return (
    <div className="border-t-1 mt-1 py-4 text-center">
      <button className="text-base bg-gray-200 px-3 py-1 rounded-sm mb-3 border-1 border-dark-navy-blue"
              data-testid="flashcard-edit-btn"
              onClick={() => dispatch(openModal({modalType: 'flashcardSetting', modalProps: flashcard}))}>単語帳設定</button>
      <button className="text-base bg-gray-200 px-3 py-1 rounded-sm mb-3 border-1 border-dark-navy-blue"
              data-testid="card-add-edit-btn"
              onClick={() => dispatch(openModal({modalType: 'cardsList', modalProps: flashcard}))}>単語を追加/編集</button>
    </div>
  )
}

export default FlashcardEditBtn
