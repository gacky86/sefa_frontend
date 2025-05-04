import FlaschcardProficiencyBar from "components/pages/flashcards/FlaschcardProficiencyBar";
import { getFlashcardProficiency } from "lib/api/flashcard";
import { FlashCard } from "interfaces/index";
import { useEffect, useState } from "react";

const FlashcardProficiency = ({flashcard}: {flashcard: FlashCard}) => {
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
    <div className="border-t-1 mt-5 py-2">
      <h3 className="text-base font-semibold">習熟度</h3>
      <div className="text-sm grid grid-cols-2 grid-rows-2">
        {/* 習熟度は後々計算で出せるようにする */}
        <div className="text-right pr-5">Input {proficiencies.inputProficiency}%</div>
        <div className="flex items-center">
          <FlaschcardProficiencyBar proficiency={proficiencies.inputProficiency}/>
        </div>
        {/* 習熟度は後々計算で出せるようにする */}
        <div className="row-start-2 text-right pr-5">Output {proficiencies.outputProficiency}%</div>
        <div className="row-start-2 flex items-center">
          <FlaschcardProficiencyBar proficiency={proficiencies.outputProficiency}/>
        </div>
      </div>
    </div>
  )
}

export default FlashcardProficiency
