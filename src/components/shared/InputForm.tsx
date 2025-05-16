type InputProps = {
  value: string | undefined | null;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  testid: string;
}

const InputForm = ({value, placeholder, onChange, testid}: InputProps) => {
  return (
    <input type="text" id="title" value={value ?? ''} placeholder={placeholder}
           className="w-[100%] border-1 rounded-sm px-1"
           onChange={onChange}
           data-testid={testid}/>
  )
}

export default InputForm
