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



// ## 単語帳新規作成モーダル ##
// 以下の内容が表示されていること
// - タイトルフォーム
// - 概要フォーム
// = 新規作成ボタン
// タイトルと概要を入力して新規作成ボタンをクリックするとモーダルが消え、単語帳一覧に作成した単語帳が追加されていること(P0)
// タイトルフォームが空の状態では新規作成ボタンがクリックできない状態であること(P0)
// タイトルフォームを入力すると、概要フォームの入力の有無にかかわらず、新規作成ボタンがクリックできる状態になること(ボタンのopacityが0.7=>1.0)(P0)
// モーダル中のcloseボタンをクリックすると、モーダルの表示が消えること(P0)
// タイトルは〜〜文字以上入力できないこと(P0)
// 概要は~~文字以上入力できないこと(P0)
describe('トップページ-単語帳CRUD-カードCRUD基本機能: Flashcard新規作成', () => {
  test('tentative', () => {

  });

})
