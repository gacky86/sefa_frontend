import { configureStore } from '@reduxjs/toolkit';
// export default なので任意の名前でimportできる
import modalReducer from './modalSlice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
