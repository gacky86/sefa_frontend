import { useDispatch, useSelector } from "react-redux"

import { useEffect } from "react";
import { RootState, AppDispatch } from 'store/index';
import { fetchFlashcards } from "store/flashcardsSlice";
import { setFlashcardId, updateData } from "store/aiDictionarySlice";

// api
import { createCard } from "lib/api/card";

// interfaces
import {CardParams} from 'interfaces/index'

const FlashcardRegisterForm = () => {
  const { response, selectedFlashcardId, searchMode, keyword } = useSelector((state:RootState) => state.aiDictionary);

  const dispatch = useDispatch<AppDispatch>();
  const flashcards = useSelector((state: RootState) => state.flashcards.flashcards);

  useEffect(() => {
    dispatch(fetchFlashcards());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setFlashcardId(flashcards[0].id));
  }, [flashcards]);

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
            english: searchMode === 'ENtoJP' ? keyword : data.wordOrPhrase,
            japanese: searchMode === 'ENtoJP' ? data.wordOrPhrase : keyword,
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
      <h3 className="text-base font-medium mb-2">選択した単語表現を</h3>
      <div className="flex gap-2 justify-between">
        <select name="fc-selector" className="bg-white border-1 border-dark-navy-blue rounded-sm w-[70%]"
                onChange={(e) => dispatch(setFlashcardId(e.target.value))}>
          {/* valueは送信する値 */}
          {/* 表示する値はタグの間のやつ */}
          {flashcards.map((flashcard, key) => {
            return <option value={flashcard.id} key={key}>{flashcard.title}</option>
          })}
        </select>
        <p>へ</p>
        <button className="border-1 border-dark-navy-blue rounded-sm px-1 bg-gray-200 font-medium"
                onClick={() => handleRegisterWords()}>追加</button>
      </div>
    </div>
  )
}

export default FlashcardRegisterForm
