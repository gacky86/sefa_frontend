import FlashcardsList from "components/pages/flashcards/FlashcardsList";
import Modal from "components/layouts/Modal";
import { useDispatch } from "react-redux";
import { openModal } from "store/modalSlice";
import AddBtn from "components/shared/AddBtn";


const Home = () => {
  const dispatch = useDispatch();

  return (
    //
    <div className="mx-auto font-sans text-dark-navy-blue">
      <h1 className="text-h1 text-center mt-[30px] mb-[16px]">単語帳一覧</h1>
      <div className="fixed bottom-[64px] right-[20px] text-auqa-blue text-5xl">
        <AddBtn data-testid="new-flashcard-btn" onClick={() => dispatch(openModal({modalType: 'newFlashcard'}))}/>
      </div>
      <div className="mt-[24px]">
        <FlashcardsList />
        <Modal />
      </div>
    </div>
  )
}

export default Home
