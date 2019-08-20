import React, { useState } from 'react';
import './Login.css';
import logo from '../assets/logo.svg';

export default function Login({ history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e){
        e.preventDefault();

        console.log(email);

        history.push("/dashboard")
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Spectial"/>
                <input
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={ (e) => {
                        setEmail(e.target.value);
                    }}
                />
                <input
                    placeholder="Digite a senha"
                    value={password}
                    onChange={ (e) => {
                        setPassword(e.target.value);
                    }}
                    type="password"
                />
                <button
                    type="submit"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
}