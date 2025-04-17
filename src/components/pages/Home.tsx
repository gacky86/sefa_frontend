import FlashCardsList from "components/pages/flashcards/FlashCardsList";
import { IoIosAddCircle } from "react-icons/io";
import Modal from "components/layouts/Modal";
import { useDispatch } from "react-redux";
import { openModal } from "store/modalSlice";


const Home = () => {
  const dispatch = useDispatch();

  return (
    //
    <div className="mx-auto font-sans text-dark-navy-blue">
      <h1 className="text-h1 text-center mt-[30px] mb-[16px]">単語帳</h1>
      <div className="mx-[30px] text-h3 grid grid-cols-3 gap-3">
        <button className="text-center border-b-2 border-auqa-blue text-auqa-blue">My単語帳</button>
        <button className="text-center border-b-2 border-slate-300">ブックマーク</button>
        <button className="text-center border-b-2 border-slate-300">探す</button>
      </div>
      <button className="fixed bottom-[20px] right-[20px] text-auqa-blue text-5xl" data-testid="new-flashcard-btn"
              onClick={() => dispatch(openModal({modalType: 'newFlashcard'}))}><IoIosAddCircle/></button>
      <div className="mx-[30px] mt-[5px]">
        <FlashCardsList />
        <Modal />
      </div>
    </div>
  )
}

export default Home
