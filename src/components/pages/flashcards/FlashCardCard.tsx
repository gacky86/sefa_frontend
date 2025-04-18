import { FaLock } from "react-icons/fa";
// Redux
import { useDispatch } from "react-redux";
import { openModal } from "store/modalSlice";

import { FlashCard } from "interfaces/index";

const FlashCardCard = ({flashcard}:{flashcard:FlashCard}) => {

  const dispatch = useDispatch();

  return (
    <div data-testid="flashcard-card">
      <button className="mx-auto w-[320px] h-[64px] grid grid-cols-10 grid-rows-3 bg-white my-[24px] px-[5px] border-[0.5px] rounded-sm shadow-xl/20"
              onClick={() => dispatch(openModal({modalType: 'flashcard', modalProps: flashcard}))}>
        <div className="col-span-5 row-span-3 flex items-center border-r-1 border-dark-navy-blue my-1">
          {flashcard.shared && (<FaLock className="w-[11px]" aria-label="lock-icon"/>)}
          <p className="text-h3">{flashcard.title}</p>
        </div>
        <div className="col-span-5 col-start-6 ml-[3px] text-left">習熟度</div>
        <div className="col-span-2 col-start-6 row-start-2 ml-[6px] leading-none text-start">Input</div>
        <div className="col-span-3 col-start-8 row-start-2 flex items-center">
          <div className="w-[100%] bg-white border-[0.5px] rounded-full h-[10px] text-center">
            {/* 習熟度は後々計算して出せるようにする */}
            <div className={`bg-auqa-blue h-2 rounded-full`} style={{width: "45%"}}></div>
          </div>
        </div>
        <div className="col-span-2 col-start-6 row-start-3 ml-[6px] leading-none text-start">Output</div>
        <div className="col-span-3 col-start-8 row-start-3 flex items-center">
          <div className="w-[100%] bg-white border-[0.5px] rounded-full h-[10px] text-center">
            {/* 習熟度は後々計算して出せるようにする */}
          <div className={`bg-auqa-blue h-2 rounded-full`} style={{width: "50%"}}></div>
          </div>
        </div>
      </button>
    </div>
  )
}

export default FlashCardCard
