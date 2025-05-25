import dogImg from "assets/1057.png";

import MainBtn from "components/shared/MainBtn";
import { useNavigate } from "react-router-dom";

const UnauthorizedError = () => {
  const navigate = useNavigate();

  return (
    <div>
      <img src={dogImg} alt="犬の画像" className="mx-auto h-[300px]" />
      <h3 className="mx-auto text-xl text-auqa-blue text-center">認証エラーが発生しました</h3>
      <h3 className="mx-auto text-xl text-auqa-blue text-center">再ログインしてください</h3>
      <div className="mx-auto text-center">
        <MainBtn text='ログイン画面へ' onClick={() => navigate('/signin')}/>
      </div>
    </div>
  )
}

export default UnauthorizedError
