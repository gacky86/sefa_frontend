
const FlashcardProficiency = () => {
  return (
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
  )
}

export default FlashcardProficiency
