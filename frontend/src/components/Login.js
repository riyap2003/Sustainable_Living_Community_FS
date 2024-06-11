import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
import backgroundImage from './login1.png'; 
function Login() {
    const [values, SetValues] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        SetValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if (errors.email === '' && errors.password === '') {
            axios
                .post('http://localhost:8081/login', values)
                .then((res) => {
                    if (res.data.success) {
                        navigate('/home');
                    } else {
                        alert('Invalid email or password');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('An error occurred while processing your request');
                });
        }
    };

    return (
    
        <div
            className='d-flex justify-content-center align-items-center'
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: '50%',
                backgroundPosition: 'left',
                backgroundRepeat: 'no-repeat',
                height: '100vh'
                
            }}
        >
            <div className='bg-white p-3 rounded w-25'  style={{ marginLeft: '40%' ,position: 'absolute',
            width: '100%',
            height: '65%',
            backgroundColor: 'rgba(255, 255, 255, 0.5)'  }}>
                <h2>Sign-in</h2>
                <form action='' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'>
                            <strong>Email</strong>
                        </label>
                        <input
                            type='email'
                            placeholder='Enter Email'
                            name='email'
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'>
                            <strong>Password</strong>
                        </label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            name='password'
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>
                        <strong>Log in</strong>
                    </button>
                    <p>You are agreeing to our terms and policies</p>
                    <Link
                        to='/signup'
                        className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'
                    >
                        Create Account
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;