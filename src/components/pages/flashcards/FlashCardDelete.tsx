import { FlashCard } from "../../../interfaces/index";

const FlashCardDeleteModal = ({flashcard}:{flashcard:FlashCard}) => {
  return (
    <div className="p-2">
      <p className="text-xl text-center">単語帳の削除</p>
      <div className="my-2">
        <p>単語帳<span className="text-auqa-blue">{flashcard.title}</span>を削除しますか？</p>
        <p>削除した単語帳に登録済みの単語も削除されます。</p>
      </div>
      <div className="text-center pt-15">
        <button className="text-base text-white bg-auqa-blue px-3 py-1 rounded-sm mb-3 border-1 border-dark-navy-blue">削除する</button>
      </div>
    </div>
  )
}

export default FlashCardDeleteModal
