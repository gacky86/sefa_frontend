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

  const handleCreateCard = () => {
    console.log('handleCreateCard');
    createCard(cardParams)
    .then(() => {
      console.log('successfully created a new card');

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
    }
  }

  return (
    <div className="p-2 text-center" data-testid="new-card-modal">
      <ModalCloseBtn onClose={{modalType: 'cardsList', modalProps: flashcard}}/>
      <p className="text-xl text-center">{flashcard.title}</p>
      <div className="mx-auto">
        <textarea id="japanese" value={cardParams.japanese} placeholder="日本語の単語・フレーズ"
                  className="w-[100%] h-28 border-1 rounded-sm my-3 p-1"
                  onChange={(e) => handleInputChange(e, "japanese", 255)}
                  data-testid="new-card-ja-form"/>
        <textarea id="english" value={cardParams.english} placeholder="English word or phrase that correspond to the Japanese"
                  className="w-[100%] h-28 border-1 rounded-sm p-1"
                  onChange={(e) => handleInputChange(e, "english", 255)}
                  data-testid="new-card-en-form"/>
      </div>
      <button className="text-base text-white bg-auqa-blue px-3 py-1 rounded-sm border-1 border-dark-navy-blue mt-5"
              onClick={() => handleCreateCard()}
              data-testid="new-card-submit-btn">追加</button>
    </div>
  )
}

export default NewCard
