
import FlashCardCard from "components/pages/flashcards/FlashCardCard";
// import { getFlashcardList } from "lib/api/flashcard";
import { useEffect } from "react";
// import { FlashCard } from "interfaces/index";

// import { AxiosResponse, AxiosError } from 'axios';
import { useDispatch,useSelector } from "react-redux";
import { RootState, AppDispatch } from 'store/index';
import { fetchFlashcards } from "store/flashcardsSlice";


const FlashcardsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const flashcards = useSelector((state: RootState) => state.flashcards.flashcards);
  // const loading = useSelector((state: RootState) => state.flashcards.loading);

  // const [flashcards, setFlashcards] = useState<FlashCard[]>([]);

  // const handleGetFlashcardList = () => {
  //   getFlashcardList()
  //   .then((res: AxiosResponse<FlashCard[]>) => {
  //     setFlashcards(res.data);
  //   })
  //   .catch((e: AxiosError) => {
  //     console.log(e);
  //   })
  // }

  useEffect(() => {
    // handleGetFlashcardList();
    dispatch(fetchFlashcards());
  }, [dispatch])


  return (
    <div data-testid="flashcards-list">
      {flashcards.map((flashcard, key) => {
        return (
          <FlashCardCard key={key} flashcard={flashcard}/>
        )
      })}

    </div>
  )
}

export default FlashcardsList
