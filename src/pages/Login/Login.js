import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Login.css';
import { isLoggedIn, login } from '../../Utils/auth';

const Login = () => {
    const navigate = useNavigate();
    const [err, setErr] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/');
        }
    }, []);

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const loginProcess = (event) => {
        event.preventDefault();
        setErr("");

        if (name == "test" && password == "test") {
            // ログイン成功
            login();
            navigate('/');
        } else {
            setErr("IDまたはPWが違います。");
        }
    }

    return (
        <div className='login'>
            <h2>Login</h2>
            <div className='err-field'>
                <p>{err && err.trim() !== "" ? err.trim() : null}</p>
            </div>
            <div className='form-field'>
                <label htmlFor="id">ID</label>
                <input
                    type='text'
                    id="id"
                    value={name}
                    name="id"
                    onChange={handleNameChange}
                />
            </div>
            <div className='form-field'>
                <label htmlFor='pw'>PW</label>
                <input
                    type='text'
                    id="pw"
                    value={password}
                    name="pw"
                    onChange={handlePasswordChange}
                />
            </div>
            <div className='form-field'>
                <button
                    value="submit"
                    onClick={loginProcess}
                >
                    送信
                </button>
            </div>
        </div>
    )
}

export default Login;