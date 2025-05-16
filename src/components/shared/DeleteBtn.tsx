import { FaRegTrashAlt } from "react-icons/fa";

type ButtonProps = {
  onClick: () => void;
}

const DeleteBtn = ({onClick}: ButtonProps) => {
  return (
    <button onClick={onClick}
            data-testid="delete-card-btn"><FaRegTrashAlt /></button>
  )
}

export default DeleteBtn
