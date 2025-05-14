import { Link } from "react-router-dom";
import Logo from "assets/SEFA.svg?react";

import TodaysLearningCount from "components/layouts/header/TodaysLearningCount";

// Redux
import { useSelector } from 'react-redux';
import { RootState } from 'store/index';


const Header = () => {
  const { isSignedIn } = useSelector((state: RootState) => state.auth);

  return (
    <div className="h-[50px] bg-white border-b-1 border-gray-300 flex justify-between w-screen fixed top-0 z-50">
      <div>
        <Link to="/">
          <Logo className="w-[50px] h-[50px]"/>
        </Link>
      </div>
      {isSignedIn ? (
        <TodaysLearningCount />
      ) : (
        <div className="text-base mr-3 pt-3">
          <Link to='/signin' className="text-auqa-blue p-3">
            ログイン
          </Link>
          <Link to='/signup' className="bg-auqa-blue text-white px-2 py-1 rounded-[5px] border-1 border-dark-navy-blue">
            新規登録
          </Link>
        </div>
      )}

    </div>
  )
}

export default Header
