import { useEffect, useState } from "react";
import { Flashcard, Card } from "interfaces/index";
import { getCardList } from "lib/api/card";
import ModalCloseBtn from "components/layouts/ModalCloseBtn";

import { IoIosAddCircle } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";

import { useDispatch } from "react-redux";
import { openModal } from "store/modalSlice";

import { AxiosResponse, AxiosError } from "axios";

import AddBtn from "components/shared/AddBtn";


const CardsList = ({flashcard}:{flashcard:Flashcard}) => {
  const dispatch = useDispatch();

  const [cards, setCards] = useState<Card[]>([]);

  const handleGetCardList = () => {
    getCardList(flashcard.id)
    .then((res: AxiosResponse<Card[]>) => {
      setCards(res.data);
    })
    .catch((e: AxiosError<{ error: string }>) => {
      console.log(e);
    })
  }

  useEffect(() => {
    handleGetCardList();
  }, []);

  return (
    <div data-testid="cards-list-modal">
      <ModalCloseBtn onClose={{modalType: 'flashcard', modalProps: flashcard}}/>
      <div className="p-4 text-center">
        <p className="text-xl">{flashcard.title}</p>
      </div>
      {/* 単語帳内の単語のリストを表示 */}
      <div className="mx-auto h-52 overflow-scroll">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="sticky top-0 bg-red-100 w-1/2">Japanese</th>
              <th className="sticky top-0 bg-blue-100 w-1/2">English</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card, key) => {
              return(
                <tr key={key}
                    onClick={() => dispatch(openModal({modalType: 'cardEdit', modalProps: {flashcard: flashcard, card: card}}))}
                    data-testid={`card-${card.id}`}>
                  <td className="flex"><MdModeEdit/>{card.japanese}</td>
                  <td>{card.english}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="text-right text-auqa-blue text-5xl">
        <AddBtn data-testid="new-card-modal-btn" onClick={() => dispatch(openModal({modalType: 'newCard', modalProps: flashcard}))}/>
      </div>
    </div>
  )
}

export default CardsList
