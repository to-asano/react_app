import React, { useState } from 'react';

import Sidebar from '../../components/Sidebar/Sidebar';
import Todos from '../../components/Todos/Todos';
import AddTodos from '../../components/AddTodos/AddTodos';
import './Home.css';

const Home = () => {
    const [isActive, setIsActice] = useState(true);

    const toggleTodos = () => {
        if (!isActive) {
            setIsActice(!isActive);
        }
    }

    const toggleAdd = () => {
        if (isActive) {
            setIsActice(!isActive);
        }
    }

    return (
        <div>
            <h2>Home</h2>
            <div className='btns'>
            <button
                className={isActive ? 'active' : ''}
                onClick={toggleTodos}
            >
                Todos
            </button>
            <button
                className={!isActive ? 'active' : ''}
                onClick={toggleAdd}
            >
                Add
            </button>
            </div>        
            <div className='todo-area'>
                <Sidebar />
                { isActive
                    ? (<Todos />)
                    : (<AddTodos setIsActice={setIsActice} />)
                }
            </div>
        </div>
    );
}

export default Home;