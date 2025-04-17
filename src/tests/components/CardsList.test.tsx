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


// ## 単語帳内単語一覧モーダル ##
// 以下の内容を表示していること
// - 単語帳タイトル
// - 単語帳内単語一覧をテーブルで表示
// - 単語一覧テーブルのヘッダーにはJapanese, Englishが表示されいてること
// - 単語一覧テーブルには、編集ボタン、日本語、英語が表示されていること
// - 単語追加ボタン
// 単語編集ボタンをクリックすると、単語編集モーダルを表示
// 単語追加ボタンをクリックすると、単語追加モーダルを表示
describe('トップページ-単語帳CRUD-カードCRUD基本機能: カードの一覧表示', () => {
  test('tentative', () => {

  });

})
