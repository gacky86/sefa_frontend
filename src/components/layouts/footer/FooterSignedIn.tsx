// react-router-dom
import { Link } from "react-router-dom";

// icons
import { FaYoutube } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";
import { SiWikibooks } from "react-icons/si";
import { FaCircleUser } from "react-icons/fa6";
import { useState } from 'react';

// components
import AccountModal from "components/layouts/AccountModal";

const FooterSignedIn = () => {
  // アカウントボタンクリック時のスモールモーダルの表示非表示を管理するstate
  const [hideModal, setHideModal] = useState<boolean>(true);

  return (
    <div className='flex justify-between mx-3'>
      {/* Youtube機能 */}
      <Link to="/yt-searching">
        <FaYoutube className='text-red-500 text-[40px]'/>
      </Link>
      {/* 単語検索機能 */}
      <Link to="/ai-dicrionary">
        <FcSearch className='text-[40px]'/>
      </Link>
      {/* 単語帳一覧（トップページ） */}
      <Link to="/">
        <SiWikibooks className='text-[40px]'/>
      </Link>
      {/* アカウント関連 */}
      <FaCircleUser className='text-[36px]' onClick={() => setHideModal(!hideModal)}/>
        {hideModal ? <></> : <AccountModal setHideModal={setHideModal}/>}

    </div>
  )
}
export default FooterSignedIn
