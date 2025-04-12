import { useState } from "react";

import { createCard } from "lib/api/card";
import { FlashCard, Card } from "interfaces/index";

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
    .catch((e) => {
      console.log(e);
    })
  }

  return (
    <div className="p-2 text-center">
      <p className="text-xl text-center">{flashcard.title}</p>
      <div className="mx-auto">
        <textarea id="japanese" value={cardParams.japanese} placeholder="日本語の単語・フレーズ" className="w-[100%] h-28 border-1 rounded-sm my-3 p-1" onChange={(e) => setCardParams({...cardParams, japanese: e.target.value})}/>
        <textarea id="english" value={cardParams.english} placeholder="English word or phrase that correspond to the Japanese" className="w-[100%] h-28 border-1 rounded-sm p-1" onChange={(e) => setCardParams({...cardParams, english: e.target.value})}/>
      </div>
      <button className="text-base text-white bg-auqa-blue px-3 py-1 rounded-sm border-1 border-dark-navy-blue mt-5" onClick={() => handleCreateCard()}>追加</button>
    </div>
  )
}

export default NewCard
