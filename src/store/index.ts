// import { configureStore } from '@reduxjs/toolkit';
// // export default なので任意の名前でimportできる
// import modalReducer from './modalSlice';
// import authReducer from './authSlice';
// import flashcardReducer from "./flashcardsSlice";
// import fcLearningReducer from "./fcLearningSlice";
// import ytLearningReducer from "./ytLearningSlice";
// import bookmarkedVideoReducer from "./bookmarkedVideoSlice";
// import aiDictionaryReducer from "./aiDictionarySlice";

// export const store = configureStore({
//   reducer: {
//     modal: modalReducer,
//     auth: authReducer,
//     flashcards: flashcardReducer,
//     fcLearning: fcLearningReducer,
//     ytLearning: ytLearningReducer,
//     bookmarkedVideo: bookmarkedVideoReducer,
//     aiDictionary: aiDictionaryReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// redux-persist 導入版 store/index.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default: localStorage for web

// reducers
import modalReducer from './modalSlice';
import accountModalReducer from './accountModalSlice';
import authReducer from './authSlice';
import flashcardReducer from './flashcardsSlice';
import fcLearningReducer from './fcLearningSlice';
import ytLearningReducer from './ytLearningSlice';
import bookmarkedVideoReducer from './bookmarkedVideoSlice';
import aiDictionaryReducer from './aiDictionarySlice';

// すべての reducer を結合
const rootReducer = combineReducers({
  modal: modalReducer,
  accountModal: accountModalReducer,
  auth: authReducer,
  flashcards: flashcardReducer,
  fcLearning: fcLearningReducer,
  ytLearning: ytLearningReducer,
  bookmarkedVideo: bookmarkedVideoReducer,
  aiDictionary: aiDictionaryReducer,
});

// persist 設定
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // ← 永続化したい slice 名だけを列挙（通常は auth のみ）
};

// persistReducer でラップ
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store 作成
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Redux Persist の非シリアライズな action を許可
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// persist 用の store（index.ts で export）
export const persistor = persistStore(store);

// 型定義
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
