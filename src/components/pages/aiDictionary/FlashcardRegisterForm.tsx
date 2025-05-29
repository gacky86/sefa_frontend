import { useEffect, useState } from "react";

// redux
import { useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from 'store/index';
import { fetchFlashcards } from "store/flashcardsSlice";
import { setFlashcardId, updateData } from "store/aiDictionarySlice";
import { openModal } from "store/modalSlice";

// api
import { createCard } from "lib/api/card";

// interfaces
import {CardParams, Flashcard} from 'interfaces/index'

// components
import MainBtn from "components/shared/MainBtn";
import Modal from "components/layouts/Modal";

const FlashcardRegisterForm = () => {
  const { response, selectedFlashcardId, language } = useSelector((state:RootState) => state.aiDictionary);

  const dispatch = useDispatch<AppDispatch>();
  const flashcards = useSelector((state: RootState) => state.flashcards.flashcards);

  const [ languageFlashcards, setLanguageFlashcards ] = useState<Flashcard[]>([]);

  // flashcardsSliceのflashcardsをデータベースから取得する
  useEffect(() => {
    dispatch(fetchFlashcards());
  }, []);

  // flashcardsSliceのflashcardsが更新されたら、最初のflashcardsがselectされる
  // flashcardsSliceのflashcardsの中から、languageが一致するものだけをここで抽出する->slectのoptionに表示
  // aiDictionarySliceのlanguageが更新されたら、flashcardsも選び直す
  useEffect(() => {
    const filteredFlashcards = flashcards.filter((flashcard) => flashcard.language === language);
    setLanguageFlashcards(filteredFlashcards);
    languageFlashcards.length > 0 && dispatch(setFlashcardId(languageFlashcards[0].id));
  }, [flashcards, language]);

  const handleRegisterWords = () => {
    // storeのresponseを取得(Selectorで監視)
    // responseをループ処理して、data.checkedがtrueのものだけを抽出して新しいリストを作成する
    // selectorでユーザーがselectしているFCをstoreから取得する
    // 新しいリストをループ処理して、それぞれ指定したFCに登録する。(create Card)
    // 各ループごとに、処理が成功したらstoreのdata.registeredをtrueにupdateする。
    if(Array.isArray(response) && response.length > 0 && typeof selectedFlashcardId === 'number') {
      response.forEach((data, key) => {
        if(data.checked) {
          const params: CardParams = {
            inputProficiency: 0,
            outputProficiency: 0,
            english: data.wordOrPhrase,
            japanese: data.japanese,
            context: data.context,
          }
          handleCreateCard(selectedFlashcardId, params);
          // 要修正：登録の成功失敗によって表示の切り替えが必要かも
          dispatch(updateData({id: key, data: {...data, registered: !data.registered}}));
        }
      })
    }
  }

  const handleCreateCard = async (flashcardId: number, cardParams: CardParams) => {
    try {
      const res = await createCard(flashcardId, cardParams);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mt-5 mb-5 w-[90%] mx-auto">
      {languageFlashcards.length > 0 ? (
        <>
        <h3 className="text-base font-medium mb-2">選択した単語表現を</h3>
        <div className="flex gap-2 justify-between">
          <select name="fc-selector" className="bg-white border-1 border-dark-navy-blue rounded-sm w-[70%]"
                  onChange={(e) => dispatch(setFlashcardId(e.target.value))}>
            {/* flashcardsの中から、languageが一致するものだけを抽出して選択肢 */}
            {/* 一致するものがない場合は、このフォームの代わりに、「言語が一致する単語帳がありません」とメッセージを表示する */}
            {languageFlashcards.map((flashcard, key) => {
              return <option value={flashcard.id} key={key}>{flashcard.title}</option>
            })}
          </select>
          <p>へ</p>
          <button className="border-1 border-dark-navy-blue rounded-sm px-1 bg-gray-200 font-medium"
                  onClick={() => handleRegisterWords()}>追加</button>
        </div>
        </>
      ) : (
        <h3 className="text-base font-medium mb-2">言語設定が一致する単語帳が見つかりません</h3>
      )}
      <div className="mt-3 text-center">
        <MainBtn onClick={() => dispatch(openModal({modalType: 'newFlashcard'}))} text="単語帳を新規作成"/>
        <Modal />
      </div>
    </div>
  )
}

export default FlashcardRegisterForm
