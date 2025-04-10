import { FaLock } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { openModal } from "../../../store/modalSlice";

import { FlashCard } from "../../../interfaces/index";

const FlashCardDetailModal = ({flashcard}:{flashcard:FlashCard}) => {
  const dispatch = useDispatch();

  return (
    <div className="p-4">
      {flashcard.shared && (<FaLock className="w-[16px]"/>)}
      <p className="text-xl text-center">{flashcard.title}</p>
      <p className="text-sm text-center">{flashcard.description}</p>
      <div className="m-auto w-[90%]">
        <div className="border-t-1 mt-5 py-2">
          <h3 className="text-base font-semibold">習熟度</h3>
          <div className="text-sm grid grid-cols-2 grid-rows-2">
            <div className="text-right pr-5">Input {flashcard.input_progress}%</div>
            <div className="flex items-center">
              <div className="w-[100%] bg-white border-[0.5px] rounded-full h-[10px] text-center">
                <div className={`bg-auqa-blue h-2 rounded-full`} style={{ width: `${flashcard.input_progress}%` }}></div>
              </div>
            </div>
            <div className="row-start-2 text-right pr-5">Output {flashcard.output_progress}%</div>
            <div className="row-start-2 flex items-center">
              <div className="w-[100%] bg-white border-[0.5px] rounded-full h-[10px] text-center">
                <div className={`bg-auqa-blue h-2 rounded-full`} style={{ width: `${flashcard.output_progress}%` }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t-1 mt-2 py-2">
          <h3 className="text-base font-semibold">本日の目標</h3>
          <div className="text-sm text-right grid grid-cols-3 grid-rows-2">
            <div className="pr-5">Input</div>
            <div className="text-red-500">new:20</div>
            <div className="text-green-700">review:30</div>
            <div className="pr-5">Output</div>
            <div className="text-red-500">new:20</div>
            <div className="text-green-700">review:30</div>
          </div>
        </div>
        <div className="border-t-1 mt-2 py-4 text-center">
          <button className="text-base text-white bg-auqa-blue px-3 py-1 rounded-sm mb-3 border-1 border-dark-navy-blue">Inputモードで学習</button>
          <button className="text-base text-white bg-auqa-blue px-3 py-1 rounded-sm border-1 border-dark-navy-blue">Outputモードで学習</button>
        </div>
        <div className="border-t-1 mt-1 py-4 text-center">
          <button className="text-base bg-gray-200 px-3 py-1 rounded-sm mb-3 border-1 border-dark-navy-blue"
                  onClick={() => dispatch(openModal({modalType: 'flashcardSetting', modalProps: flashcard}))}>単語帳設定</button>
          <button className="text-base bg-gray-200 px-3 py-1 rounded-sm mb-3 border-1 border-dark-navy-blue"
                  onClick={() => dispatch(openModal({modalType: 'cardsList', modalProps: flashcard}))}>単語を追加/編集</button>
        </div>
      </div>
    </div>
  )
};

export default FlashCardDetailModal
