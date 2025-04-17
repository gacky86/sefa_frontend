import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest'

// Redux
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from "store/authSlice";
import modalReducer from "store/modalSlice";
import { User } from "interfaces/index";

// Components
import Home from 'components/pages/Home';

// API
import { getFlashcardList } from "lib/api/flashcard";

// Redux 初期state用
const mockUser: User = {
  id: 1,
  uid: 'test@mail.com',
  provider: '',
  email: 'test@mail.com',
  name: 'testUser',
  allowPasswordChange: false
}

const renderWithProviders = (ui: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      modal: modalReducer,
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user: mockUser,
        isSignedIn: true,
        isLoading: false
      },
      modal: {
        isVisible: false,
        modalType: null,
        modalProps: null,
      },
    },
  });

  return render(<Provider store={store}>{ui}</Provider>);
};


// ## 単語編集モーダル ##
// 以下の内容を表示すること
// - 単語帳タイトル
// - Japanese入力フォーム(valueとして現在のJapaneseの値)
// - English入力フォーム(valueとして現在のEnglishの値)
// - 削除ボタン
// - 更新ボタン
describe('トップページ-単語帳CRUD-カードCRUD基本機能: カードの編集', () => {
  test('tentative', () => {

  });

})
