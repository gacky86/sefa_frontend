type TargetSettingFormProps = {
  value: number;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  testid: string;
}

const TargetSettingForm = ({value, id, onChange, testid}: TargetSettingFormProps) => {

  return (
    <div>
      <input type="number" id={id} value={value} max="999" min="10"
      className="border-1 rounded-sm px-1 w-[75%] mr-1"
      onChange={onChange}
      data-testid={testid}/>
      枚
    </div>
  )
}

export default TargetSettingForm
