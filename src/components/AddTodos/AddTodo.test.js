import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddTodos from './AddTodos';

describe('AddTodos Component', () => {
    test('renders AddTodos component', () => {
      render(<AddTodos />);
      expect(screen.getByText('Add')).toBeInTheDocument();
    });

    test('clicking Add button triggers addTodo function', () => {
        const mockAddTodo = jest.fn();
        render(<AddTodos addTodo={mockAddTodo} />);
    
        // "Add"というテキストを持つボタンを見つける
        const addButton = screen.getByText('Add');
        // ボタンが存在することを確認
        expect(addButton).toBeInTheDocument();
    
        // ボタンをクリック
        fireEvent.click(addButton);
    
        // addTodo関数が呼び出されたことを確認
        expect(mockAddTodo).toHaveBeenCalled();
      });
});