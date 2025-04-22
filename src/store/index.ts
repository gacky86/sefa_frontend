import { configureStore } from '@reduxjs/toolkit';
// export default なので任意の名前でimportできる
import modalReducer from './modalSlice';
import authReducer from './authSlice';
import flashcardReducer from "./flashcardsSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
    flashcards: flashcardReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
