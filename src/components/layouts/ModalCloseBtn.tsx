// react icons
import { IoIosClose } from "react-icons/io";

import { useDispatch } from "react-redux";
import { openModal, closeModal } from "store/modalSlice";

import { ModalPayload } from "store/modalSlice";

type Props = {
  onClose?: ModalPayload;
}

const ModalCloseBtn = ({onClose}: Props) => {
  const dispatch = useDispatch();

  // closeボタンclick時に実行する関数
  const handleClose = () => {
    if (onClose) {
      dispatch(openModal({modalType: onClose.modalType, modalProps: onClose.modalProps}));
    } else {
      dispatch(closeModal()); // デフォルト動作
    }
  };

  return (
    <div className="flex justify-end absolute top-0 right-0">
      <button onClick={handleClose} className="text-6xl text-gray-600" data-testid="close-modal-btn"><IoIosClose /></button>
    </div>
  )
}

export default ModalCloseBtn
