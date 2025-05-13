
const FlashcardRegisterForm = () => {
  return (
    <div className="mt-5 w-[90%] mx-auto">
      <h3 className="text-base font-medium mb-2">選択した単語表現を</h3>
      <div className="flex gap-2 justify-between">
        <select name="fc-selector" className="bg-white border-1 border-dark-navy-blue rounded-sm w-[70%]">
          {/* valueは送信する値 */}
          {/* 表示する値はタグの間のやつ */}
          <option value="option1">option1option1option1option1option1option1option1option1</option>
          <option value="option2">option2</option>
        </select>
        <p>へ</p>
        <button className="border-1 border-dark-navy-blue rounded-sm px-1 bg-gray-200 font-medium">追加</button>
      </div>
    </div>
  )
}

export default FlashcardRegisterForm
