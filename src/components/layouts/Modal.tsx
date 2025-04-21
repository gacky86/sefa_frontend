// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../store";

// Components
import ModalManager from "components/layouts/ModalManager";


const Modal = () => {
  const { isVisible } = useSelector((state: RootState) => state.modal);

  if (!isVisible) return null;

  return (
    <div className="w-full h-full bg-black/70 absolute top-0 left-0" data-testid="modal">
      <div className="mx-auto my-40 bg-white w-[300px] min-h-[300px] rounded-sm relative">
        {/* <div className="flex justify-end absolute top-0 right-0">
          <button onClick={handleClose} className="text-6xl text-gray-600" data-testid="close-modal-btn"><IoIosClose /></button>
        </div> */}
        <div className="p-3">
          <ModalManager />
        </div>
      </div>
    </div>
  )
}

export default Modal
