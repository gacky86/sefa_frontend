import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
import { deleteFlashcard } from "lib/api/flashcard";

// API関数をmock化
vi.mock('lib/api/flashcard', () => ({
  deleteFlashcard: vi.fn(),
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
        modalType: 'flashcardDelete' as const,
        modalProps: mockFlashcard,
      },
    },
  });

  return render(<Provider store={store}>{ui}<Modal/></Provider>);
};

describe('トップページ-単語帳CRUD-カードCRUD基本機能: 単語帳の削除', () => {

  beforeEach(() => {
    // updateFlashcardをmock化
    (deleteFlashcard as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);

    renderWithProviders(<></>);
  });

  test('表示内容の確認', () => {
    expect(screen.getByText("単語帳の削除")).toBeInTheDocument;
    expect(screen.getByText(mockFlashcard.title)).toBeInTheDocument;
    expect(screen.getByText("削除した単語帳に登録済みの単語も削除されます。")).toBeInTheDocument;
    expect(screen.getByTestId("delete-flashcard-submit-btn")).toBeInTheDocument;
    expect(screen.getByTestId("close-modal-btn")).toBeInTheDocument;
  });

  test('単語帳削除ボタンクリック', async () => {
    const deleteFlashcardSubmitBtn = screen.getByTestId("delete-flashcard-submit-btn");
    fireEvent.click(deleteFlashcardSubmitBtn);

    // 単語帳を削除するとトップページに戻る
    await waitFor(() => {
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
      expect(screen.queryByTestId('delete-flashcard-modal')).not.toBeInTheDocument();
    });
  });



})
