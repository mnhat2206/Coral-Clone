import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

import styles from './Login.module.scss';
import Field from '~/components/Field';
import img from '~/asset/img/login/fashion2.webp';
import { useStore } from '~/hooks';
import { user_login } from '~/store/actions';

const cx = classNames.bind(styles);

function Login() {
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState('');

    const [, dispatch] = useStore();

    const handleChangeUserName = (e) => {
        setUserName(e.target.value);
    };
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let navigate = useNavigate();

    const handleLogin = () => {
        const data = {
            userName,
            password,
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        fetch(`https://coral-server.onrender.com/api/login`, options)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (!data.errorMessage) {
                    dispatch(user_login(data));
                    if (!data.isCustomer) {
                        navigate('/admin/products', { replace: true });
                    } else {
                        navigate('/', { replace: true });
                    }
                } else {
                    setErrorMessage(data.errorMessage);
                }
            });
    };

    const handleFocus = () => {
        setErrorMessage('');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div style={{ backgroundImage: `url(${img})` }} className={cx('left', 'img')}></div>
                <div className={cx('right')}>
                    <h3 className={cx('title')}>
                        Welcome to{' '}
                        <Link to="/" style={{ color: '#1894c9' }}>
                            Coral
                        </Link>
                    </h3>
                    <span style={{ textAlign: 'center', display: 'block' }}>Login with admin rights: admin/admin</span>
                    <div className={cx('form')}>
                        <Field
                            name="User name:"
                            className={cx('custom-field')}
                            value={userName}
                            handleChange={handleChangeUserName}
                            handleFocus={handleFocus}
                        />
                        <Field
                            name="Password"
                            type="password"
                            className={cx('custom-field')}
                            value={password}
                            handleChange={handleChangePassword}
                            handleFocus={handleFocus}
                        />
                    </div>
                    {errorMessage && <span className={cx('error-message')}>{errorMessage}</span>}
                    <div className={cx('button-form')}>
                        <button onClick={() => handleLogin()} className={cx('authen')}>
                            Login
                        </button>
                        <span className={cx('text')}>
                            Already have an account? <Link to={'/register'}>Register</Link>
                        </span>
                        <span className={cx('or')}>OR</span>
                        <div className={cx('login-container')}>
                            <a href="/login" className={cx('login-with')}>
                                <FcGoogle className={cx('icons')} />
                                <span>Sing up with Google</span>
                            </a>
                            <a href="/login" className={cx('login-with')}>
                                <FaFacebook className={cx('icons')} />
                                <span>Sing up with Facebook</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
