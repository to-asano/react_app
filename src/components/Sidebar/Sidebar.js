import './Sidebar.css';
import React, { useEffect, useState } from 'react';
import useTodoStore from '../../stores/todoListStore'; // useTodoStoreのインポート

const Sidebar = () => {
    const storeTotos = useTodoStore((state) => state.todos);
    const storeDates = useTodoStore((state) => state.getDates);
    const setSelectedDate = useTodoStore((state) => state.setSelectedDate);
    const [dates, setDates] = useState([]);

    useEffect(() => {
        const fetchedDates = storeDates();
        setDates(fetchedDates);
    }, [storeTotos]);

    // 日付をyyyy/MM/dd形式にフォーマット
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    const clickList = (date) => () => {
        setSelectedDate(date);
    }

    return (
        <div className="sidebar">
            <ul>
                <li onClick={clickList()}>All</li>
                {dates.map((date) => (
                    <li key={date} onClick={clickList(date)}>{formatDate(date)}</li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;