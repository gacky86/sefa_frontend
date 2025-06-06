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
import YTSearching from "components/pages/YTSearching";
import AIDictionary from "components/pages/AIDictionary";
import CommonLayout from "components/layouts/CommonLayout";
import TermsOfService from "components/pages/others/TermsOfService";
import PrivacyPolicy from "components/pages/others/PrivacyPolicy";
import LocationWatcher from "components/layouts/LocationWatcher";
import NotFoundError from "components/pages/errors/NotFoundError";
import ServerError from "components/pages/errors/ServerError";
import UnauthorizedError from "components/pages/errors/UnauthorizedError";


// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/index';
import { setLoading, setUser, clearUser } from "store/authSlice";

// api
import {getCurrentUser} from 'lib/api/auth'


const App: React.FC = () => {
  const dispatch = useDispatch();

  const handleGetCurrentUser = async () => {
    dispatch(setLoading(true));
    try {
      const res = await getCurrentUser()
      if (res?.data.isLogin === true) {
        dispatch(setUser(res?.data.data));
      } else {
        dispatch(clearUser());
      }
    } catch (err) {
      dispatch(clearUser());
    }
  }

  // ユーザー認証情報取得のためのuseEffect
  useEffect(() => {
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
        return <Navigate to="/introduction" />
      }
    } else {
      return <></>
    }
  }

  return (
    <Router>
      <div className='bg-super-light-sky-blue min-h-screen'>
        <CommonLayout>
          <LocationWatcher/>
          {/* isLoading === falseの間はRoutes以下を表示しない */}
          {!isLoading ? (
          <Routes>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/introduction' element={<Introduction/>}/>
            <Route path='/terms-of-service' element={<TermsOfService/>}/>
            <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
            <Route path='/unauthorized' element={<UnauthorizedError/>}/>
            <Route path='/not-found' element={<NotFoundError/>}/>
            <Route path='/server-error' element={<ServerError/>}/>
            <Route element={<Private/>}>
              <Route path='/' element={<Home/>}/>
              <Route path='/setting' element={<Setting/>}/>
              <Route path='/account' element={<Account/>}/>
              <Route path='/fc-learning' element={<FCLearning/>}/>
              <Route path='/yt-searching' element={<YTSearching/>}/>
              <Route path='/yt-learning' element={<YTLearning/>}/>
              <Route path='/ai-dicrionary' element={<AIDictionary/>}/>
            </Route>
            {/* 上記以外の存在しないルートを入力した場合 */}
            <Route path="*" element={<NotFoundError />} />
          </Routes>
          ) : (
            <h2>Loading...</h2>
          )}
        </CommonLayout>
      </div>
    </Router>
  )
}

export default App
