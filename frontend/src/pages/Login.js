import React, { useState } from 'react';
import './Login.css';
import logo from '../assets/logo.svg';
import api from '../services/api';
import { Alert, Spinner } from 'reactstrap';
const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default function Login({ history }) {
    const [type, setType] = useState('Login');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(['', false]);
    const [msgAlert, setMsgAlert] = useState('');
    const [confirmed, setConfirmed] = useState('Senhas não conferem');
    const [isLoading, setIsLoading] = useState(false);


    function login(e) {
        e.preventDefault();

        console.log(email, password);

        history.push("/dashboard")
    }

    async function register(e) {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (verifyFields()){
                const response = await api.post('/auth/register', {
                    name,
                    email,
                    password,
                    role
                });
                console.log(response);

                const { data, status } = response;

                if (status === 200) {
                    document.getElementById('login-id').classList.add("selected-type");
                    document.getElementById('register-id').classList.remove("selected-type");
                    document.getElementsByClassName("link-register")[0].style.display = 'none';
                    document.getElementsByClassName("link-login")[0].style.display = 'flex';
                    setType('Login');
                    setAlert(['success', true]);
                    setMsgAlert('Usuário cadastrado com sucesso! Realize o login')
                    setIsLoading(false);
                } else {
                    setAlert(['danger', true]);
                    setMsgAlert('Falha ao cadastrar usuário!');
                    setIsLoading(false);
                }
            }else{
                setIsLoading(false);
            }
        } catch (error) {
            setAlert(['danger', true]);
            setMsgAlert('Falha ao cadastrar usuário! Tente novamente.');
            setIsLoading(false);
        }

        // history.push("/dashboard")
    }

    function verifyFields() {
        if(name === '' || email === '' || password === '' || confirmPassword === '' || role === ''){
            setAlert(['danger', true]);
            setMsgAlert('Campos obrigatórios não preenchidos, confira os dados.');
            return false;
        }

        if (email.match(regexEmail) === null) {
            setAlert(['danger', true]);
            setMsgAlert('E-mail com formato inválido.');
            return false;
        }

        if (password !== confirmPassword) {
            setAlert(['danger', true]);
            setMsgAlert('Senhas não conferem.');
            return false;
        }

        if (password === confirmPassword && password.length < 8) {
            setAlert(['danger', true]);
            setMsgAlert('Senha muito curta, minimo de 8 caracteres.');
            return false;
        }

        if (name.length < 10) {
            setAlert(['danger', true]);
            setMsgAlert('Nome muito curto, adicione mais caracteres.');
            return false;
        }

        if (role === '') {
            setAlert(['danger', true]);
            setMsgAlert('Selecione o tipo de acesso.');
            return false;
        }


        return true
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

    function changeRole({ target }) {
        let { value } = target;

        let selected_teacher = document.getElementById('teacher-id');
        let selected_student = document.getElementById('student-id');

        console.log(value);

        if (value === 'teacher' && value !== role) {
            selected_teacher.classList.add('selected-role');
            selected_student.classList.remove('selected-role');
            setRole(value);

        } else if (value === 'student' && value !== role) {
            selected_teacher.classList.remove('selected-role');
            selected_student.classList.add('selected-role');
            setRole(value);
        }
    }

    function showTextConfirm() {
        document.getElementsByClassName('txt-confirm')[0].style.display = 'flex';
    }

    return (
        <div className="row login-container">
            <img className="col-sm-12 col-md-6 col-lg-6" src={logo} alt="Spectial" />
            <form className="col-sm-12 col-md-6 col-lg-6">

                {
                    alert[1] ?

                        <Alert style={{ fontSize: 12 }} color={alert[0]}>
                            {msgAlert}
                        </Alert>
                        : null
                }
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
                    <p>Nome completo *</p>
                    <input
                        placeholder="Digite seu nome completo"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    <p>E-mail *</p>
                    <input
                        type="email"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <p>Senha *</p>
                    <input
                        placeholder="Digite a senha"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        type="password"
                    />
                    <p>Confirme a senha *</p>
                    <input
                        onFocus={showTextConfirm}
                        placeholder="Digite a senha"
                        value={confirmPassword}
                        onChange={(e) => {
                            let text = document.getElementsByClassName('txt-confirm')[0];
                            setConfirmPassword(e.target.value);
                            if (e.target.value === password) {
                                text.classList.add('confirmed');
                                setConfirmed("Senhas conferem");
                            } else {
                                text.classList.remove('confirmed');
                                setConfirmed("Senhas não conferem");
                            }
                        }}
                        type="password"
                    />
                    <p className="txt-confirm" style={{ display: 'none' }}>{confirmed}</p>
                    <p>Tipo de acesso *</p>
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
                        type="submit"
                        className="register-button"
                    >

                        {
                            isLoading ?
                                <Spinner color="light" style={{ marginLeft: '50%', width: '1rem', height: '1rem', alignSelf: 'center' }} />
                                :
                                "Enviar"
                        }

                    </button>
                </div>
            </form>
        </div>
    );
}