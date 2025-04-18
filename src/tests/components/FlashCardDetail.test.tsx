import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Redux
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from "store/authSlice";
import modalReducer from "store/modalSlice";
import { User } from "interfaces/index";

// Components
import Modal from 'components/layouts/Modal';

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

// Redux store内のstateの初期設定
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
        modalType: 'flashcard' as const,
        modalProps: mockFlashcard,
      },
    },
  });
  // Home以下のコンポーネントではModalが外に(Homeコンポーネント内に)ある実装になっているので、
  // ここで一緒にModalをrenderする
  return render(<Provider store={store}>{ui}<Modal/></Provider>);
};

// テスト
describe('トップページ-単語帳CRUD-カードCRUD基本機能: Flashcardの詳細表示', () => {

  beforeEach(() => {
    renderWithProviders(<></>);
  });

  test('表示内容確認', () => {
    expect(screen.getByText('Daily conversation')).toBeInTheDocument();
    expect(screen.getByText('習熟度')).toBeInTheDocument();
    expect(screen.getByText('Input')).toBeInTheDocument();
    expect(screen.getByText('Output')).toBeInTheDocument();
  });

  test('Inputモードボタンクリック時の動作確認', () => {
    // 学習機能のテスト
  });
  test('Outputモードボタンクリック時の動作確認', () => {
    // 学習機能のテスト
  });

  test('FlashCardSettingModalを表示した後、FlashCardDetailModalに戻る', async () => {
    // 単語帳の編集ボタンをクリックする
    const flashcardEditBtn = screen.getByTestId('flashcard-edit-btn');
    fireEvent.click(flashcardEditBtn);

    // FlashCardSettingModalを表示したことを確認
    const modalBase = await screen.findByTestId('modal');
    const editFlashcard = await screen.findByTestId('flashcard-edit-modal');
    expect(modalBase).toBeInTheDocument();
    expect(editFlashcard).toBeInTheDocument();

    // FlashCardSettingModal中のcloseボタンをクリックする
    const modalCloseBtn = screen.getByTestId('close-modal-btn');
    fireEvent.click(modalCloseBtn);

    // FlashCardSettingModalが非表示になり、FlashCardDetailModalが表示されることを確認
    await waitFor(() => {
      expect(screen.queryByTestId('flashcard-edit-modal')).not.toBeInTheDocument();
      expect(screen.queryByTestId('modal')).toBeInTheDocument();
      expect(screen.queryByTestId('flashcard-detail')).toBeInTheDocument();
    });

  });

  test('CardsListModalを表示した後、非表示にする', async () => {
    // 単語の追加/編集ボタンをクリックする
    const cardAddEditBtn = screen.getByTestId('card-add-edit-btn');
    fireEvent.click(cardAddEditBtn);

    // CardsListModalを表示したことを確認
    const modalBase = await screen.findByTestId('modal');
    const cardsList = await screen.findByTestId('cards-list-modal');
    expect(modalBase).toBeInTheDocument();
    expect(cardsList).toBeInTheDocument();

    // CardsListModal中のcloseボタンをクリックする
    const modalCloseBtn = screen.getByTestId('close-modal-btn');
    fireEvent.click(modalCloseBtn);

    // CardsListModalが非表示になり、FlashCardDetailModalが表示されることを確認
    await waitFor(() => {
      expect(screen.queryByTestId('cards-list-modal')).not.toBeInTheDocument();
      expect(screen.queryByTestId('modal')).toBeInTheDocument();
      expect(screen.queryByTestId('flashcard-detail')).toBeInTheDocument();
    });
  });

})
