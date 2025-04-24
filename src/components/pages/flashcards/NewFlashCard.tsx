import { useState } from 'react'
import { createFlashcard } from "lib/api/flashcard";
import ModalCloseBtn from "components/layouts/ModalCloseBtn";

// Redux
import { FlashCard } from "interfaces/index";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/index';
import { closeModal } from "store/modalSlice";
import { addFlashcard } from "store/flashcardsSlice";

const NewFlashCard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [ btnDisabled, setBtnDisabled ] = useState<boolean>(true);

  // initialFlashcard
  if (!user) return null;

  const initialFlashcard: FlashCard = {
    id: 0,
    userId: user.id,
    title: "",
    description: "",
    shared: false,
    inputTarget: 50,
    outputTarget: 50
  }

  const [flashcardParams, setFlashcardParams] = useState<FlashCard>(initialFlashcard);

  const handleCreateFlashCard = () => {
    createFlashcard(flashcardParams)
    .then((res) => {
      dispatch(closeModal());
      // fetchFlashcards(非同期処理)をせずに、先にUIだけ更新できる(楽観的UI)
      dispatch(addFlashcard(res.data));
    })
    .catch((e) => {
      console.log(e);
    })
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof Pick<FlashCard, "title"|"description">,
    maxLength: number
  ) => {
    if(e.target.value.length <= maxLength) {
      setFlashcardParams({...flashcardParams, [key]: e.target.value});
    } else if (maxLength < e.target.value.length) {
      const trimmed = Array.from(e.target.value).slice(0, maxLength).join('');
      setFlashcardParams({...flashcardParams, [key]: trimmed});
    }
    // titleの長さが0だとボタンをクリックできないようにする
    if(key === "title" && e.target.value.length !== 0) {
      setBtnDisabled(false);
    } else if (key === "title" && e.target.value.length === 0) {
      setBtnDisabled(true);
    }
  }

  return (
    <div data-testid="new-flashcard-modal">
      <ModalCloseBtn/>
      <div className="p-4 text-center">
        <p className="text-xl">単語帳を新規作成</p>
        <div className="mx-auto w-[80%] border-b-1 pb-2">
          <input type="text" id="title" value={flashcardParams.title} placeholder="単語帳のタイトル"
            className="w-[100%] border-1 rounded-sm px-1 mt-3 mb-2 "
            onChange={(e) => handleInputChange(e, 'title', 60)}
            data-testid='flashcard-title-form'/>
          <textarea id="description" value={flashcardParams.description} placeholder="単語帳の説明"
            className="w-[100%] border-1 rounded-sm"
            onChange={(e) => handleInputChange(e, 'description', 120)}
            data-testid='flashcard-description-form'></textarea>
        </div>
        <button className={`text-base text-white bg-auqa-blue px-3 py-1 rounded-sm border-1 border-dark-navy-blue mt-8 ${btnDisabled ? 'opacity-50': 'opacity-100'}`}
                onClick={() => handleCreateFlashCard()}
                disabled={btnDisabled}
                data-testid="new-flashcard-submit-btn">新規作成</button>
      </div>
    </div>
  )
}

export default NewFlashCard
