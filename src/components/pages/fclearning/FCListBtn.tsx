import { SiWikibooks } from "react-icons/si";
import { useNavigate } from "react-router-dom";


const FCListBtn = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-20 left-6 text-3xl border-2 border-dark-navy-blue rounded-full p-2 bg-gray-200"
         onClick={() => navigate('/')}>
      <SiWikibooks/>
    </div>
  )
}

export default FCListBtn
