
import FlashcardCard from "components/pages/flashcards/FlashcardCard";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { RootState, AppDispatch } from 'store/index';
import { fetchFlashcards } from "store/flashcardsSlice";


const FlashcardsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const flashcards = useSelector((state: RootState) => state.flashcards.flashcards);

  useEffect(() => {
    dispatch(fetchFlashcards());
  }, [dispatch])


  return (
    <div data-testid="flashcards-list" className="mx-auto h-[60vh] w-[90%] max-w-[380px] overflow-scroll ">
      {flashcards.map((flashcard, key) => {
        return (
          <FlashcardCard key={key} flashcard={flashcard}/>
        )
      })}

    </div>
  )
}

export default FlashcardsList
