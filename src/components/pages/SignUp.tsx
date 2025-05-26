import { useState } from 'react';
import Cookies from "js-cookie"
import { Link } from "react-router-dom";

import { signUp } from "lib/api/auth";
import { SignUpParams } from "interfaces/index";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, setLoading } from "store/authSlice";

// icons
// import { FcGoogle } from "react-icons/fc";

// components
import InputForm from 'components//shared/InputForm'
import MainBtn from 'components//shared/MainBtn'



const SignUp: React.FC = () => {

  const initialParams: SignUpParams = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  }

  const [params, setParams] = useState<SignUpParams>(initialParams);
  const [inputCheck, setInputCheck] = useState<boolean>(true);
  const [validPassword, setValidPassword] = useState<boolean>(true);
  const [passwordCorrespondence, setPasswordCorrespondence] = useState<boolean>(true);


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    // ユーザー入力をチェック
    if (checkParams()) {
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

  }

  const checkParams = () => {
    // 入力されていない項目がないかをチェック
    setInputCheck(params.email.length > 0 &&
                  params.name.length > 0 &&
                  params.password.length > 0 &&
                  params.passwordConfirmation.length > 0);

    // パスワードの条件を確認
    const hasLetter = /[a-zA-Z]/.test(params.password);
    const hasNumber = /[0-9]/.test(params.password);
    const isLongEnough = params.password.length >= 8;
    setValidPassword(hasLetter && hasNumber && isLongEnough);

    // パスワード確認用との一致確認
    setPasswordCorrespondence(params.password === params.passwordConfirmation);

    return inputCheck && validPassword && passwordCorrespondence;
  }

  return (
    <div className='mx-auto text-center w-[300px] text-dark-navy-blue'>
      <h1 className='text-2xl mt-8'>新規登録</h1>
        <div className='mt-12'>
          <p><Link to="/terms-of-service" className='text-auqa-blue'>利用規約</Link>および<Link to="/privacy-policy" className='text-auqa-blue'>プライバシーポリシー</Link>に同意した上で、以下の「登録」ボタンを押してください。</p>
        </div>
        <div className='mt-6'>
          <div className='w-[90%] mb-2 mx-auto'>
            <InputForm value={params.name} id="name" placeholder="ユーザー名" onChange={(e) => {setParams({...params, name: e.target.value})}}/>
          </div>
          <div className='w-[90%] mb-2 mx-auto'>
            <InputForm value={params.email} id="email" placeholder="メールアドレス" onChange={(e) => {setParams({...params, email: e.target.value})}}/>
          </div>
          <div className='w-[90%] mx-auto'>
            <InputForm value={params.password} id="password" type='password' placeholder="パスワード" onChange={(e) => {setParams({...params, password: e.target.value})}}
                       customClass={`${!validPassword || !passwordCorrespondence && "border-red-500"}`}/>
          </div>
          <p className={`text-left text-xs pl-4 font-light ${!validPassword && 'text-red-500'}`}>※英数字を含めた、8文字以上で入力してください</p>
          <div className='w-[90%] mt-2 mx-auto'>
            <InputForm value={params.passwordConfirmation} id="password-confirmation" type='password' placeholder="パスワード(確認用)" onChange={(e) => {setParams({...params, passwordConfirmation: e.target.value})}}/>
          </div>
          {!passwordCorrespondence && <p className='text-left text-xs pl-4 font-light text-red-500'>パスワードが一致しません。</p>}
        </div>
        {inputCheck ? (
          <></>
        ) : (
          <div>
            <p className='text-left text-xs pl-4 font-light text-red-500'>未入力の項目があります。ご確認ください。</p>
          </div>
        )}
        <div className='mt-5'>
          <MainBtn onClick={() => handleSubmit()} text='登録'/>
        </div>

        {/* <p className='text-base border-t-1 leading-[0px] mt-8'><span className='bg-super-light-sky-blue px-4'>または</span></p>
        <div className='mt-16 mb-20'>
          <button className='mx-auto p-2 flex bg-white border-1 border-dark-navy-blue rounded-full text-sm text-gray-800'>
            <FcGoogle className='text-2xl'/><p className='pt-0.5 pl-0.5'>Googleアカウントで登録</p>
          </button>
        </div> */}
        <div className='text-base font-medium mb-5'>
          <p>アカウントをお持ちの方は
            <Link to="/signin" className='text-auqa-blue cursor-pointer'>こちら</Link>
          </p>
        </div>
    </div>
  )
}

export default SignUp
