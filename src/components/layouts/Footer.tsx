// Redux
import { useSelector } from 'react-redux';
import { RootState } from 'store/index';

// react-router-dom
import { Link } from "react-router-dom";

// icons
import { FaYoutube } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";
import { SiWikibooks } from "react-icons/si";
import { FaCircleUser } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa6";
import { useState } from 'react';

// components
import AccountModal from "components/layouts/AccountModal";

const Footer = () => {
  const { isSignedIn } = useSelector((state: RootState) => state.auth);

  // アカウントボタンクリック時のスモールモーダルの表示非表示を管理するstate
  const [hideModal, setHideModal] = useState<boolean>(true);

  return (
    <div className="h-[56px] pt-2 px-5 bg-white border-t-1 border-gray-300 fixed bottom-0 w-screen">
      {isSignedIn ? (
        // ログイン時Footer
        <div className='flex justify-between mx-3'>
          {/* Youtube機能 */}
          <Link to="/yt-learning">
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
      ) : (
        // ログアウト時Footer
        <div className='text-[10px] text-gray-500'>
          <div className='flex justify-center gap-3'>
            <Link to="/terms-of-service">
              利用規約
            </Link>
            <Link to="/privacy-policy">
              プライバシーポリシー
            </Link>
          </div>
          <div className='text-center flex justify-center gap-1'>
            <FaRegCopyright className='mt-[6px]'/>
            <p className='mt-[3px]'>2025 SEFA</p>
            <Link to='https://github.com/gacky86' className='text-black text-base mt-[2px]' target='_blank'>
              <FaGithub />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Footer
