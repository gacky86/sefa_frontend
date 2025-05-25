import { createSlice } from "@reduxjs/toolkit";

type AccountModalState = {
  isVisible: boolean;
};

const initialState: AccountModalState = {
  isVisible: false
}

const accountModalSlice = createSlice({
  name: 'accountModal',
  initialState,
  reducers: {
    openAccountModal : (state) => {
      state.isVisible = true;
    },
    closeAccountModal : (state) => {
      state.isVisible = false;
    },
    toggleAccountModal : (state) => {
      state.isVisible = !state.isVisible;
    },
  }
});

export const { openAccountModal, closeAccountModal, toggleAccountModal } = accountModalSlice.actions;
export default accountModalSlice.reducer;
