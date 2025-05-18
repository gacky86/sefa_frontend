import { useState } from 'react';
import Cookies from "js-cookie"
import { Link } from "react-router-dom";

import { signIn } from "lib/api/auth";
import { SignInParams } from "interfaces/index";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, setLoading } from "store/authSlice";

// icons
import { FcGoogle } from "react-icons/fc";



const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const params: SignInParams = {
      email: email,
      password: password
    }

    try {
      const res = await signIn(params)
      dispatch(setLoading(true));
      if (res.status === 200) {
        // ログインに成功した場合はCookieに各値を格納
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        // ログイン成功時のresponseのヘッダー情報をReduxに保存
        const data = res.data;

        // isAuthenticated, isLoadingはreducerで自動的にtrueに設定される
        dispatch(setUser({
          user : data.data,
        }));

        // ルートディレクトリにリダイレクト
        navigate("/")
      }
    } catch (err) {
      console.log(err)
      // loading解除
      dispatch(setLoading(false));
    }
  }

  return (
    <div className='mx-auto text-center w-[300px] text-dark-navy-blue'>
      <h1 className='text-2xl mt-8'>ログイン</h1>
      <div className='mt-12'>
        <input className="bg-white border-1 border-dark-navy-blue rounded-sm w-[90%] p-0.5 mb-2"
               placeholder="メールアドレス"
               type="text"
               id="email" name="email" value={email}
               onChange={(e) => {setEmail(e.target.value)}}/>
        <input className="bg-white border-1 border-dark-navy-blue rounded-sm w-[90%] p-0.5"
               placeholder="パスワード"
               type="password"
               id="password" name="password" value={password}
               onChange={(e) => {setPassword(e.target.value)}}/>
      </div>
      <p className='text-right mt-2.5'>パスワードをお忘れの場合は<Link to="/signup" className='text-auqa-blue cursor-pointer'>こちら</Link></p>
      <button className='text-base text-white bg-auqa-blue px-3 py-1 rounded-sm border-1 border-dark-navy-blue my-5' onClick={handleSubmit}>ログイン</button>

      <p className='text-base border-t-1 leading-[0px] mt-8'><span className='bg-super-light-sky-blue px-4'>または</span></p>
      <div className='mt-16 mb-20'>
        <button className='mx-auto p-2 flex bg-white border-1 border-dark-navy-blue rounded-full text-sm text-gray-800'>
          <FcGoogle className='text-2xl'/><p className='pt-0.5 pl-0.5'>Googleアカウントでログイン</p>
        </button>
      </div>
      <div className='text-base'>
        <p>アカウントをお持ちでない方は
          <Link to="/introduction" className='text-auqa-blue cursor-pointer'>新規登録</Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn
