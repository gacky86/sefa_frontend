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


// ## 単語帳削除モーダル ##
// 以下の内容が表示されていること
// - [~~(単語帳タイトル)を削除しますか？削除した単語帳にはアクセスできなくなります。]
// -「削除する」ボタン
// 「削除する」ボタンをクリックすると、その単語帳は削除される
describe('トップページ-単語帳CRUD-カードCRUD基本機能: 単語帳の削除', () => {
  test('tentative', () => {

  });

})
