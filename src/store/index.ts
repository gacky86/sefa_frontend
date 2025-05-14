import { configureStore } from '@reduxjs/toolkit';
// export default なので任意の名前でimportできる
import modalReducer from './modalSlice';
import authReducer from './authSlice';
import flashcardReducer from "./flashcardsSlice";
import fcLearningReducer from "./fcLearningSlice";
import ytLearningReducer from "./ytLearningSlice";
import bookmarkedVideoReducer from "./bookmarkedVideoSlice";
import aiDictionaryReducer from "./aiDictionarySlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
    flashcards: flashcardReducer,
    fcLearning: fcLearningReducer,
    ytLearning: ytLearningReducer,
    bookmarkedVideo: bookmarkedVideoReducer,
    aiDictionary: aiDictionaryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
