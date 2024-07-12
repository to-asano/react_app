import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AddTodos from './AddTodos';
import { BrowserRouter } from 'react-router-dom';

// テスト用のラッパーコンポーネントを作成
const RouterWrapper = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);

describe('AddTodos Component', () => {
  beforeEach(() => {
    // テストごとにlocalStorageをクリアしてからlogin: trueをセット
    localStorage.clear();
  });

  const { container } = render(
    <RouterWrapper>
      <AddTodos />
    </RouterWrapper>
  );

  test('レンダリング時、addTodosが表示される', () => {
    const element = container.querySelector('.addTodos');
    expect(element).not.toBeNull();
  });

  test('Date, Title, Content 全て未入力', async () => {
    render(
      <RouterWrapper>
        <AddTodos />
      </RouterWrapper>
    );

    // ログイン
    localStorage.setItem('login', 'true');

    // 入力フィールドを取得
    const dateInput = screen.getByLabelText(/date/i);
    const titleInput = screen.getByRole('textbox', { name: /title/i });
    const contentInput = screen.getByRole('textbox', { name: /content/i });
    
    // すべての入力フィールドに "" を設定
    fireEvent.change(dateInput, { target: { value: "" } });
    fireEvent.change(titleInput, { target: { value: "" } });
    fireEvent.change(contentInput, { target: { value: "" } });

    // submitボタンを取得し、クリックイベントを発火
    const submitButton = screen.getByText('Add');
    await userEvent.click(submitButton);

    // エラーメッセージが表示されることを確認
    expect(screen.getByText(/Date を入力してください/i)).toBeInTheDocument();
    expect(screen.getByText(/Title を入力してください/i)).toBeInTheDocument();
    expect(screen.getByText(/Content を入力してください/i)).toBeInTheDocument();
  });

  test('Date が未入力', async () => {
    render(
      <RouterWrapper>
        <AddTodos />
      </RouterWrapper>
    );

    // ログイン
    localStorage.setItem('login', 'true');
    
    // 入力フィールドを取得
    const dateInput = screen.getByLabelText(/date/i);
    
    // すべての入力フィールドに "" を設定
    fireEvent.change(dateInput, { target: { value: "" } });

    // submitボタンを取得し、クリックイベントを発火
    const submitButton = screen.getByText('Add');
    await userEvent.click(submitButton);

    // エラーメッセージが表示されることを確認
    expect(screen.getByText(/Date を入力してください/i)).toBeInTheDocument();
  });

  test('Title が未入力', async () => {
    render(
      <RouterWrapper>
        <AddTodos />
      </RouterWrapper>
    );

    // ログイン
    localStorage.setItem('login', 'true');

    // 入力フィールドを取得
    const titleInput = screen.getByRole('textbox', { name: /title/i });
    
    // すべての入力フィールドに "" を設定
    fireEvent.change(titleInput, { target: { value: "" } });

    // submitボタンを取得し、クリックイベントを発火
    const submitButton = screen.getByText('Add');
    await userEvent.click(submitButton);

    // エラーメッセージが表示されることを確認
    expect(screen.getByText(/Title を入力してください/i)).toBeInTheDocument();
  });

  test('Content が未入力', async () => {
    render(
      <RouterWrapper>
        <AddTodos />
      </RouterWrapper>
    );

    // ログイン
    localStorage.setItem('login', 'true');

    // 入力フィールドを取得
    const contentInput = screen.getByRole('textbox', { name: /content/i });
    
    // すべての入力フィールドに "" を設定
    fireEvent.change(contentInput, { target: { value: "" } });

    // submitボタンを取得し、クリックイベントを発火
    const submitButton = screen.getByText('Add');
    await userEvent.click(submitButton);

    // エラーメッセージが表示されることを確認
    expect(screen.getByText(/Content を入力してください/i)).toBeInTheDocument();
  });
});