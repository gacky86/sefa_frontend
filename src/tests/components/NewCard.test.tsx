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
import { createCard } from "lib/api/card";

// API関数をmock化
vi.mock('lib/api/card', () => ({
  createCard: vi.fn(),
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
        modalType: 'newCard' as const,
        modalProps: mockFlashcard,
      },
    },
  });

  return render(<Provider store={store}>{ui}<Modal/></Provider>);
};

describe('トップページ-単語帳CRUD-カードCRUD基本機能: カードの新規作成', () => {
  beforeEach(() => {
    // createCardをmock化
    ( createCard as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);

    renderWithProviders(<></>);
  });

  test('表示内容の確認', () => {
    expect(screen.getByText(mockFlashcard.title)).toBeInTheDocument;
    expect(screen.getByText('Japanese')).toBeInTheDocument;
    expect(screen.getByText('English')).toBeInTheDocument;
    expect(screen.getByTestId('new-card-ja-form')).toBeInTheDocument;
    expect(screen.getByTestId('new-card-en-form')).toBeInTheDocument;
    expect(screen.getByTestId('new-card-submit-btn')).toBeInTheDocument;
    expect(screen.getByTestId('close-modal-btn')).toBeInTheDocument;
  });
  test('日本語フォーム入力確認', () => {
    // 入力がフォーム内に反映される
    // - 入力フォームの要素を取得する
    const japaneseInput = screen.getByTestId('new-card-ja-form');

    // - 取得した入力フォームにユーザーイベントで値を入れる
    fireEvent.change(japaneseInput, { target: { value: '英会話フレーズ' } });

    // - 入力フォームの値がユーザーイベントで入れた値になっているかをテストする
    expect(japaneseInput).toHaveValue('英会話フレーズ');

    // 規定文字数以内は入力が反映される
    // 255字　半角
    const userInput255Hankaku = 'a'.repeat(255);
    fireEvent.change(japaneseInput, { target: { value: userInput255Hankaku } });
    expect(japaneseInput).toHaveValue(userInput255Hankaku);

    // 255字　全角
    const userInput255Zenkaku = 'あ'.repeat(255);
    fireEvent.change(japaneseInput, { target: { value: userInput255Zenkaku } });
    expect(japaneseInput).toHaveValue(userInput255Zenkaku);

    // 256字　半角
    // 255字で入力はstopし、それ以上入力されないので、期待値はuserInput255Hankaku
    const userInput256Hankaku = 'a'.repeat(256);
    fireEvent.change(japaneseInput, { target: { value: userInput256Hankaku } });
    expect(japaneseInput).toHaveValue(userInput255Hankaku);

    // 256字　全角
    // 255字で入力はstopし、それ以上入力されないので、期待値はuserInput255Zenkaku
    const userInput256Zenkaku = 'あ'.repeat(256);
    fireEvent.change(japaneseInput, { target: { value: userInput256Zenkaku } });
    expect(japaneseInput).toHaveValue(userInput255Zenkaku);
  });

  test('英語フォーム入力確認', () => {
    // 入力がフォーム内に反映される
    // - 入力フォームの要素を取得する
    const englishInput = screen.getByTestId('new-card-en-form');

    // - 取得した入力フォームにユーザーイベントで値を入れる
    fireEvent.change(englishInput, { target: { value: 'english phrase' } });

    // - 入力フォームの値がユーザーイベントで入れた値になっているかをテストする
    expect(englishInput).toHaveValue('english phrase');

    // 規定文字数以内は入力が反映される
    // 255字　半角
    const userInput255Hankaku = 'a'.repeat(255);
    fireEvent.change(englishInput, { target: { value: userInput255Hankaku } });
    expect(englishInput).toHaveValue(userInput255Hankaku);

    // 255字　全角
    const userInput255Zenkaku = 'あ'.repeat(255);
    fireEvent.change(englishInput, { target: { value: userInput255Zenkaku } });
    expect(englishInput).toHaveValue(userInput255Zenkaku);

    // 256字　半角
    // 255字で入力はstopし、それ以上入力されないので、期待値はuserInput255Hankaku
    const userInput256Hankaku = 'a'.repeat(256);
    fireEvent.change(englishInput, { target: { value: userInput256Hankaku } });
    expect(englishInput).toHaveValue(userInput255Hankaku);

    // 256字　全角
    // 255字で入力はstopし、それ以上入力されないので、期待値はuserInput255Zenkaku
    const userInput256Zenkaku = 'あ'.repeat(256);
    fireEvent.change(englishInput, { target: { value: userInput256Zenkaku } });
    expect(englishInput).toHaveValue(userInput255Zenkaku);
  });

  test('追加ボタンのクリック', async () => {
    // JapaneseもしくはEnglishのどちらかに入力がない状態ではunclickable
    const submitBtn = screen.getByTestId('new-card-submit-btn');
    const japaneseInput = screen.getByTestId('new-card-ja-form');
    const englishInput = screen.getByTestId('new-card-en-form');

    // 初期状態ではunclickable
    expect(submitBtn).toBeDisabled();

    // 日本語フォームのみの入力ではunclickable
    fireEvent.change(japaneseInput, {target: {value: 'あ'}})
    expect(submitBtn).toBeDisabled();

    // 英語フォームのみの入力ではunclickable
    fireEvent.change(japaneseInput, {target: {value: ''}})
    fireEvent.change(englishInput, {target: {value: 'a'}})
    expect(submitBtn).toBeDisabled();

    // 日本語フォームと英語フォームの両方の入力ではclickable
    fireEvent.change(japaneseInput, {target: {value: 'あ'}})
    expect(submitBtn).toBeEnabled();

    // clickすると、フォームがクリアされる。モーダルは変化しない。
    fireEvent.click(submitBtn);
    waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument;
      expect(screen.getByTestId('new-card-modal')).toBeInTheDocument;
      expect(japaneseInput).toHaveValue('');
      expect(englishInput).toHaveValue('');
    });
  });

})
