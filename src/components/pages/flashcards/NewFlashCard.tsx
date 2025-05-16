import { useState } from 'react'
import { createFlashcard } from "lib/api/flashcard";

// components
import InputForm from "components/shared/InputForm";
import TextareaForm from "components/shared/TextareaForm";
import ModalCloseBtn from "components/layouts/ModalCloseBtn";
import MainBtn from "components/shared/MainBtn";

// Redux
import { FlashcardParams } from "interfaces/index";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/index';
import { closeModal } from "store/modalSlice";
import { addFlashcard } from "store/flashcardsSlice";

const NewFlashcard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [ btnDisabled, setBtnDisabled ] = useState<boolean>(true);

  // initialFlashcard
  if (!user) return null;

  const initialFlashcard: FlashcardParams = {
    title: "",
    description: "",
    shared: false,
    inputTarget: 50,
    outputTarget: 50
  }

  const [flashcardParams, setFlashcardParams] = useState<FlashcardParams>(initialFlashcard);

  const handleCreateFlashcard = () => {
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
    key: keyof Pick<FlashcardParams, "title"|"description">,
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
          <div className="mt-3 mb-2">
            <InputForm value={flashcardParams.title} placeholder="単語帳のタイトル"
                      onChange={(e) => handleInputChange(e, 'title', 60)}
                      testid="flashcard-title-form"/>
          </div>
          <div>
            <TextareaForm value={flashcardParams.description} placeholder="単語帳の説明"
                          onChange={(e) => handleInputChange(e, 'description', 120)}
                          id="description"
                          testid="flashcard-description-form"/>
          </div>
        </div>
        <MainBtn onClick={() => handleCreateFlashcard()} disabled={btnDisabled} text="新規作成" testid="new-flashcard-submit-btn"/>
      </div>
    </div>
  )
}

export default NewFlashcard
