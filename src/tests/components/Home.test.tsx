import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
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

// FlashcardsListの中でimportしているflashcardモジュールを丸ごとmock化する
// getFlashcardListやその他必要な関数(その関数もvi.fn()でmock化)を返すモジュールとして
// なので、このvi.mockで定義されているmockはFlashcardsListのimport文の部分で置き換えられて使われることになる
vi.mock('lib/api/flashcard', () => ({
  getFlashcardList: vi.fn(),
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


describe('トップページ-単語帳CRUD-カードCRUD基本機能: トップページ表示', () => {
  const mockFlashcards = [
    { id: 0, userId: 0, title: "Daily conversation", description: "", shared: false, inputTarget: 50, outputTarget: 50},
    { id: 1, userId: 0, title: "Programming", description: "", shared: true, inputTarget: 50, outputTarget: 50},
  ];
  beforeEach(() => {
    (getFlashcardList as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: mockFlashcards,
    });

    renderWithProviders(<Home />);

  });

  test('表示されるテキストの確認', () => {
    expect(screen.getByText('単語帳')).toBeInTheDocument();
    expect(screen.getByText('My単語帳')).toBeInTheDocument();
    expect(screen.getByText('ブックマーク')).toBeInTheDocument();
    expect(screen.getByText('探す')).toBeInTheDocument();
  });

  test('Flashcardリスト表示', () => {
    // <FlashCardsList>コンポーネントがレンダリングされていることの確認
    // cardの中身のテストはFlashCardsListのテストに任せる
    expect(screen.getByTestId('flashcards-list')).toBeInTheDocument();
  });

  test('Flashcard追加ボタン表示', () => {
    expect(screen.getByTestId('new-flashcard-btn')).toBeInTheDocument();
  });

  test('Flashcard追加モーダルの表示', async () => {
    const newFlashCardBtn = screen.getByTestId('new-flashcard-btn');
    fireEvent.click(newFlashCardBtn);

    const modalBase = await screen.findByTestId('modal');
    const newFlashcard = await screen.findByTestId('new-flashcard-modal');
    expect(modalBase).toBeInTheDocument();
    expect(newFlashcard).toBeInTheDocument();
  });

  test('Flashcard表示内容確認', async () => {
    const flashCardCards = await screen.findAllByTestId('flashcard-card');

    const firstCard = flashCardCards[0];
    const secondCard = flashCardCards[1];

    //　レンダリングされたCardの数を確認
    expect(flashCardCards.length).toBe(2);

    // firstCard: 非公開設定、タイトル、習熟度、Input, Outputの確認
    // const lockIcon = within(firstCard).getByLabelText('lock-icon');
    // expect(lockIcon).toBeInTheDocument();
    expect(within(firstCard).getByText('Daily conversation')).toBeInTheDocument();
    expect(within(firstCard).getByText('習熟度')).toBeInTheDocument();
    expect(within(firstCard).getByText('Input')).toBeInTheDocument();
    expect(within(firstCard).getByText('Output')).toBeInTheDocument();

    // secondCard: タイトル、習熟度、Input, Outputの確認
    // const lockIcon = within(firstCard).getByLabelText('lock-icon');
    // expect(lockIcon).not.toBeInTheDocument();
    expect(within(secondCard).getByText('Programming')).toBeInTheDocument();
    expect(within(secondCard).getByText('習熟度')).toBeInTheDocument();
    expect(within(secondCard).getByText('Input')).toBeInTheDocument();
    expect(within(secondCard).getByText('Output')).toBeInTheDocument();
  });

  test('FlashcardDetailモーダルを表示して非表示にする', async () => {
    // クリックするカードを見つける
    const flashCardCards = await screen.findAllByTestId('flashcard-card');
    const firstCardDetailBtn = within(flashCardCards[0]).getByRole('button');
    expect(firstCardDetailBtn).toBeInTheDocument();

    // クリックする
    fireEvent.click(firstCardDetailBtn);
    // モーダルを探す
    const modalBase = await screen.findByTestId('modal');
    const flashcardDetail = await screen.findByTestId('flashcard-detail');

    // FlashCardDetailModalが表示されたことを確認
    expect(modalBase).toBeInTheDocument();
    expect(flashcardDetail).toBeInTheDocument();

    // FlashCardSettingModal中のcloseボタンをクリックする
    const modalCloseBtn = screen.getByTestId('close-modal-btn');
    fireEvent.click(modalCloseBtn);

    // モーダルが非表示になることを確認
    await waitFor(() => {
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
      expect(screen.queryByTestId('flashcard-detail')).not.toBeInTheDocument();
    });
  });
});
