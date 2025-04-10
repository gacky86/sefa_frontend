import { useState } from "react";

const NewCard = () => {
  const [japanese, setJapanese] = useState<string>();
  const [english, setEnglish] = useState<string>();

  const handleCreateCard = () => {
    console.log('handleCreateCard');

  }

  return (
    <div className="p-2 text-center">
      <p className="text-xl text-center">Daily conversation</p>
      <div className="mx-auto">
        <textarea id="japanese" value={japanese} placeholder="日本語の単語・フレーズ" className="w-[100%] h-28 border-1 rounded-sm my-3 p-1" onChange={(e) => setJapanese(e.target.value)}/>
        <textarea id="english" value={english} placeholder="English word or phrase that correspond to the Japanese" className="w-[100%] h-28 border-1 rounded-sm p-1" onChange={(e) => setEnglish(e.target.value)}/>
      </div>
      <button className="text-base text-white bg-auqa-blue px-3 py-1 rounded-sm border-1 border-dark-navy-blue mt-5" onClick={() => handleCreateCard()}>追加</button>
    </div>
  )
}

export default NewCard
