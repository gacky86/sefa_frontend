import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ModalPayload = {
  modalType: 'flashcard' | 'newFlashcard' | 'flashcardSetting' | 'cardsList' | 'cardEdit' | 'newCard' | 'flashcardDelete',
  modalProps?: any
}

type ModalState = {
  isVisible: boolean;
  modalType: ModalPayload['modalType'] | null;
  modalProps: any;
};

const initialState: ModalState = {
  isVisible: false,
  modalType: null,
  modalProps: null
};

// slice: tool-kitが提供するstate + reducer + action をまとめたオブジェクト
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalPayload>) => {
      state.isVisible = true;
      state.modalType = action.payload.modalType;
      state.modalProps = action.payload.modalProps || null;
    },
    closeModal: (state) => {
      state.isVisible = false;
      state.modalType = null;
      state.modalProps = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
