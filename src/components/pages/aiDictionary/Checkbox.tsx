import { MdCheckBox } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

const Checkbox = ({checked, setChecked}:{checked: boolean, setChecked: () => void}) => {
  return (
    <>
      {checked ? (
        <MdCheckBox className="text-auqa-blue" onClick={() => setChecked()}/>
      ) : (
        <MdCheckBoxOutlineBlank onClick={() => setChecked()}/>
      )}
    </>
  )
}

export default Checkbox
