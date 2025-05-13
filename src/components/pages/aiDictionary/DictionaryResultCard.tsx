import { MdCheckBox } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

const DictionaryResultCard = () => {
  return (
    <>
      <div className="grid grid-cols-8 grid-rows-2 border-1 border-gray-400 rounded-sm mx-auto w-[90%] mb-2">
        <div className="row-span-2 pl-2 mt-2"><MdCheckBoxOutlineBlank/></div>
        <div className="col-span-7 row-span-2 mr-1">
          <h4 className="border-b-1 border-gray-400">関税</h4>
          <h4 className="text-sm">例文</h4>
          <p>The government imposed a high tariff on imported cars to protect domestic manufacturers.</p>
        </div>
      </div>
      <div className="grid grid-cols-8 grid-rows-2 border-1 border-gray-400 rounded-sm mx-auto w-[90%] mb-2">
        <div className="row-span-2 pl-2 mt-2"><MdCheckBox className="text-auqa-blue"/></div>
        <div className="col-span-7 row-span-2 mr-1">
          <h4 className="border-b-1 border-gray-400">I untderstand how you feel.</h4>
          <h4 className="text-sm">文脈・ニュアンス</h4>
          <p>あなたの気持ちはよくわかるよ。</p>
        </div>
      </div>
    </>
  )
}

export default DictionaryResultCard
