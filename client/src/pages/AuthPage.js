import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/Auth.context'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading,  request, error, clearError } = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
            message(data.message)
        } catch (e) {}
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    return (
        <div className='row'>
            <div className="col s6 offset-s3">
                <h1 style={{ textAlign: 'center' }}>Сократи ссылку</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>

                        <form>
                            <div className="input-field">
                                <input
                                    placeholder="Введите email"
                                    id="email"
                                    type="email"
                                    name='email'
                                    className='white-input'
                                    value={form.email}
                                    onChange={ changeHandler }
                                />
                                    <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input
                                    autoComplete='off'
                                    id="password"
                                    type="password"
                                    className='white-input'
                                    name='password'
                                    value={form.password}
                                    onChange={ changeHandler }
                                />
                                    <label htmlFor="password">Пароль</label>
                            </div>
                        </form>

                        <div className="card-action">
                            <button
                                className='btn orange darken-3'
                                style={{ marginRight: 20 }}
                                onClick={ loginHandler }
                                disabled={ loading }
                            >
                                Войти
                            </button>
                            <button
                                className='btn white black-text darken-4'
                                onClick={ registerHandler }
                                disabled={ loading }
                            >
                                Регистрация
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}