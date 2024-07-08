import { useState, useEffect } from 'react';
import useTodoStore from '../../stores/todoListStore';
import './Todos.css';

const Todos = () => {
    const storeTodos = useTodoStore((state) => state.todos);
    const selectedDate = useTodoStore((state) => state.selectedDate);
    const getTodos = useTodoStore((state) => state.getSelectedDateTodos);
    const [todos, setTodos] = useState([]);
  
    useEffect(() => {
      const fetchedTodos = getTodos();
      setTodos(fetchedTodos);
    }, [storeTodos, selectedDate]);

    function formatDate(date) {
        const createDate = new Date(date);
        const year = createDate.getFullYear();
        const month = String(createDate.getMonth() + 1).padStart(2, '0');
        const day = String(createDate.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    }

    return (
        <div className="todos">
            {todos.map(todo => (
                <div key={todo.id} className="todo">
                    <p className='date'>{formatDate(todo.date)}</p>
                    <h3 className='title'>{todo.title}</h3>
                    <p className='content'>{todo.content}</p>
                </div>
            ))}
        </div>
    );
}

export default Todos