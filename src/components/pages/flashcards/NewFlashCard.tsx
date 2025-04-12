import { useState } from 'react'
import { createFlashcard } from "lib/api/flashcard";

// Redux
import { FlashCard } from "interfaces/index";
import { useSelector } from 'react-redux';
import { RootState } from 'store/index';

const NewFlashCard = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const initialFlashcard: FlashCard = {
    id: 0,
    user_id: user.id,
    title: "",
    description: "",
    shared: false,
    input_target: 50,
    output_target: 50
  }

  const [flashcardParams, setFlashcardParams] = useState<FlashCard>(initialFlashcard);

  const handleCreateFlashCard = () => {
    createFlashcard(flashcardParams)
    .then(() => {
      console.log("successfully created");
    })
    .catch((e) => {
      console.log(e);
    })
  }

  return (
    <div>
      <div className="p-4 text-center">
        <p className="text-xl">単語帳を新規作成</p>
        <div className="mx-auto w-[80%] border-b-1 pb-2">
          <input type="text" id="title" value={flashcardParams.title} placeholder="単語帳のタイトル"
            className="w-[100%] border-1 rounded-sm px-1 mt-3 mb-2 "
            onChange={(e) => setFlashcardParams({...flashcardParams, title: e.target.value})}/>
          <textarea id="description" value={flashcardParams.description} placeholder="単語帳の説明"
            className="w-[100%] border-1 rounded-sm"
            onChange={(e) => setFlashcardParams({...flashcardParams, description: e.target.value})}></textarea>
        </div>
        <button className="text-base text-white bg-auqa-blue px-3 py-1 rounded-sm border-1 border-dark-navy-blue mt-8" onClick={() => handleCreateFlashCard()}>新規作成</button>
      </div>
    </div>
  )
}

export default NewFlashCard
