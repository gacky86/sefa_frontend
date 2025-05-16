import { IoIosAddCircle } from "react-icons/io";

type ButtonProps = {
  onClick: () => void;
}

const AddBtn = ({onClick}: ButtonProps) => {
  return (
    <button onClick={onClick}><IoIosAddCircle/></button>
  )
}

export default AddBtn
