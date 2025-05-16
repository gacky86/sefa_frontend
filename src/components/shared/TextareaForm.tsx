type TextareaFormProps = {
  id: string;
  value: string | undefined | null;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  testid: string;
}

const TextareaForm = ({id, value, placeholder, onChange, testid}: TextareaFormProps) => {
  return (
    <textarea id={id} value={value ?? ''} placeholder={placeholder}
              className="w-[100%] border-1 rounded-sm"
              onChange={onChange}
              data-testid={testid}></textarea>
  )
}

export default TextareaForm
