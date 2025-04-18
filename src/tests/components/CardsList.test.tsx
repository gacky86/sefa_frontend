import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest'

// Redux
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from "store/authSlice";
import modalReducer from "store/modalSlice";
import { User, FlashCard, Card } from "interfaces/index";

// Components
import Modal from 'components/layouts/Modal';

// API
import { getCardList } from "lib/api/card";

// API関数をmock化
vi.mock('lib/api/card', () => ({
  getCardList: vi.fn(),
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

const mockFlashcard: FlashCard = { id: 0, userId: 0, title: "Daily conversation", description: "", shared: false, inputTarget: 50, outputTarget: 50};
const mockCards: Card[] = [
  { id: 0, flashcardId: 0, inputProficiency: 0, outputProficiency: 0, english: "test0", japanese: "テスト0" },
  { id: 1, flashcardId: 0, inputProficiency: 0, outputProficiency: 0, english: "test1", japanese: "テスト1" },
  { id: 2, flashcardId: 0, inputProficiency: 0, outputProficiency: 0, english: "test2", japanese: "テスト2" },
  { id: 3, flashcardId: 0, inputProficiency: 0, outputProficiency: 0, english: "test3", japanese: "テスト3" },
  { id: 4, flashcardId: 0, inputProficiency: 0, outputProficiency: 0, english: "test4", japanese: "テスト4" },
];

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
        modalType: 'cardsList' as const,
        modalProps: mockFlashcard,
      },
    },
  });

  return render(<Provider store={store}>{ui}<Modal/></Provider>);
};

describe('トップページ-単語帳CRUD-カードCRUD基本機能: カードの一覧表示', () => {
  beforeEach(() => {
    (getCardList as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: mockCards,
    });

    renderWithProviders(<></>);

  });

  test('表示内容の確認', () => {
    // 見出し、テーブルヘッダ、テーブルレコード、カード追加ボタン
    expect(screen.getByText(mockFlashcard.title)).toBeInTheDocument;
    expect(screen.getByText("Japanese")).toBeInTheDocument;
    expect(screen.getByText("English")).toBeInTheDocument;
    expect(screen.getByText(mockFlashcard.title)).toBeInTheDocument;

    mockCards.map((card) => {
      expect(screen.getByTestId(`card-${card.id}`)).toBeInTheDocument;
      expect(screen.getByText(card.japanese)).toBeInTheDocument;
      expect(screen.getByText(card.english)).toBeInTheDocument;
    });

    expect(screen.getByTestId("new-card-modal-btn")).toBeInTheDocument;

  });


  test('カード編集モーダルを開いたのち、閉じる', async () => {
    // クリックしたカードに対応するカード編集モーダルが開くこと
    mockCards.map((card) => {
      const cardBtn = screen.getByTestId(`card-${card.id}`);
      fireEvent.click(cardBtn);

      waitFor(() => {
        expect(screen.getByTestId('modal')).toBeInTheDocument;
        expect(screen.getByTestId(`edit-card-${card.id}`)).toBeInTheDocument;
      });

      const modalCloseBtn = screen.getByTestId('close-modal-btn');
      fireEvent.click(modalCloseBtn);

      waitFor(() => {
        expect(screen.getByTestId('modal')).toBeInTheDocument;
        expect(screen.getByTestId('cards-list-modal')).toBeInTheDocument;
        expect(screen.getByTestId(`edit-card-${card.id}`)).not.toBeInTheDocument;
      });

    });
  });

  test('カード追加モーダルを開いたのち、閉じる', async () => {
    const newCardModalBtn = screen.getByTestId("new-card-modal-btn");
    fireEvent.click(newCardModalBtn);

    waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument;
      expect(screen.getByTestId('new-card-modal')).toBeInTheDocument;
    });

    const modalCloseBtn = screen.getByTestId('close-modal-btn');
    fireEvent.click(modalCloseBtn);

    waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument;
      expect(screen.getByTestId('cards-list-modal')).toBeInTheDocument;
      expect(screen.getByTestId('new-card-modal')).not.toBeInTheDocument;
    });
  });

})
