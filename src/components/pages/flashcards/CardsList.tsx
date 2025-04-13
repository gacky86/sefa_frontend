import { useEffect, useState } from "react";
import { FlashCard, Card } from "../../../interfaces/index";
import { getCardList } from "lib/api/card";

import { IoIosAddCircle } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";

import { useDispatch } from "react-redux";
import { openModal } from "store/modalSlice";

import { AxiosResponse, AxiosError } from "axios";


const CardsList = ({flashcard}:{flashcard:FlashCard}) => {
  const dispatch = useDispatch();

  const [cards, setCards] = useState<Card[]>([]);

  const handleGetCardList = () => {
    getCardList()
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
    <div>
      <div className="p-4 text-center">
        <p className="text-xl">{flashcard.title}</p>
      </div>
      {/* 単語帳内の単語のリストを表示 */}
      <div className="mx-auto h-52 overflow-scroll">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="sticky top-0 bg-red-100">Japanese</th>
              <th className="sticky top-0 bg-blue-100">English</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card, key) => {
              return(
                <tr key={key} onClick={() => dispatch(openModal({modalType: 'cardEdit', modalProps: {flashcard: flashcard, card: card}}))}>
                  <td className="flex"><MdModeEdit/>{card.japanese}</td>
                  <td>{card.english}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="text-right">
        <button className="text-auqa-blue text-5xl"
                onClick={() => dispatch(openModal({modalType: 'newCard', modalProps: flashcard}))}><IoIosAddCircle/></button>
      </div>
    </div>
  )
}

export default CardsList
