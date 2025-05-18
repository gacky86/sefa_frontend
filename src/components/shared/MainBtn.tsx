type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  text: string;
  testid?: string;
}

const MainBtn = ({onClick, disabled=false, text, testid='submit-btn'}: ButtonProps) => {
  return (
    <button
      className={`text-base text-white bg-auqa-blue px-3 py-1 rounded-sm border-1 border-dark-navy-blue mt-5 ${disabled ? 'opacity-50': 'opacity-100'}`}
      onClick={onClick}
      disabled={disabled}
      data-testid={testid}>{text}</button>
  )
}

export default MainBtn
