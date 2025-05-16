import { Flashcard } from "interfaces/index";
import { deleteFlashcard } from "lib/api/flashcard";
import ModalCloseBtn from "components/layouts/ModalCloseBtn";

import { AxiosError } from "axios";

import { useDispatch } from 'react-redux';
import { closeModal } from "store/modalSlice";
import { removeFlashcard } from "store/flashcardsSlice";



const FlashcardDeleteModal = ({flashcard}:{flashcard:Flashcard}) => {
  const dispatch = useDispatch();

  const handleDeleteFlashcard = () => {
    deleteFlashcard(flashcard.id)
    .then(() => {
      console.log('successfully deleted');
      dispatch(closeModal());
      // fetchFlashcards(非同期処理)をせずに、先にUIだけ更新できる(楽観的UI)
      dispatch(removeFlashcard(flashcard));
    })
    .catch((e: AxiosError) => {
      console.log(e);
    })
  }


  return (
    <div className="p-2" data-testid="delete-flashcard-modal">
      <ModalCloseBtn onClose={{modalType: 'flashcardSetting', modalProps: flashcard}}/>
      <p className="text-xl text-center">単語帳の削除</p>
      <div className="my-2">
        <p>単語帳<span className="text-auqa-blue">{flashcard.title}</span>を削除しますか？</p>
        <p>削除した単語帳に登録済みの単語も削除されます。</p>
      </div>
      <div className="text-center pt-15">
        <button className="text-base text-white bg-auqa-blue px-3 py-1 rounded-sm mb-3 border-1 border-dark-navy-blue"
                onClick={handleDeleteFlashcard}
                data-testid="delete-flashcard-submit-btn">削除する</button>
      </div>
    </div>
  )
}

export default FlashcardDeleteModal
