// react-router-dom
import { Link } from "react-router-dom";

// icons
import { FaYoutube } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";
import { SlNotebook } from "react-icons/sl";

import { FaCircleUser } from "react-icons/fa6";

// components
import AccountModal from "components/layouts/AccountModal";

// redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { toggleAccountModal } from "store/accountModalSlice";

const FooterSignedIn = () => {
  const dispatch = useDispatch();
  const { isVisible } = useSelector((state: RootState) => state.accountModal);

  return (
    <div className='flex justify-between mx-auto max-w-[450px]'>
      {/* Youtube機能 */}
      <Link to="/yt-searching">
        <FaYoutube className='text-red-500 text-[30px] mx-auto'/>
        <h6 className="text-xs text-center text-gray-500">Youtube</h6>
      </Link>
      {/* 単語検索機能 */}
      <Link to="/ai-dicrionary">
        <FcSearch className='text-[30px] mx-auto'/>
        <h6 className="text-xs text-center text-gray-500">AI辞書</h6>
      </Link>
      {/* 単語帳一覧（トップページ） */}
      <Link to="/">
        <SlNotebook className='text-[30px] mx-auto'/>
        <h6 className="text-xs text-center text-gray-500">単語帳</h6>
      </Link>
      {/* アカウント関連 */}
      <div>
        <FaCircleUser className='text-[30px] mx-auto' onClick={() => dispatch(toggleAccountModal())}/>
          {isVisible && <AccountModal/>}
        <h6 className="text-xs text-center text-gray-500">アカウント</h6>
      </div>

    </div>
  )
}
export default FooterSignedIn
