import { useState } from 'react';
import Cookies from "js-cookie"
import { Link } from "react-router-dom";

import { signUp } from "lib/api/auth";
import { SignUpParams } from "interfaces/index";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, setLoading } from "store/authSlice";

// icons
import { FcGoogle } from "react-icons/fc";


const SignUp: React.FC = () => {

  const initialParams: SignUpParams = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  }

  const [params, setParams] = useState<SignUpParams>(initialParams);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await signUp(params)
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
        // setRegisterBtnClicked(true);
      }
    } catch (err) {
      console.log(err)
      // loading解除
      dispatch(setLoading(false));
    }
  }

  return (
    <div className='mx-auto text-center w-[300px] text-dark-navy-blue'>
      <h1 className='text-2xl mt-8'>新規登録</h1>
        <div className='mt-12'>
          <p><Link to="/terms-of-service" className='text-auqa-blue'>利用規約</Link>および<Link to="/privacy-policy" className='text-auqa-blue'>プライバシーポリシー</Link>に同意した上で、以下の「登録」ボタンを押してください。</p>
        </div>
        <div className='mt-6'>
          <input className="bg-white border-1 border-dark-navy-blue rounded-sm w-[90%] p-0.5 mb-2"
                placeholder="ユーザー名" type="text" id="name" name="name" value={params.name}
                onChange={(e) => {setParams({...params, name: e.target.value})}}/>
          <input className="bg-white border-1 border-dark-navy-blue rounded-sm w-[90%] p-0.5 mb-2"
                placeholder="メールアドレス" type="text" id="email" name="email" value={params.email}
                onChange={(e) => {setParams({...params, email: e.target.value})}}/>
          <input className="bg-white border-1 border-dark-navy-blue rounded-sm w-[90%] p-0.5"
                placeholder="パスワード" type="text" id="password" name="password" value={params.password}
                onChange={(e) => {setParams({...params, password: e.target.value})}}/>
          <p className='text-left text-xs pl-4 font-light'>※英数字を含めた、8文字以上で入力してください</p>
          <input className="bg-white border-1 border-dark-navy-blue rounded-sm w-[90%] p-0.5 mt-2"
                placeholder="パスワード(確認用)" type="text" id="password" name="password" value={params.passwordConfirmation}
                onChange={(e) => {setParams({...params, passwordConfirmation: e.target.value})}}/>
        </div>
        <button className='text-base text-white bg-auqa-blue px-3 py-1 rounded-sm border-1 border-dark-navy-blue my-5' onClick={handleSubmit}>登録</button>

        <p className='text-base border-t-1 leading-[0px] mt-8'><span className='bg-super-light-sky-blue px-4'>または</span></p>
        <div className='mt-16 mb-20'>
          <button className='mx-auto p-2 flex bg-white border-1 border-dark-navy-blue rounded-full text-sm text-gray-800'>
            <FcGoogle className='text-2xl'/><p className='pt-0.5 pl-0.5'>Googleアカウントで登録</p>
          </button>
        </div>
        <div className='text-base font-medium'>
          <p>アカウントをお持ちの方は
            <Link to="/signin" className='text-auqa-blue cursor-pointer'>こちら</Link>
          </p>
        </div>
    </div>
  )
}

export default SignUp
