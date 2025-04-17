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



// ## 単語帳設定モーダル ##
// 以下の内容が表示されていること
// - 見出し「編集」
// - closeボタン
// - タイトルフォーム(現在のタイトルがPlaceholderとして表示)
// - 概要フォーム(現在の概要がPlaceholderとして表示)
// - 公開設定スイッチボタン
// - 一日の目標学習量
// - 単語帳削除ボタン
// - 更新ボタン
// closeボタンをクリックすると、モーダルの表示が消えること(P0)
// タイトルフォームをクリックするとタイトルを編集することができる
// タイトルフォームに入力した文字がタイトルフォームに表示されること
// 概要フォームをクリックすると概要を編集することができる
// 概要フォームに入力した文字が概要フォームに表示されること
// 公開設定スイッチは単語帳の公開設定によってON/OFFが切り替わること
// 公開設定スイッチをクリックすると、ON/OFFが切り替わること
// 編集した状態で更新ボタンをクリックすると、更新が反映されること
// 単語帳削除ボタンをクリックすると、単語帳削除モーダルが表示されること
describe('トップページ-単語帳CRUD-カードCRUD基本機能: 単語帳の編集', () => {
  test('tentative', () => {

  });

})
