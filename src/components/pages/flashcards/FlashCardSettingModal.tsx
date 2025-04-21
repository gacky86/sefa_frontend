import { useState } from "react";
import { FlashCard } from "../../../interfaces/index";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { openModal } from "store/modalSlice";

import { updateFlashcard } from "lib/api/flashcard";

import { AxiosError } from "axios";

import ModalCloseBtn from "components/layouts/ModalCloseBtn";


const FlashCardSettingModal = ({flashcard}: {flashcard:FlashCard}) => {
  const [flashcardParams, setFlashcardParams] = useState<FlashCard>(flashcard);

  const dispatch = useDispatch();

  const handleUpdateFlashCard = () => {
    updateFlashcard(flashcard.id, flashcardParams)
    .then(() => {
      console.log('updated');
    })
    .catch((e: AxiosError) => {
      console.log(e);
    })
  }

  return (
    <div data-testid="flashcard-edit-modal">
      <ModalCloseBtn onClose={{modalType: 'flashcard', modalProps: flashcard}}/>
      <div className="p-4 text-center">
        <p className="text-xl">編集</p>
        <div className="mx-auto w-[80%] border-b-1 pb-2">
          <input type="text" id="title" value={flashcardParams.title} placeholder="単語帳のタイトル"
          className="w-[100%] border-1 rounded-sm px-1 mt-3 mb-2 "
          onChange={(e) => setFlashcardParams({...flashcardParams, title: e.target.value})}
          data-testid="flashcard-title-form"/>
          <textarea id="description" value={flashcardParams.description} placeholder="単語帳の説明"
          className="w-[100%] border-1 rounded-sm"
          onChange={(e) => setFlashcardParams({...flashcardParams, description: e.target.value})}
          data-testid="flashcard-description-form"></textarea>
        </div>
        <div className="mx-auto w-[80%] border-b-1 py-3 grid grid-cols-2 grid-rows-1 content-between ">
          <div>
            <p className="text-left leading-none">公開 : {flashcardParams.shared ? 'ON' : 'OFF'}</p>
          </div>
          <div className="flex justify-end">
            <div>
              <span onClick={() => setFlashcardParams({...flashcardParams, shared: !flashcardParams.shared})}
              className={`block w-[2em] cursor-pointer rounded-full p-[1px] transition-colors duration-300
              ${flashcardParams.shared ? 'bg-blue-500' : 'bg-gray-500'}`}
              data-testid="flashcard-share-toggle">
                <span className={`block h-[1em] w-[1em] rounded-full bg-white transition-transform duration-300
                ${flashcardParams.shared ? 'translate-x-[calc(100%-2px)]' : 'translate-x-0'}`}/>
              </span>
            </div>
          </div>
        </div>
        <div className="mx-auto w-[80%] py-3 border-b-1">
          <h3 className="text-left mb-1">一日の目標学習量</h3>
          <div className="grid grid-cols-2 grid-rows-2 gap-2">
              <div className="-leading-1 text-start">Input</div>
              <div>
                <input type="number" id="input-target" value={flashcardParams.inputTarget}
                className="border-1 rounded-sm px-1 w-[75%] mr-1"
                onChange={(e) => setFlashcardParams({...flashcardParams, inputTarget: Number(e.target.value)})}
                data-testid="flashcard-input-target-form"/>
                枚
              </div>
              <div className="-leading-1 text-start">Output</div>
              <div>
                <input type="number" id="output-target" value={flashcardParams.outputTarget}
                className="border-1 rounded-sm px-1 w-[75%] mr-1"
                onChange={(e) => setFlashcardParams({...flashcardParams, outputTarget: Number(e.target.value)})}
                data-testid="flashcard-output-target-form"/>
                枚
              </div>
          </div>
        </div>
        <div className="text-right w-[80%] mx-auto pt-2 pb-5">
          <button className="text-xl"
                  onClick={() => dispatch(openModal({modalType:'flashcardDelete', modalProps: flashcard}))}
                  data-testid="delete-flashcard-modal-btn"><FaRegTrashAlt /></button>
        </div>
        <button className="text-base text-white bg-auqa-blue px-3 py-1 rounded-sm border-1 border-dark-navy-blue"
                onClick={() => handleUpdateFlashCard()}
                data-testid="update-flashcard-submit-btn">更新</button>
      </div>
    </div>
  )
}

export default FlashCardSettingModal
