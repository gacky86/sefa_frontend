import { MdModeEdit } from "react-icons/md";

const CardEditBtn = () => {
  return (
    <div className="fixed bottom-20 right-6 text-3xl border-2 border-dark-navy-blue rounded-full p-2 bg-gray-200"
         onClick={() => console.log('このカードの編集画面へ遷移する')}>
      <MdModeEdit/>
    </div>
  )
}

export default CardEditBtn
