import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import './AddTodos.css';
import useTodoStore from "../../stores/todoListStore";
import { isLoggedIn, logout } from "../../Utils/auth";

const AddTodos = ({ setIsActice }) => {
    const navigate = useNavigate();
    const { addTodo, getTodos } = useTodoStore();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");
    const [errs, setErrs] = useState({});

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
        if (event.target.value.trim() !== '') {
            setErrs(prev => ({ ...prev, title: '' }));
        }
    }

    const handleContentChange = (event) => {
        setContent(event.target.value);
        if (event.target.value.trim() !== '') {
            setErrs(prev => ({ ...prev, content: '' }));
        }
    }

    const handleDateChange = (event) => {
        setDate(event.target.value);
        if (event.target.value !== '') {
            setErrs(prev => ({ ...prev, date: '' }));
        }
    }
    
    const tapAddTodo = () => {
        if (!isLoggedIn()) {
            logout();
            navigate('/login');
            return;
        }

        if (validateInputs()) {
            addTodo(date, title, content);
            setIsActice(true);
            /*
            // オプション: フォームをクリアする
            setTitle('');
            setContent('');
            setDate('');
            */
        }
    }

    const validateInputs = () => {
        const newErrs = {};
        if (date.trim() === '') newErrs.date = 'Date を入力してください';
        if (title.trim() === '') newErrs.title = 'Title を入力してください';
        if (content.trim() === '') newErrs.content = 'Content を入力してください';
        setErrs(newErrs);
        return Object.keys(newErrs).length === 0;
    }

    return (
        <div className="addTodos">
            <div className="form-field">
                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={handleDateChange}
                />
                {errs.date && <p className="error" data-testid="date-error">{errs.date}</p>}
            </div>
            <div className="form-field">
                <label htmlFor="title">Title</label>
                <input 
                    type='text'
                    id="title"
                    name="title" 
                    value={title}
                    onChange={handleTitleChange}
                />
                {errs.title && <p className="error">{errs.title}</p>}
            </div>
            <div className="form-field">
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    name="content"
                    value={content}
                    onChange={handleContentChange}
                />
                {errs.content && <p className="error">{errs.content}</p>}
            </div>
            <div className="form-field">
                <button
                    value="submit"
                    onClick={tapAddTodo}
                >
                Add
                </button>
            </div>
        </div>
    );
}

export default AddTodos;