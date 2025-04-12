
import FlashCardCard from "components/pages/flashcards/FlashCardCard";
import { getFlashcardList } from "lib/api/flashcard";
import { useEffect, useState } from "react";
import { FlashCard } from "interfaces/index";

import { type AxiosResponse, type AxiosError } from 'axios';


const FlashcardsList = () => {
  const [flashcards, setFlashcards] = useState<FlashCard[]>([]);

  const handleGetFlashcardList = () => {
    getFlashcardList()
    .then((res: AxiosResponse<FlashCard[]>) => {
      setFlashcards(res.data);
    })
    .catch((e: AxiosError<{ error: string }>) => {
      console.log(e);
    })
  }

  useEffect(() => {
    handleGetFlashcardList();
  }, [])


  return (
    <>
      {flashcards.map((flashcard, key) => {
        return (
          <FlashCardCard key={key} flashcard={flashcard}/>
        )
      })}

    </>
  )
}

export default FlashcardsList
