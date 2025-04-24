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
import { updateFlashcard } from "lib/api/flashcard";

// API関数をmock化
vi.mock('lib/api/flashcard', () => ({
  updateFlashcard: vi.fn(),
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
        modalType: 'flashcardSetting' as const,
        modalProps: mockFlashcard,
      },
    },
  });

  return render(<Provider store={store}>{ui}<Modal/></Provider>);
};

describe('トップページ-単語帳CRUD-カードCRUD基本機能: 単語帳の編集', () => {
  beforeEach(() => {
    // updateFlashcardをmock化
    (updateFlashcard as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);

    renderWithProviders(<></>);
  });

  test('表示内容の確認', () => {
    // 見出し、タイトルフォーム、概要フォーム、closeボタン、更新ボタン、公開設定toggle, 目標学習量フォーム
    expect(screen.getByText('編集')).toBeInTheDocument;
    expect(screen.getByText('公開 : OFF')).toBeInTheDocument;
    expect(screen.getByText('一日の目標学習量')).toBeInTheDocument;
    expect(screen.getByText('Input')).toBeInTheDocument;
    expect(screen.getByText('Output')).toBeInTheDocument;
    expect(screen.getByText('更新')).toBeInTheDocument;
    const titleInput = screen.getByTestId('flashcard-title-form');
    expect(titleInput).toBeInTheDocument;
    expect(titleInput).toHaveValue(mockFlashcard.title);
    const descriptionInput = screen.getByTestId('flashcard-description-form');
    expect(descriptionInput).toBeInTheDocument;
    expect(descriptionInput).toHaveValue(mockFlashcard.description);
    const inputTargetInput = screen.getByTestId('flashcard-input-target-form');
    expect(inputTargetInput).toBeInTheDocument;
    expect(inputTargetInput).toHaveValue(mockFlashcard.inputTarget);
    const outputTargetInput = screen.getByTestId('flashcard-output-target-form');
    expect(outputTargetInput).toBeInTheDocument;
    expect(outputTargetInput).toHaveValue(mockFlashcard.outputTarget);
    expect(screen.getByTestId('flashcard-share-toggle')).toBeInTheDocument;
    expect(screen.getByTestId('delete-flashcard-modal-btn')).toBeInTheDocument;
    expect(screen.getByTestId('update-flashcard-submit-btn')).toBeInTheDocument;
    expect(screen.getByTestId('close-modal-btn')).toBeInTheDocument;
  });

  test('タイトルフォーム入力', async () => {
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

    waitFor(() => {
      expect(titleInput).toHaveValue(userInput60Hankaku);
    });

    // 60字　全角
    const userInput60Zenkaku = 'あ'.repeat(60);
    fireEvent.change(titleInput, { target: { value: userInput60Zenkaku } });
    waitFor(() => {
      expect(titleInput).toHaveValue(userInput60Zenkaku);
    });

    // 61字　半角
    // 60字で入力はstopし、それ以上入力されないので、期待値はuserInput60Hankaku
    const userInput61Hankaku = 'a'.repeat(61);
    fireEvent.change(titleInput, { target: { value: userInput61Hankaku } });
    waitFor(() => {
      expect(titleInput).toHaveValue(userInput60Hankaku);
    });

    // 61字　全角
    // 60字で入力はstopし、それ以上入力されないので、期待値はuserInput60Zenkaku
    const userInput61Zenkaku = 'あ'.repeat(61);
    fireEvent.change(titleInput, { target: { value: userInput61Zenkaku } });
    waitFor(() => {
      expect(titleInput).toHaveValue(userInput60Zenkaku);
    });

  });

  test('概要フォーム入力', async () => {
    // 入力がフォーム内に反映される
    // - 入力フォームの要素を取得する
    const descriptionInput = screen.getByTestId('flashcard-description-form');

    // - 取得した入力フォームにユーザーイベントで値を入れる
    fireEvent.change(descriptionInput, { target: { value: '英会話フレーズ集' } });

    // - 入力フォームの値がユーザーイベントで入れた値になっているかをテストする
    expect(descriptionInput).toHaveValue('英会話フレーズ集');

    // 規定文字数以内は入力が反映される

    // 120字　半角
    const userInput120Hankaku = 'a'.repeat(120);
    fireEvent.change(descriptionInput, { target: { value: userInput120Hankaku } });
    waitFor(() => {
      expect(descriptionInput).toHaveValue(userInput120Hankaku);
    });

    // 120字　全角
    const userInput120Zenkaku = 'あ'.repeat(120);
    fireEvent.change(descriptionInput, { target: { value: userInput120Zenkaku } });
    waitFor(() => {
      expect(descriptionInput).toHaveValue(userInput120Zenkaku);
    });

    // 121字　半角
    // 120字で入力はstopし、それ以上入力されないので、期待値はuserInput120Hankaku
    const userInput121Hankaku = 'a'.repeat(121);
    fireEvent.change(descriptionInput, { target: { value: userInput121Hankaku } });
    waitFor(() => {
      expect(descriptionInput).toHaveValue(userInput120Hankaku);
    });

    // 121字　全角
    // 120字で入力はstopし、それ以上入力されないので、期待値はuserInput120Zenkaku
    const userInput121Zenkaku = 'あ'.repeat(121);
    fireEvent.change(descriptionInput, { target: { value: userInput121Zenkaku } });
    waitFor(() => {
      expect(descriptionInput).toHaveValue(userInput120Zenkaku);
    });
  });

  test('公開設定のクリック', () => {
    const shareToggle = screen.getByTestId('flashcard-share-toggle');
    const innerToggle = shareToggle.querySelector('span');

    // mockFlashcard.shared === falseなので、初期状態ではOFFになっている
    expect(screen.getByText('公開 : OFF')).toBeInTheDocument;
    expect(shareToggle).toHaveClass("bg-gray-500");
    expect(innerToggle).toHaveClass("translate-x-0");

    // クリック
    fireEvent.click(shareToggle);

    // shared === trueの際の表示を確認
    expect(screen.getByText('公開 : ON')).toBeInTheDocument;
    expect(shareToggle).toHaveClass("bg-blue-500");
    expect(innerToggle).toHaveClass("translate-x-[calc(100%-2px)]");

  });
  test('Input学習量フォームの入力', async () => {
    const inputTargetForm = screen.getByTestId('flashcard-input-target-form');

    // ユーザーの入力が反映される
    // 100は入力できる(usecase)
    fireEvent.change(inputTargetForm, { target: { value: "100" } });
    waitFor(() => {
      expect(inputTargetForm).toHaveValue(100);
    });

    // 9は入力できない(min境界値)->入力できずに10を代わりに入れる
    fireEvent.change(inputTargetForm, { target: { value: "9" } });
    expect(inputTargetForm).not.toHaveValue("9");
    expect(inputTargetForm).toHaveValue(10);

    // 10は入力できる(min境界値)
    fireEvent.change(inputTargetForm, { target: { value: "10" } });
    expect(inputTargetForm).toHaveValue(10);

    // 999は入力できる(max境界値)
    fireEvent.change(inputTargetForm, { target: { value: "999" } });
    expect(inputTargetForm).toHaveValue(999);

    // 1000は入力できない(max境界値)->入力できずに999を代わりに入れる
    fireEvent.change(inputTargetForm, { target: { value: "1000" } });
    expect(inputTargetForm).not.toHaveValue(1000);
    expect(inputTargetForm).toHaveValue(999);
  });
  test('Output学習量フォームの入力', () => {
    const outputTargetForm = screen.getByTestId('flashcard-output-target-form');

    // ユーザーの入力が反映される
    // 100は入力できる(usecase)
    fireEvent.change(outputTargetForm, { target: { value: "100" } });
    expect(outputTargetForm).toHaveValue(100);

    // 9は入力できない(min境界値)->入力できずに10を代わりに入れる
    fireEvent.change(outputTargetForm, { target: { value: "9" } });
    expect(outputTargetForm).not.toHaveValue("9");
    expect(outputTargetForm).toHaveValue(10);

    // 10は入力できる(min境界値)
    fireEvent.change(outputTargetForm, { target: { value: "10" } });
    expect(outputTargetForm).toHaveValue(10);

    // 999は入力できる(max境界値)
    fireEvent.change(outputTargetForm, { target: { value: "999" } });
    expect(outputTargetForm).toHaveValue(999);

    // 1000は入力できない(max境界値)->入力できずに999を代わりに入れる
    fireEvent.change(outputTargetForm, { target: { value: "1000" } });
    expect(outputTargetForm).not.toHaveValue(1000);
    expect(outputTargetForm).toHaveValue(999);

  });

  test('単語帳の削除モーダルを表示したのち、単語帳設定モーダルに戻る', async () => {
    const deleteFlashcardModalBtn = screen.getByTestId('delete-flashcard-modal-btn');

    // 単語帳削除モーダルのレンダリング
    // ボタンをクリック
    fireEvent.click(deleteFlashcardModalBtn);

    // deleteFlashcardモーダルが開かれる
    const modalBase = await screen.findByTestId('modal');
    const deleteFlashcard = await screen.findByTestId('delete-flashcard-modal');
    expect(modalBase).toBeInTheDocument();
    expect(deleteFlashcard).toBeInTheDocument();

    // FlashCardSettingModal中のcloseボタンをクリックする
    const modalCloseBtn = screen.getByTestId('close-modal-btn');
    fireEvent.click(modalCloseBtn);

    // 開かれたモーダルの中のcloseボタンをクリックする
    // 単語帳編集モーダルに戻る
    await waitFor(() => {
      expect(screen.queryByTestId('delete-flashcard-modal')).not.toBeInTheDocument();
      expect(screen.queryByTestId('modal')).toBeInTheDocument();
      expect(screen.queryByTestId('flashcard-edit-modal')).toBeInTheDocument();
    });
  });

  test('更新ボタンのクリック', async () => {
    // 単語帳詳細モーダルに戻る
    // initではclickable
    const submitBtn = screen.getByTestId('update-flashcard-submit-btn');
    expect(submitBtn).toBeEnabled();

    // フォームを規定文字数以内で入力時にclickable
    const titleInput = screen.getByTestId('flashcard-title-form');
    fireEvent.change(titleInput, { target: { value: 'a' } });
    expect(submitBtn).toBeEnabled();

    // titleフォームの入力文字数が0の時にunclickable
    fireEvent.change(titleInput, { target: { value: '' } });
    expect(submitBtn).toBeDisabled();

    // clickable時にclickすると、単語帳編集モーダルに戻る
    fireEvent.change(titleInput, { target: { value: 'a' } });
    fireEvent.click(submitBtn);
    await waitFor(() => {
      expect(screen.queryByTestId('delete-flashcard-modal')).not.toBeInTheDocument();
      expect(screen.queryByTestId('modal')).toBeInTheDocument();
      expect(screen.queryByTestId('flashcard-edit-modal')).toBeInTheDocument();
    });
  });

  test('closeボタンクリック', async () => {
    const modalCloseBtn = screen.getByTestId('close-modal-btn');
    fireEvent.click(modalCloseBtn);
    // closeボタンをclickすると、単語帳詳細モーダルに戻る
    await waitFor(() => {
      expect(screen.queryByTestId('delete-flashcard-modal')).not.toBeInTheDocument();
      expect(screen.queryByTestId('modal')).toBeInTheDocument();
      expect(screen.queryByTestId('flashcard-detail')).toBeInTheDocument();
    });
  });

})
