import { useState } from "react";
import { FlashCard, Card } from "interfaces/index";
import ModalCloseBtn from "components/layouts/ModalCloseBtn";
import { updateCard, deleteCard } from "lib/api/card";

import { FaRegTrashAlt } from "react-icons/fa";


import { AxiosError } from "axios";

import { openModal } from "store/modalSlice";

import { useDispatch } from "react-redux";

const CardEdit = ({flashcard, card}: {flashcard: FlashCard, card: Card}) => {
  const dispatch = useDispatch();

  const [cardParams, setCardParams] = useState<Card>(card);
  const [ btnDisabledJp, setBtnDisabledJp ] = useState<boolean>(false);
  const [ btnDisabledEn, setBtnDisabledEn ] = useState<boolean>(false);

  const handleUpdateCard = () => {
    updateCard(card.id, cardParams)
    .then(() => {
      console.log('updated');
      dispatch(openModal({modalType: 'cardsList', modalProps: flashcard}));
    })
    .catch((e: AxiosError) => {
      console.log(e);
    })
  }

  const handleDeleteCard = () => {
    deleteCard(card.id)
    .then(() => {
      console.log('successfully deleted');
      dispatch(openModal({modalType: 'cardsList', modalProps: flashcard}));
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
    <div className="p-2 text-center" data-testid={`edit-card-${card.id}`}>
      <ModalCloseBtn onClose={{modalType: 'cardsList', modalProps: flashcard}}/>
      <p className="text-xl text-center">{flashcard.title}</p>
      <div className="mx-auto">
        <h3 >Japanese</h3>
        <textarea id="japanese" value={cardParams.japanese} placeholder="日本語の単語・フレーズ"
                  className="w-[100%] h-28 border-1 rounded-sm my-3 p-1"
                  onChange={(e) => handleInputChange(e, "japanese", 255)}
                  data-testid="edit-card-ja-form"/>
        <h3 >English</h3>
        <textarea id="english" value={cardParams.english} placeholder="English word or phrase that correspond to the Japanese"
                  className="w-[100%] h-28 border-1 rounded-sm p-1"
                  onChange={(e) => handleInputChange(e, "english", 255)}
                  data-testid="edit-card-en-form"/>
      </div>
      <div className="text-right mx-auto pt-2 pb-5">
        <button className="text-xl"
                onClick={() => handleDeleteCard()}
                data-testid="delete-card-btn"><FaRegTrashAlt /></button>
      </div>
      <button
        className={`text-base text-white bg-auqa-blue px-3 py-1 rounded-sm border-1 border-dark-navy-blue mt-5 ${btnDisabledJp || btnDisabledEn ? 'opacity-50': 'opacity-100'}`}
        onClick={() => handleUpdateCard()}
        disabled={btnDisabledJp || btnDisabledEn}
        data-testid="edit-card-submit-btn">更新</button>
    </div>
  )
}

export default CardEdit
