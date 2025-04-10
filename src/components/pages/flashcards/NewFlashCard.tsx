import React, { useState } from 'react'

const NewFlashCard = () => {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();

  const handleCreateFlashCard = () => {
    console.log('create FC');

  }

  return (
    <div>
      <div className="p-4 text-center">
        <p className="text-xl">単語帳を新規作成</p>
        <div className="mx-auto w-[80%] border-b-1 pb-2">
          <input type="text" id="title" value={title} placeholder="単語帳のタイトル" className="w-[100%] border-1 rounded-sm px-1 mt-3 mb-2 " onChange={(e) => setTitle(e.target.value)}/>
          <textarea id="description" value={description} placeholder="単語帳の説明" className="w-[100%] border-1 rounded-sm" onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <button className="text-base text-white bg-auqa-blue px-3 py-1 rounded-sm border-1 border-dark-navy-blue mt-8" onClick={() => handleCreateFlashCard()}>新規作成</button>
      </div>
    </div>
  )
}

export default NewFlashCard
