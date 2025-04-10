import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import Home from '../../components/pages/Home';



test('renders h1 text', () => {
  render(<Home />);
  const headerElement = screen.getByText("単語帳");
  expect(headerElement).toBeInTheDocument();
});




// ## Homeページ ##
// 見出しに「単語帳」と表示していること
// 単語帳一覧上部に「My単語帳」「ブックマーク」「探す」のタブが表示されていること
// 「My単語帳」選択中は、ユーザーが持つ全ての単語帳が表示されていること
// 単語帳新規作成ボタンが表示されていること
// 単語帳新規作成ボタンをクリックすると、新規作成モーダル(NewFlashCardコンポーネント)が表示されること
