import { FlashCard } from "interfaces/index";
import { deleteFlashcard } from "lib/api/flashcard";
import ModalCloseBtn from "components/layouts/ModalCloseBtn";

import { AxiosError } from "axios";


const FlashCardDeleteModal = ({flashcard}:{flashcard:FlashCard}) => {
  const handleDeleteFlashcard = () => {
    deleteFlashcard(flashcard.id)
    .then(() => {
      console.log('successfully deleted');
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

export default FlashCardDeleteModal
