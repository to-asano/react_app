import React from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './Header.css';
import { isLoggedIn, logout } from "../../Utils/auth";

const Header = () => {
    const navigate = useNavigate();

    const tapLogin = () => {
        logout();
        navigate('/login');
    }

    return (
        <header>
            { isLoggedIn() ? (<_LoginHedaer />) : (<_NotLoginHeader />) }
            <ul>
                <li><Link to="/other">Other</Link></li>
                <li><Link to="/">Home</Link></li>
                <li>
                    <button className="btn-login" onClick={tapLogin}>
                        {isLoggedIn() ? "Logout" : "Login"}
                    </button>
                </li>
            </ul>
        </header>
    );
}

const _LoginHedaer = () => {
    return (
        <div>
            <p>Logged In!</p>
        </div>
    );
}

const _NotLoginHeader = () => {
    return (
        <div>
            <p>Not Logged In!</p>
        </div>
    )
}

export default Header;