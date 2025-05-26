import { useNavigate } from "react-router-dom";

// components
import MainBtn from "components/shared/MainBtn";

// images
import imgDictionary from 'assets/Screenshot_dictionary.png'
import imgInput from 'assets/Screenshot_input.png'
import imgOutput from 'assets/Screenshot_output.png'
import imgYoutube from 'assets/Screenshot_youtube.png'
import imgNewFc from 'assets/Screenshot_newfc.png'
import imgFcList from 'assets/Screenshot_fclist.png'

// react icon
import { MdCheck } from "react-icons/md";


const Introduction = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center text-gray-700">
      {/* Hero image */}
      <div className="w-screen h-[272px] bg-[url(assets/SEFA-heroimage.jpg)] bg-cover relative">
        <h3 className="text-white text-2xl absolute bottom-10 right-2">実践的に英語を学ぶ、</h3>
        <h3 className="text-white text-2xl absolute bottom-2 right-19">スマート単語帳</h3>
      </div>

      {/* 見出し */}
      <h1 className="mt-5 text-[32px] text-auqa-blue font-light">SEFA</h1>
      <h2 className="text-base text-gray-500 font-light">Smart English Flashcards with AI</h2>
      <h4 className="mt-4">SEFAはAIを使い、より実践的に語学学習をする</h4>
      <h4>新しい形の単語帳です</h4>

      {/* ログインボタン、アカウント作成ボタン */}
      <div className="my-2">
        <MainBtn text="アカウント作成" onClick={() => navigate('/signup')}/>
      </div>
      <p>または</p>
      <div className="my-2">
        <MainBtn text="ログイン" onClick={() => navigate('/signin')}/>
      </div>

      {/* アプリの使い方詳細 */}
      <div className="mt-5 border-t-1 border-gray-300 w-[90%] mx-auto">
        <h1 className="text-2xl text-auqa-blue">SEFAの機能</h1>
        <div className="mt-3">
          <h2 className="text-xl text-gray-500">1. 単語帳を作成</h2>
          <div className="flex mt-1 justify-center gap-4">
            <img src={imgFcList} alt="単語帳一覧画面" className="h-[300px] border-1 rounded-sm border-gray-500"/>
            <img src={imgNewFc} alt="単語帳新規作成画面" className="h-[300px] border-1 rounded-sm border-gray-500"/>
          </div>
          <div className="mx-auto max-w-[600px]">
            <div className="flex justify-left gap-1">
              <MdCheck className="text-xl text-orange-500 flex-shrink-0"/><p className="text-left">単語帳一覧ページのボタンから単語帳を作成</p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h2 className="text-xl text-gray-500">2. 単語やフレーズを登録</h2>
          <div className="flex mt-1 justify-center gap-4">
            <img src={imgDictionary} alt="AI辞書機能画面" className="h-[300px] border-1 rounded-sm border-gray-500"/>
            <img src={imgYoutube} alt="Youtube学習画面" className="h-[300px] border-1 rounded-sm border-gray-500"/>
          </div>
          <div className="mx-auto max-w-[600px]">
            <div className="flex justify-left gap-1">
              <MdCheck className="text-xl text-orange-500 flex-shrink-0"/><p className="text-left">AI辞書機能で、学習中や会話中に出会った知りたい単語・表現をその場で検索</p>
            </div>
            <div className="flex justify-left gap-1">
              <MdCheck className="text-xl text-orange-500 flex-shrink-0"/><p className="text-left">検索結果を作成済みの単語帳に登録</p>
            </div>
            <div className="flex justify-left gap-1">
              <MdCheck className="text-xl text-orange-500 flex-shrink-0"/><p className="text-left">Youtube学習機能で動画を使った学習中にも、AI辞書機能から単語の検索・登録が可能</p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h2 className="text-xl text-gray-500">3. 単語帳を学習</h2>
          <div className="flex mt-1 justify-center gap-4">
            <img src={imgInput} alt="Inputモード画面" className="h-[300px] border-1 rounded-sm border-gray-500"/>
            <img src={imgOutput} alt="Output画面" className="h-[300px] border-1 rounded-sm border-gray-500"/>
          </div>
          <div className="mx-auto max-w-[600px]">
            <div className="flex justify-left gap-1">
              <MdCheck className="text-xl text-orange-500 flex-shrink-0"/><p className="text-left">登録された単語・フレーズを使ってAIがその場で例文を生成、Input/Outputの両面から学習</p>
            </div>
            <div className="flex justify-left gap-1">
              <MdCheck className="text-xl text-orange-500 flex-shrink-0"/><p className="text-left">Inputモード: 英文から日本語訳を考える</p>
            </div>
            <div className="flex justify-left gap-1">
              <MdCheck className="text-xl text-orange-500 flex-shrink-0"/><p className="text-left">Outputモード: 日本語から英訳する</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Introduction
