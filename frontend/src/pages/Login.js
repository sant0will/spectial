import React, { useState } from 'react';
import './Login.css';
import logo from '../assets/logo.svg';
import api from '../services/api';

export default function Login({ history }) {
    const [type, setType] = useState('Login');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');

    function login(e) {
        e.preventDefault();

        console.log(email, password);

        history.push("/dashboard")
    }

    async function register(e) {
        e.preventDefault();

        const response = await api.post('/auth/register', {
            name,
            email,
            password,
            role
        });

        console.log(response);

        history.push("/dashboard")
    }

    function changeType({ target }) {
        let { text } = target;

        let login = document.getElementsByClassName("link-login")[0];
        let register = document.getElementsByClassName("link-register")[0];
        let selected_login = document.getElementById('login-id');
        let selected_register = document.getElementById('register-id');

        if (text === 'Login' && text !== type) {
            selected_login.classList.add("selected-type");
            selected_register.classList.remove("selected-type");
            register.style.display = 'none';
            login.style.display = 'flex';
            setType('Login');
        } else if (text === 'Registrar-se' && text !== type) {
            selected_login.classList.remove("selected-type");
            selected_register.classList.add("selected-type");
            register.style.display = 'flex';
            login.style.display = 'none';
            setType('Registrar-se');
        }
    }

    function changeRole({ target }){
        let { value } = target;

        let selected_teacher = document.getElementById('teacher-id');
        let selected_student = document.getElementById('student-id');

        console.log(value);

        if(value === 'teacher' && value !== role){
            selected_teacher.classList.add('selected-role');
            selected_student.classList.remove('selected-role');
            setRole(value);

        }else if(value === 'student' && value !== role){
            selected_teacher.classList.remove('selected-role');
            selected_student.classList.add('selected-role');
            setRole(value);
        }
    }

    return (
        <div className="row login-container">
            <img className="col-sm-12 col-md-6 col-lg-6" src={logo} alt="Spectial" />
            <form className="col-sm-12 col-md-6 col-lg-6">
                <div className="select-type">
                    <a onClick={changeType} id="login-id" className="selected-type">Login</a>
                    <a onClick={changeType} id="register-id">Registrar-se</a>
                </div>
                <div className="link-login">
                    <p>E-mail</p>
                    <input
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <p>Senha</p>
                    <input
                        placeholder="Digite a senha"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        type="password"
                    />
                    <a href="#">Esqueceu sua senha?</a>
                    <button
                        onClick={login}
                        type="button"
                        className="login-button"
                    >
                        Entrar
                    </button>
                </div>
                <div className="link-register" style={{ display: 'none' }}>
                    <p>Nome completo</p>
                    <input
                        placeholder="Digite seu nome completo"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    <p>E-mail</p>
                    <input
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <p>Senha</p>
                    <input
                        placeholder="Digite a senha"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        type="password"
                    />
                    <p>Confirme a senha</p>
                    <input
                        placeholder="Digite a senha"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                        type="password"
                    />
                    <p>Tipo de acesso</p>
                    <div className="roles">
                        <button
                            id="teacher-id"
                            onClick={changeRole}
                            type="button"
                            value={'teacher'}
                        >
                            Professor
                        </button>
                        <button
                            id="student-id"
                            onClick={changeRole}
                            type="button"
                            value={'student'}
                        >
                            Aluno
                        </button>
                    </div>

                    <button
                        onClick={register}
                        type="button"
                        className="register-button"
                    >
                        Enviar
                    </button>
                </div>
            </form>
        </div>
    );
}