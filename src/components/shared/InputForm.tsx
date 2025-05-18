type InputProps = {
  value: string | undefined | null;
  type?: string;
  id: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  testid?: string;
  customClass?: string;
}

const InputForm = ({value, type='text', id, placeholder='', onChange, testid='inputform', customClass=''}: InputProps) => {
  return (
    <input type={type} id={id} value={value ?? ''} placeholder={placeholder}
           className={`w-[100%] border-1 rounded-sm border-dark-navy-blue px-1 py-0.5 bg-white ${customClass}`}
           onChange={onChange}
           data-testid={testid}/>
  )
}

export default InputForm
