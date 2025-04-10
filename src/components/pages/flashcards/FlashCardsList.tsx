
import FlashCardCard from "./FlashCardCard";


const FlashCardsList = () => {
  const flashcards = [{
    id: 0,
    user_id: 0,
    title: "Daily Conversation",
    description: "日常で使うフレーズ集",
    shared: false,
    input_target: '50',
    output_target: '50',
    input_progress: 45,
    output_progress: 50
  },
  {
    id: 1,
    user_id: 0,
    title: "words in programming",
    description: "プログラミングで使う単語など",
    shared: true,
    input_target: '50',
    output_target: '50',
    input_progress: 80,
    output_progress: 50
  }]


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

export default FlashCardsList
