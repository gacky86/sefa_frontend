import FlashCardsList from "components/pages/flashcards/FlashCardsList";
import { IoIosAddCircle } from "react-icons/io";
import Modal from "components/layouts/Modal";
import { useDispatch } from "react-redux";
import { openModal } from "store/modalSlice";

import { checkBoolean } from "lib/api/gemini";

const Home = () => {
  const dispatch = useDispatch();

  const geminiTest = async () => {
    try {
      const res = await checkBoolean("次の英単語を使ってランダムな英文とその日本語訳を作成してください。次のJSON schemaで出力してください。{\"type\":\"object\",\"properties\":{\"english\":{\"type\":\"string\"},\"english\":{\"type\":\"string\"}}}", "short of cash");
      console.log(res);

    } catch (error) {
      console.log(error);

    }

  }

  return (
    //
    <div className="mx-auto font-sans text-dark-navy-blue">
      <h1 className="text-h1 text-center mt-[30px] mb-[16px]">単語帳</h1>
      <div className="mx-[30px] text-h3 grid grid-cols-3 gap-3">
        <button className="text-center border-b-2 border-auqa-blue text-auqa-blue">My単語帳</button>
        <button className="text-center border-b-2 border-slate-300">ブックマーク</button>
        <button className="text-center border-b-2 border-slate-300">探す</button>
      </div>
      <button className="fixed bottom-[64px] right-[20px] text-auqa-blue text-5xl" data-testid="new-flashcard-btn"
              onClick={() => dispatch(openModal({modalType: 'newFlashcard'}))}><IoIosAddCircle/></button>
      <div className=" mt-[24px]">
        <FlashCardsList />
        <Modal />
      </div>
      <button onClick={() => geminiTest()}>Geminiになんか言う</button>
    </div>
  )
}

export default Home
