import { useState } from "react";
import { Flashcard, Card } from "interfaces/index";
import { updateCard, deleteCard } from "lib/api/card";

// components
import ModalCloseBtn from "components/layouts/ModalCloseBtn";
import MainBtn from "components/shared/MainBtn";
import DeleteBtn from "components/shared/DeleteBtn";
import TextareaForm from "components/shared/TextareaForm";

// api
import { AxiosError } from "axios";
import { checkWordExistance } from "lib/api/gemini";

// redux
import { openModal } from "store/modalSlice";
import { useDispatch } from "react-redux";

// utils
import { getLanguageName } from "utils/langNameMapper";

//toast
import { ToastContainer, toast } from "react-toastify";

const CardEdit = ({flashcard, card}: {flashcard: Flashcard, card: Card}) => {
  const dispatch = useDispatch();

  const [cardParams, setCardParams] = useState<Card>(card);
  const [ btnDisabledJp, setBtnDisabledJp ] = useState<boolean>(false);
  const [ btnDisabledEn, setBtnDisabledEn ] = useState<boolean>(false);

  const handleUpdateCard = async () => {
    // cardの入力情報と、Flashcard.languageの整合性を確認
    // trueならそのまま処理を続行
    // falseなら処理をせずに、メッセージを表示
    const isExist = await checkWordExistance(flashcard.language, cardParams.english, cardParams.japanese);
    if(isExist) {
      try {
        updateCard(flashcard.id, card.id, cardParams);
        dispatch(openModal({modalType: 'cardsList', modalProps: flashcard}));
      } catch (error) {
        console.log(error);
      };
    } else {
      toast(`${flashcard.language}には存在しない単語です`, {position: 'bottom-right'});
    }
  }

  const handleDeleteCard = () => {
    deleteCard(flashcard.id, card.id)
    .then(() => {
      console.log('successfully deleted');
      dispatch(openModal({modalType: 'cardsList', modalProps: flashcard}));
    })
    .catch((e: AxiosError) => {
      console.log(e);
    })
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    key: keyof Pick<Card, "japanese"|"english">,
    maxLength: number
  ) => {
    if(e.target.value.length <= maxLength) {
      setCardParams({...cardParams, [key]: e.target.value});
    } else if (maxLength < e.target.value.length) {
      const trimmed = Array.from(e.target.value).slice(0, maxLength).join('');
      setCardParams({...cardParams, [key]: trimmed});
    }
    // 長さが0だとボタンをクリックできないようにする
    if(e.target.value.length !== 0) {
      key === 'japanese' ? setBtnDisabledJp(false) : setBtnDisabledEn(false)
    } else if (e.target.value.length === 0) {
      key === 'japanese' ? setBtnDisabledJp(true) : setBtnDisabledEn(true)
    }
  }

  return (
    <div className="p-2 text-center" data-testid={`edit-card-${card.id}`}>
      <ModalCloseBtn onClose={{modalType: 'cardsList', modalProps: flashcard}}/>
      <p className="text-xl text-center">{flashcard.title}</p>
      <div className="mx-auto">
        <h3>Japanese</h3>
        <div className="mb-3">
          <TextareaForm value={cardParams.japanese} placeholder="日本語の単語・フレーズ"
                        onChange={(e) => handleInputChange(e, "japanese", 255)}
                        id="japanese"
                        testid="edit-card-ja-form"/>
        </div>
        <h3>{getLanguageName(flashcard.language)}</h3>
        <div className="mb-3">
          <TextareaForm value={cardParams.english} placeholder="English word or phrase that correspond to the Japanese"
                        onChange={(e) => handleInputChange(e, "english", 255)}
                        id="english"
                        testid="edit-card-en-form"/>
        </div>
      </div>
      <div className="text-right mx-auto pt-2 pb-5 text-xl">
        <DeleteBtn onClick={() => handleDeleteCard()}/>
      </div>
      <div className='mt-5'>
        <MainBtn onClick={() => handleUpdateCard()} disabled={btnDisabledJp || btnDisabledEn} text={"更新"} data-testid="edit-card-submit-btn" testid="edit-card-submit-btn"/>
      </div>
      <div>
        <ToastContainer />
      </div>
    </div>
  )
}

export default CardEdit
