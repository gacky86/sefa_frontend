import { SlNotebook } from "react-icons/sl";
import { useNavigate } from "react-router-dom";


const FCListBtn = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-20 left-6">
      <div className="mx-auto w-[51px] h-[51px] text-3xl border-2 border-dark-navy-blue rounded-full p-2 bg-white"
          onClick={() => navigate('/')}>
        <SlNotebook/>
      </div>
      <p className="text-sm text-gray-400 mx-auto">単語帳一覧へ</p>
    </div>
  )
}

export default FCListBtn
