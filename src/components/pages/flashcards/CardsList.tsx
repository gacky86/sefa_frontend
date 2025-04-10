import { FlashCard, Card } from "../../../interfaces/index";

import { IoIosAddCircle } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";

import { useDispatch } from "react-redux";
import { openModal } from "../../../store/modalSlice";

// データベースから持ってくる予定のcard object
const cards = [{
  id: 0,
  flashcard_id: 0,
  input_proficiency: 50,
  output_proficiency: 50,
  english: 'englishword',
  japanese: '日本語の文字列',
  },
  {
  id: 1,
  flashcard_id: 0,
  input_proficiency: 50,
  output_proficiency: 50,
  english: 'deprived of sleep',
  japanese: '寝不足',
}]

const CardsList = ({flashcard}:{flashcard:FlashCard}) => {
  const dispatch = useDispatch();
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
                onClick={() => dispatch(openModal({modalType: 'newCard'}))}><IoIosAddCircle/></button>
      </div>
    </div>
  )
}

export default CardsList
