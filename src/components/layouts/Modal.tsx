// react icons
import { IoIosClose } from "react-icons/io";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { closeModal } from "../../store/modalSlice";

// Components
import ModalManager from "./ModalManager";


const Modal = () => {

  const dispatch = useDispatch();
  const { isVisible } = useSelector((state: RootState) => state.modal);

  if (!isVisible) return null;

  return (
    <div className="w-full h-full bg-black/70 absolute top-0 left-0">
      <div className="mx-auto my-40 bg-white w-[300px] min-h-[300px] rounded-sm relative">
        <div className="flex justify-end absolute top-0 right-0">
          <button onClick={() => dispatch(closeModal())} className="text-6xl text-gray-600"><IoIosClose /></button>
        </div>
        <div className="p-3">
          <ModalManager />
        </div>
      </div>
    </div>
  )
}

export default Modal
