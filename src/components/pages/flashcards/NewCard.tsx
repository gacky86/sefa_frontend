import { useState } from "react";

import { createCard } from "lib/api/card";
import { FlashCard, Card } from "interfaces/index";
import ModalCloseBtn from "components/layouts/ModalCloseBtn";

import { AxiosError } from "axios";

const NewCard = ({flashcard}:{flashcard:FlashCard}) => {
  const initialCardParams = {
    id: 0,
    flashcardId: flashcard.id,
    inputProficiency: 0,
    outputProficiency: 0,
    english: "",
    japanese: "",
  }
  const [cardParams, setCardParams] = useState<Card>(initialCardParams);
  const [ btnDisabledJp, setBtnDisabledJp ] = useState<boolean>(true);
  const [ btnDisabledEn, setBtnDisabledEn ] = useState<boolean>(true);

  const handleCreateCard = () => {
    console.log('handleCreateCard');
    createCard(cardParams)
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
    key: keyof Pick<Card, "japanese"|"english">,
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
        <textarea id="japanese" value={cardParams.japanese} placeholder="日本語の単語・フレーズ"
                  className="w-[100%] h-28 border-1 rounded-sm my-3 p-1"
                  onChange={(e) => handleInputChange(e, "japanese", 255)}
                  data-testid="new-card-ja-form"/>
        <h3>English</h3>
        <textarea id="english" value={cardParams.english} placeholder="English word or phrase that correspond to the Japanese"
                  className="w-[100%] h-28 border-1 rounded-sm p-1"
                  onChange={(e) => handleInputChange(e, "english", 255)}
                  data-testid="new-card-en-form"/>
      </div>
      <button className={`text-base text-white bg-auqa-blue px-3 py-1 rounded-sm border-1 border-dark-navy-blue mt-5 ${btnDisabledJp || btnDisabledEn ? 'opacity-50': 'opacity-100'}`}
              onClick={() => handleCreateCard()}
              disabled={btnDisabledJp || btnDisabledEn}
              data-testid="new-card-submit-btn">追加</button>
    </div>
  )
}

export default NewCard
