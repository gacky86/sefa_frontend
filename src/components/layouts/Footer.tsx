// Redux
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from 'store/authSlice';
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
  const dispatch = useDispatch();

  // アカウントボタンクリック時のスモールモーダルの表示非表示を管理するstate
  const [accountModal, setAccountModal] = useState<boolean>(false);


  const changeModalState = () => {
    setAccountModal(!accountModal);
    console.log('clicked');
  };

  return (
    <div className="h-[56px] pt-2 px-5 bg-white border-t-1 border-gray-300 absolute bottom-0 w-screen">
      {isSignedIn ? (
        // 各種ボタン
        <div className='flex justify-between mx-3'>
          <Link to="/">
            <FaYoutube className='text-red-500 text-[40px]'/>
          </Link>
          <Link to="/">
            <FcSearch className='text-[40px]'/>
          </Link>
          <Link to="/">
            <SiWikibooks className='text-[40px]'/>
          </Link>
          {/* <Link to="/"> */}
            <FaCircleUser className='text-[36px]' onClick={() => changeModalState()}/>
          {/* </Link> */}
          <AccountModal />
        </div>
      ) : (
        // 利用規約など
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
