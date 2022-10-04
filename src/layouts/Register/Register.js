import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './Register.module.scss';
import Field from '~/components/Field';
import img from '~/asset/img/login/fashion.webp';

const cx = classNames.bind(styles);

function Register() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [fullName, setFullName] = useState('');
    const [errorMessage, setErrorMessage] = useState({
        userName: '',
        password: '',
        phoneNumber: '',
        fullName: '',
    });

    const navigate = useNavigate();

    const handleChangeUserName = (e) => {
        setUserName(e.target.value);
    };
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleChangePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
    };
    const handleChangeFullName = (e) => {
        setFullName(e.target.value);
    };

    const handleSubmit = () => {
        const data = {
            userName,
            password,
            phoneNumber,
            fullName,
        };
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };
        fetch('http://localhost:3002/api/register', options)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.title === 'Input Error') {
                    const result = {};
                    data.errorRegister.forEach((item) => {
                        result[item.fieldName] = item.errorMessage;
                    });
                    setErrorMessage(result);
                } else {
                    toast.success('Register is successfully', {
                        position: 'top-right',
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        onClose: () => navigate('/login', { replace: true }),
                    });
                }
            });
    };

    const handleFocus = (e) => {
        setErrorMessage({
            ...errorMessage,
            [e.target.name]: '',
        });
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
                    <div className={cx('form')}>
                        <Field
                            name="User name:"
                            inputName="userName"
                            className={cx('custom-field')}
                            value={userName}
                            handleChange={handleChangeUserName}
                            messageError={errorMessage.userName}
                            handleFocus={handleFocus}
                        />
                        <Field
                            name="Password"
                            inputName="password"
                            type="password"
                            className={cx('custom-field')}
                            value={password}
                            handleChange={handleChangePassword}
                            messageError={errorMessage.password}
                            handleFocus={handleFocus}
                        />
                        <Field
                            name="Phone Number"
                            inputName="phoneNumber"
                            className={cx('custom-field')}
                            value={phoneNumber}
                            handleChange={handleChangePhoneNumber}
                            messageError={errorMessage.phoneNumber}
                            handleFocus={handleFocus}
                        />
                        <Field
                            name="Full Name"
                            inputName="fullName"
                            className={cx('custom-field')}
                            value={fullName}
                            handleChange={handleChangeFullName}
                            messageError={errorMessage.fullName}
                            handleFocus={handleFocus}
                        />
                    </div>
                    <div className={cx('button-form')}>
                        <button onClick={handleSubmit} className={cx('authen')}>
                            Create Account
                        </button>
                        <span className={cx('text')}>
                            Already have an account? <Link to={'/login'}>Login</Link>
                        </span>
                        <span className={cx('or')}>OR</span>
                        <div className={cx('login-container')}>
                            <a href="/register" className={cx('login-with')}>
                                <FcGoogle className={cx('icons')} />
                                <span>Sing up with Google</span>
                            </a>
                            <a href="/register" className={cx('login-with')}>
                                <FaFacebook className={cx('icons')} />
                                <span>Sing up with Facebook</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Register;
