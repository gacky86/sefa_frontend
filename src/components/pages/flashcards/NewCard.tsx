import { useState } from "react";

// components
import { Flashcard, CardParams } from "interfaces/index";
import ModalCloseBtn from "components/layouts/ModalCloseBtn";
import MainBtn from "components/shared/MainBtn";
import TextareaForm from "components/shared/TextareaForm";

// api
import { createCard } from "lib/api/card";
import { AxiosError } from "axios";

const NewCard = ({flashcard}:{flashcard:Flashcard}) => {
  const initialCardParams = {
    inputProficiency: 0,
    outputProficiency: 0,
    english: "",
    japanese: "",
  }
  const [ cardParams, setCardParams ] = useState<CardParams>(initialCardParams);
  const [ btnDisabledJp, setBtnDisabledJp ] = useState<boolean>(true);
  const [ btnDisabledEn, setBtnDisabledEn ] = useState<boolean>(true);

  const handleCreateCard = () => {
    console.log('handleCreateCard');
    createCard(flashcard.id, cardParams)
    .then(() => {
      console.log('successfully created a new card');
      setCardParams(initialCardParams);
    })
    .catch((e: AxiosError) => {
      console.log(e);
    })
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    key: keyof Pick<CardParams, "japanese"|"english">,
    maxLength: number
  ) => {
    if(e.target.value.length <= maxLength) {
      setCardParams({...cardParams, [key]: e.target.value});
    } else if (maxLength < e.target.value.length) {
      const trimmed = Array.from(e.target.value).slice(0, maxLength).join('');
      setCardParams({...cardParams, [key]: trimmed});
    }
    // 長さが0だとボタンをクリックできないようにする
    if(e.target.value.length !== 0) {
      key === 'japanese' ? setBtnDisabledJp(false) : setBtnDisabledEn(false)
    } else if (e.target.value.length === 0) {
      key === 'japanese' ? setBtnDisabledJp(true) : setBtnDisabledEn(true)
    }
  }

  return (
    <div className="p-2 text-center" data-testid="new-card-modal">
      <ModalCloseBtn onClose={{modalType: 'cardsList', modalProps: flashcard}}/>
      <p className="text-xl text-center">{flashcard.title}</p>
      <div className="mx-auto">
        <h3>Japanese</h3>
        <div className="mb-3">
          <TextareaForm value={cardParams.japanese} placeholder="日本語の単語・フレーズ"
                        onChange={(e) => handleInputChange(e, "japanese", 255)}
                        id="japanese"
                        testid="new-card-ja-form"/>
        </div>
        <h3>English</h3>
        <div className="mb-3">
          <TextareaForm value={cardParams.english} placeholder="English word or phrase that correspond to the Japanese"
                        onChange={(e) => handleInputChange(e, "english", 255)}
                        id="english"
                        testid="new-card-en-form"/>
        </div>
      </div>
      <div className='mt-5'>
        <MainBtn onClick={() => handleCreateCard()} disabled={btnDisabledJp || btnDisabledEn} text="追加" testid="new-card-submit-btn"/>
      </div>
    </div>
  )
}

export default NewCard
