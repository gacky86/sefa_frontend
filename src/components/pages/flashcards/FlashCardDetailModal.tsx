import { FaLock } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { closeModal, openModal } from "store/modalSlice";
import { startLearning } from "store/fcLearningSlice";

import { FlashCard } from "interfaces/index";

import ModalCloseBtn from "components/layouts/ModalCloseBtn";
import { useNavigate } from "react-router-dom";

const FlashCardDetailModal = ({flashcard}:{flashcard:FlashCard}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const learningStart = (learningMode: 'input'|'output') => {
    dispatch(closeModal());
    dispatch(startLearning({learningMode:learningMode, flashcard: flashcard}));
    navigate('/fc-learning');
  };

  return (
    <div className="p-4" data-testid="flashcard-detail">
      <ModalCloseBtn/>
      {flashcard.shared && (<FaLock className="w-[16px]"/>)}
      <p className="text-xl text-center">{flashcard.title}</p>
      <p className="text-sm text-center">{flashcard.description}</p>
      <div className="m-auto w-[90%]">
        <div className="border-t-1 mt-5 py-2">
          <h3 className="text-base font-semibold">習熟度</h3>
          <div className="text-sm grid grid-cols-2 grid-rows-2">
            {/* 習熟度は後々計算で出せるようにする */}
            <div className="text-right pr-5">Input 45%</div>
            <div className="flex items-center">
              <div className="w-[100%] bg-white border-[0.5px] rounded-full h-[10px] text-center">
                {/* 習熟度は後々計算で出せるようにする */}
                <div className={`bg-auqa-blue h-2 rounded-full`} style={{width: "45%"}}></div>
              </div>
            </div>
            {/* 習熟度は後々計算で出せるようにする */}
            <div className="row-start-2 text-right pr-5">Output 50%</div>
            <div className="row-start-2 flex items-center">
              <div className="w-[100%] bg-white border-[0.5px] rounded-full h-[10px] text-center">
                {/* 習熟度は後々計算で出せるようにする */}
                <div className={`bg-auqa-blue h-2 rounded-full`} style={{width: "50%"}}></div>
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
          <button className="text-base text-white bg-auqa-blue px-3 py-1 rounded-sm mb-3 border-1 border-dark-navy-blue"
                  onClick={() => learningStart('input')}>Inputモードで学習</button>
          <button className="text-base text-white bg-auqa-blue px-3 py-1 rounded-sm border-1 border-dark-navy-blue"
                  onClick={() => learningStart('output')}>Outputモードで学習</button>
        </div>
        <div className="border-t-1 mt-1 py-4 text-center">
          <button className="text-base bg-gray-200 px-3 py-1 rounded-sm mb-3 border-1 border-dark-navy-blue"
                  data-testid="flashcard-edit-btn"
                  onClick={() => dispatch(openModal({modalType: 'flashcardSetting', modalProps: flashcard}))}>単語帳設定</button>
          <button className="text-base bg-gray-200 px-3 py-1 rounded-sm mb-3 border-1 border-dark-navy-blue"
                  data-testid="card-add-edit-btn"
                  onClick={() => dispatch(openModal({modalType: 'cardsList', modalProps: flashcard}))}>単語を追加/編集</button>
        </div>
      </div>
    </div>
  )
};

export default FlashCardDetailModal
