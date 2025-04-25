import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useEffect } from 'react';
// components
import SignUp from "components/pages/SignUp";
import SignIn from "components/pages/SignIn";
import Introduction from "components/pages/Introduction";
import Home from "components/pages/Home";
import Setting from "components/pages/Setting";
import Account from "components/pages/Account";
import FCLearning from "components/pages/FCLearning";
import YTLearning from "components/pages/YTLearning";
import AIDictionary from "components/pages/AIDictionary";

import CommonLayout from "components/layouts/CommonLayout";
import TermsOfService from "components/pages/others/TermsOfService";
import PrivacyPolicy from "components/pages/others/PrivacyPolicy";


import { getCurrentUser } from "./lib/api/auth";

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser, setLoading } from 'store/authSlice';
import { RootState } from 'store/index';

const App: React.FC = () => {
  const dispatch = useDispatch();

  // 認証済みのユーザーがいるかどうかチェック
  // 確認できた場合はそのユーザーの情報を取得
  const handleGetCurrentUser = async () => {
    console.log('1 handleGetCurrentUser');
    dispatch(setLoading(true));
    try {

      const res = await getCurrentUser()
      console.log(res);
      if (res?.data.isLogin === true) {
        dispatch(setUser(res?.data.data));
        console.log('setUser');

      } else {
        dispatch(clearUser());
        console.log('clearUser');

      }
    } catch (err) {
      dispatch(clearUser());
    }
  }

  useEffect(() => {
    console.log('useEffect');

    handleGetCurrentUser()
  }, [])


  // ユーザーが認証済みかどうかでルーティングを決定
  // 未認証だった場合は「/signin」ページに促す
  // propsの中のchildrenを分割代入
  // propsの中のchildrenの型を定義したいので、以下のような記述になる
  const { isSignedIn, isLoading } = useSelector((state: RootState) => state.auth);

  const Private = () => {
    if (!isLoading) {
      if (isSignedIn) {
        return <Outlet/>
      } else {
        return <Navigate to="/signin" />
      }
    } else {
      return <></>
    }
  }

  return (
    <Router>
      <div className='bg-super-light-sky-blue h-screen'>
        <CommonLayout>
          <Routes>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/introduction' element={<Introduction/>}/>
            <Route path='/terms-of-service' element={<TermsOfService/>}/>
            <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
            <Route element={<Private/>}>
              <Route path='/' element={<Home/>}/>
              <Route path='/setting' element={<Setting/>}/>
              <Route path='/account' element={<Account/>}/>
              <Route path='/fc-learning' element={<FCLearning/>}/>
              <Route path='/yt-learning' element={<YTLearning/>}/>
              <Route path='/ai-dicrionary' element={<AIDictionary/>}/>
            </Route>
          </Routes>
        </CommonLayout>
      </div>
    </Router>
  )
}

export default App
