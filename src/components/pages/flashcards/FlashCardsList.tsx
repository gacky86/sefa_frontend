
import FlashCardCard from "components/pages/flashcards/FlashCardCard";
import { getFlashcardList } from "lib/api/flashcard";
import { useEffect, useState } from "react";
import { FlashCard } from "interfaces/index";

import { AxiosResponse, AxiosError } from 'axios';


const FlashcardsList = () => {
  const [flashcards, setFlashcards] = useState<FlashCard[]>([]);

  const handleGetFlashcardList = () => {
    getFlashcardList()
    .then((res: AxiosResponse<FlashCard[]>) => {
      setFlashcards(res.data);
      console.log(res);

    })
    .catch((e: AxiosError) => {
      console.log(e);
    })
  }

  useEffect(() => {
    handleGetFlashcardList();
  }, [])


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
