import FlaschcardProficiencyBar from "components/pages/flashcards/FlaschcardProficiencyBar";

import { getFlashcardProficiency } from "lib/api/flashcard";
import { FlashCard } from "interfaces/index";
import { useEffect, useState } from "react";


const FlashcardCardProficiency = ({flashcard}: {flashcard: FlashCard}) => {
  const initialProficiencies = {
    inputProficiency: '0',
    outputProficiency: '0',
  }

  const [proficiencies, setProficiencies] = useState(initialProficiencies);

  const handleGetFlashcardProficiency = async () => {
    try {
      const response = await getFlashcardProficiency(flashcard.id)
      setProficiencies({...proficiencies,
        inputProficiency: response.data.inputProficiency,
        outputProficiency: response.data.outputProficiency,
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetFlashcardProficiency();
  }, []);

  return (
    <>
      <div className="col-span-5 col-start-6 ml-[3px] text-left">習熟度</div>
      <div className="col-span-2 col-start-6 row-start-2 ml-[6px] leading-none text-start">Input</div>
      <div className="col-span-3 col-start-8 row-start-2 flex items-center">
        <FlaschcardProficiencyBar proficiency={proficiencies.inputProficiency}/>
      </div>
      <div className="col-span-2 col-start-6 row-start-3 ml-[6px] leading-none text-start">Output</div>
      <div className="col-span-3 col-start-8 row-start-3 flex items-center">
        <FlaschcardProficiencyBar proficiency={proficiencies.outputProficiency}/>
      </div>
    </>
  )
}

export default FlashcardCardProficiency
