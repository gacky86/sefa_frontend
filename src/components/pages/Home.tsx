import { useDispatch } from "react-redux";
import { openModal } from "store/modalSlice";

// components
import Modal from "components/layouts/Modal";
import AddBtn from "components/shared/AddBtn";
import FlashcardsList from "components/pages/flashcards/FlashcardsList";
import PageTitle from "components/shared/PageTitle";


const Home = () => {
  const dispatch = useDispatch();

  return (
    //
    <div className="mx-auto font-sans text-dark-navy-blue">
      <PageTitle title='単語帳一覧'/>
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
