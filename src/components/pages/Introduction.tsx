import { Link } from "react-router-dom";


const Introduction = () => {
  return (
    <div className="text-center text-gray-700">
      <div className="w-screen h-[272px] bg-[url(assets/SEFA-heroimage.jpg)] bg-cover relative">
        <h3 className="text-white text-2xl absolute bottom-10 right-2">実践的に英語を学ぶ、</h3>
        <h3 className="text-white text-2xl absolute bottom-2 right-19">スマート単語帳</h3>
      </div>
      <h1 className="mt-5 text-[32px] text-auqa-blue font-light">SEFA</h1>
      <h2 className="text-base text-gray-500 font-light">Smart English Flashcards with AI</h2>
      <h4 className="mt-4">SEFAはAIを使い、より実践的に英語学習をする</h4>
      <h4>新しい形の単語帳です。</h4>
      <Link to="/signup" className='text-base text-white bg-auqa-blue px-3 py-1 rounded-sm border-1 border-dark-navy-blue my-5'>無料で始める</Link>
    </div>
  )
}

export default Introduction
