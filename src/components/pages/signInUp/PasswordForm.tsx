import { SignUpParams } from "interfaces/index";
import { useState } from "react";

type PasswordFormProps = {
  params: SignUpParams;
  setParams: React.Dispatch<React.SetStateAction<SignUpParams>>
};

const PasswordForm = ({params, setParams}: PasswordFormProps) => {
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    const hasLetter = /[a-zA-Z]/.test(inputValue);
    const hasNumber = /[0-9]/.test(inputValue);
    const isLongEnough = inputValue.length >= 8;

    if(hasLetter && hasNumber && isLongEnough) {
      setParams({...params, password: e.target.value});
      setIsPasswordValid(true);
    } else {
      setParams({...params, password: e.target.value});
      setIsPasswordValid(false);
    }


  };

  return (
    <div>
      <input className="bg-white border-1 border-dark-navy-blue rounded-sm w-[90%] p-0.5"
             placeholder="パスワード" type="password" id="password" name="password" value={params.password}
             onChange={(e) => handlePasswordInput(e)}/>

      <p className={`text-left text-xs pl-4 font-light ${!isPasswordValid ? 'text-red' : ''}`}>※英数字を含めた、8文字以上で入力してください</p>
      <input className="bg-white border-1 border-dark-navy-blue rounded-sm w-[90%] p-0.5 mt-2"
             placeholder="パスワード(確認用)" type="password" id="password-confirmation" name="password-confirmation" value={params.passwordConfirmation}
             onChange={(e) => {setParams({...params, passwordConfirmation: e.target.value})}}/>
    </div>
  )
}

export default PasswordForm
