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
import { createFlashcard } from "lib/api/flashcard";

// API関数をmock化
vi.mock('lib/api/flashcard', () => ({
  createFlashcard: vi.fn(),
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
        modalType: 'newFlashcard' as const,
        modalProps: null,
      },
    },
  });
  // Home以下のコンポーネントではModalが外に(Homeコンポーネント内に)ある実装になっているので、
  // ここで一緒にModalをrenderする
  return render(<Provider store={store}>{ui}<Modal/></Provider>);
};

// テストコード
describe('トップページ-単語帳CRUD-カードCRUD基本機能: Flashcard新規作成', () => {
  beforeEach(() => {
    // createFlashcardをmock化
    (createFlashcard as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);

    renderWithProviders(<></>);
  });

  test('レンダリング内容の確認', () => {
    // 見出し、タイトルフォーム、概要フォーム、closeボタン、新規作成ボタン
    expect(screen.getByText('単語帳を新規作成')).toBeInTheDocument;
    expect(screen.getAllByRole('textbox').length).toBe(2);
    expect(screen.getByTestId('new-flashcard-submit-btn')).toBeInTheDocument;
    expect(screen.getByTestId('close-modal-btn')).toBeInTheDocument;
  });
  test('タイトルフォーム入力', () => {
    // 入力がフォーム内に反映される
    // - 入力フォームの要素を取得する
    const titleInput = screen.getByTestId('flashcard-title-form');

    // - 取得した入力フォームにユーザーイベントで値を入れる
    fireEvent.change(titleInput, { target: { value: '英会話フレーズ集' } });

    // - 入力フォームの値がユーザーイベントで入れた値になっているかをテストする
    expect(titleInput).toHaveValue('英会話フレーズ集');

    // 規定文字数以内は入力が反映される
    // 60字　半角
    const userInput60Hankaku = 'a'.repeat(60);
    fireEvent.change(titleInput, { target: { value: userInput60Hankaku } });
    expect(titleInput).toHaveValue(userInput60Hankaku);

    // 60字　全角
    const userInput60Zenkaku = 'あ'.repeat(60);
    fireEvent.change(titleInput, { target: { value: userInput60Zenkaku } });
    expect(titleInput).toHaveValue(userInput60Zenkaku);

    // 61字　半角
    // 60字で入力はstopし、それ以上入力されないので、期待値はuserInput60Hankaku
    const userInput61Hankaku = 'a'.repeat(61);
    fireEvent.change(titleInput, { target: { value: userInput61Hankaku } });
    expect(titleInput).toHaveValue(userInput60Hankaku);

    // 61字　全角
    // 60字で入力はstopし、それ以上入力されないので、期待値はuserInput60Zenkaku
    const userInput61Zenkaku = 'あ'.repeat(61);
    fireEvent.change(titleInput, { target: { value: userInput61Zenkaku } });
    expect(titleInput).toHaveValue(userInput60Zenkaku);

  });

  test('概要フォーム入力', () => {
    // 入力がフォーム内に反映される
    // - 入力フォームの要素を取得する
    const descriptionInput = screen.getAllByRole('textbox')[1];

    // - 取得した入力フォームにユーザーイベントで値を入れる
    fireEvent.change(descriptionInput, { target: { value: '英会話フレーズ集' } });

    // - 入力フォームの値がユーザーイベントで入れた値になっているかをテストする
    expect(descriptionInput).toHaveValue('英会話フレーズ集');

    // 規定文字数以内は入力が反映される

    // 120字　半角
    const userInput120Hankaku = 'a'.repeat(120);
    fireEvent.change(descriptionInput, { target: { value: userInput120Hankaku } });
    expect(descriptionInput).toHaveValue(userInput120Hankaku);

    // 120字　全角
    const userInput120Zenkaku = 'あ'.repeat(120);
    fireEvent.change(descriptionInput, { target: { value: userInput120Zenkaku } });
    expect(descriptionInput).toHaveValue(userInput120Zenkaku);

    // 121字　半角
    // 120字で入力はstopし、それ以上入力されないので、期待値はuserInput120Hankaku
    const userInput121Hankaku = 'a'.repeat(121);
    fireEvent.change(descriptionInput, { target: { value: userInput121Hankaku } });
    expect(descriptionInput).toHaveValue(userInput120Hankaku);

    // 121字　全角
    // 120字で入力はstopし、それ以上入力されないので、期待値はuserInput120Zenkaku
    const userInput121Zenkaku = 'あ'.repeat(121);
    fireEvent.change(descriptionInput, { target: { value: userInput121Zenkaku } });
    expect(descriptionInput).toHaveValue(userInput120Zenkaku);
  });

  test('新規作成ボタンクリック', async () => {
    // initではunclickable
    const submitBtn = screen.getByTestId('new-flashcard-submit-btn');
    expect(submitBtn).toBeDisabled();

    // フォームを規定文字数以内で入力時にclickable
    const titleInput = screen.getAllByRole('textbox')[0];
    fireEvent.change(titleInput, { target: { value: 'a' } });
    expect(submitBtn).toBeEnabled();

    // titleフォームの入力文字数が0の時にunclickable
    fireEvent.change(titleInput, { target: { value: '' } });
    expect(submitBtn).toBeDisabled();

    // clickable時にclickすると、モーダルが消えてトップページが表示される
    fireEvent.change(titleInput, { target: { value: 'a' } });
    fireEvent.click(submitBtn);
    await waitFor(() => {
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
      expect(screen.queryByTestId('new-flashcard-modal')).not.toBeInTheDocument();
    });

  });
  test('closeボタンクリック', async () => {
    // closeボタンをクリックするとトップページに遷移する
    // NewFlashcardModal中のcloseボタンをクリックする
    const modalCloseBtn = screen.getByTestId('close-modal-btn');
    fireEvent.click(modalCloseBtn);

    // モーダルが非表示になることを確認
    await waitFor(() => {
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
      expect(screen.queryByTestId('new-flashcard-modal')).not.toBeInTheDocument();
    });
  });

})
