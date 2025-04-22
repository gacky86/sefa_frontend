
import FlashCardCard from "components/pages/flashcards/FlashCardCard";
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
    <div data-testid="flashcards-list" className="mx-auto h-[40vh] w-[90%] overflow-scroll border-1 border-gray-300 rounded-sm">
      {flashcards.map((flashcard, key) => {
        return (
          <FlashCardCard key={key} flashcard={flashcard}/>
        )
      })}

    </div>
  )
}

export default FlashcardsList
