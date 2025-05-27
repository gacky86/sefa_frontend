// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { closeModal } from "store/modalSlice";

// Components
import ModalManager from "components/layouts/ModalManager";


const Modal = () => {
  const { isVisible } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  if (!isVisible) return null;

  return (
    <div className="w-full h-screen bg-black/70 fixed top-0 left-0" data-testid="modal" onClick={() => dispatch(closeModal())}>
      <div className="mx-auto my-30 bg-white w-[300px] min-h-[300px] max-h-[550px] rounded-sm relative" onClick={(e) => e.stopPropagation()}>
        <div className="p-3">
          <ModalManager />
        </div>
      </div>
    </div>
  )
}

export default Modal
