import { useState } from 'react';
import Cookies from "js-cookie"

import { signIn } from "lib/api/auth";
import { SignInParams } from "interfaces/index";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, setLoading } from "store/authSlice";


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
    <div>
      <form action="">
        <label htmlFor="email">E-mail</label>
        <input type="text" id="email" name="email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
        <label htmlFor="password">Password</label>
        <input type="text" id="password" name="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
        <button onClick={handleSubmit}>Sign In</button>
      </form>
    </div>
  )
}

export default SignIn
