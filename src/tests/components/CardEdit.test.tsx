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
import Modal from 'components/layouts/Modal';

// API
import { updateCard } from "lib/api/card";

// API関数をmock化
vi.mock('lib/api/card', () => ({
  updateCard: vi.fn(),
}));

// Redux 初期state用
const mockUser: User = {
  id: 1,
  uid: 'test@mail.com',
  provider: '',
  email: 'test@mail.com',
  name: 'testUser',
  allowPasswordChange: false
}

const mockFlashcard = { id: 0, userId: 0, title: "Daily conversation", description: "", shared: false, inputTarget: 50, outputTarget: 50}
const mockCard = {}

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
        isVisible: true,
        modalType: 'cardEdit' as const,
        modalProps: {flashcard: mockFlashcard, card: mockCard},
      },
    },
  });

  return render(<Provider store={store}>{ui}<Modal/></Provider>);
};

// ## 単語編集モーダル ##
// 以下の内容を表示すること
// - 単語帳タイトル
// - Japanese入力フォーム(valueとして現在のJapaneseの値)
// - English入力フォーム(valueとして現在のEnglishの値)
// - 削除ボタン
// - 更新ボタン
describe('トップページ-単語帳CRUD-カードCRUD基本機能: カードの編集', () => {
  beforeEach(() => {
    // createCardをmock化
    ( updateCard as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);

    renderWithProviders(<></>);
  });
  test('tentative', () => {

  });

})
