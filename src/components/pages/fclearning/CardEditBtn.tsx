import { MdModeEdit } from "react-icons/md";

const CardEditBtn = () => {
  return (
    <div className="fixed bottom-20 right-6">
      <div className="mx-auto w-[51px] h-[51px] text-3xl border-2 border-dark-navy-blue rounded-full p-2 bg-white"
          onClick={() => console.log('このカードの編集画面へ遷移する')}>
        <MdModeEdit/>
      </div>
      <p className="text-sm text-gray-400 mx-auto">編集</p>
    </div>
  )
}

export default CardEditBtn
