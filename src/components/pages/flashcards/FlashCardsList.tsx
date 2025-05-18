
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
      {flashcards.length > 0 ? (
        flashcards.map((flashcard, key) => {
          return (
            <FlashcardCard key={key} flashcard={flashcard}/>
          )
        })
      ) : (
        <>
          <h3 className="text-center">単語帳がまだありません。</h3>
          <h3 className="text-center">右下の作成ボタンから単語帳を作成してください。</h3>
        </>
      )}

    </div>
  )
}

export default FlashcardsList
