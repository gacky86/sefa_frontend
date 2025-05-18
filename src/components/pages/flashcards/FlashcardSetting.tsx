import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "store/modalSlice";
import { editFlashcard } from "store/flashcardsSlice";
import { openModal } from "store/modalSlice";

// interface
import { Flashcard } from "interfaces/index";

// api
import { updateFlashcard } from "lib/api/flashcard";
import { AxiosError } from "axios";

// components
import ModalCloseBtn from "components/layouts/ModalCloseBtn";
import MainBtn from "components/shared/MainBtn";
import DeleteBtn from "components/shared/DeleteBtn";
import InputForm from "components/shared/InputForm";
import TextareaForm from "components/shared/TextareaForm";
import TargetSettingForm from "components/pages/flashcards/flashcardSetting/TargetSettingForm";
// import SharedSettingToggle from "components/pages/flashcards/flashcardSetting/SharedSettingToggle";


const FlashcardSettingModal = ({flashcard}: {flashcard:Flashcard}) => {
  const [flashcardParams, setFlashcardParams] = useState<Flashcard>(flashcard);
  const [ btnDisabled, setBtnDisabled ] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleUpdateFlashcard = () => {
    updateFlashcard(flashcard.id, flashcardParams)
    .then((res) => {
      console.log(res);
      dispatch(closeModal());
      dispatch(editFlashcard(res.data));
    })
    .catch((e: AxiosError) => {
      console.log(e);
    })
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof Pick<Flashcard, "title"|"description">,
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

  const handleTargetInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof Pick<Flashcard, "inputTarget"|"outputTarget">,
  ) => {
    const inputNum = Number(e.target.value);
    if (10 <= inputNum && inputNum <= 999) {
      // 値が規定範囲内であればそのまま反映する
      setFlashcardParams({...flashcardParams, [key]: inputNum});
    } else if (inputNum <= 9) {
      // 最低値を下回った数値の入力の場合は、その最低値+1の数値を代わりに入力する
      setFlashcardParams({...flashcardParams, [key]: 10});
    } else if (1000 <= inputNum) {
      // 最大値を上回った数値の入力の場合は、その最大値-1の数値を代わりに入力する
      setFlashcardParams({...flashcardParams, [key]: 999});
    }
  }

  return (
    <div data-testid="flashcard-edit-modal">
      <ModalCloseBtn onClose={{modalType: 'flashcard', modalProps: flashcard}}/>

      <div className="p-4 text-center">

        <p className="text-xl">編集</p>

        <div className="mx-auto w-[80%] border-b-1 pb-2">
          <div className="mt-3 mb-2">
            <InputForm value={flashcardParams.title} placeholder="単語帳のタイトル" id="title"
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

        {/* 単語帳公開機能は未実装なのでコメントアウト */}
        {/* <SharedSettingToggle shared={flashcardParams.shared} onClick={() => setFlashcardParams({...flashcardParams, shared: !flashcardParams.shared})}/> */}

        <div className="mx-auto w-[80%] py-3 border-b-1">
          <h3 className="text-left mb-1">一日の目標学習量</h3>
          <div className="grid grid-cols-2 grid-rows-2 gap-2">
            <div className="-leading-1 text-start">Input</div>
            <TargetSettingForm value={flashcardParams.inputTarget} id="input-target" onChange={(e) => handleTargetInputChange(e, "inputTarget")} testid="flashcard-input-target-form"/>
            <div className="-leading-1 text-start">Output</div>
            <TargetSettingForm value={flashcardParams.outputTarget} id="output-target" onChange={(e) => handleTargetInputChange(e, "outputTarget")} testid="flashcard-output-target-form"/>
          </div>
        </div>

        <div className="text-right w-[80%] mx-auto pt-2 pb-5 text-xl">
          <DeleteBtn onClick={() => dispatch(openModal({modalType:'flashcardDelete', modalProps: flashcard}))}/>
        </div>

        <MainBtn onClick={() => handleUpdateFlashcard()} disabled={btnDisabled} text="更新" testid="update-flashcard-submit-btn"/>

      </div>
    </div>
  )
}

export default FlashcardSettingModal
