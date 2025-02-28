import React from 'react'
import logo from '../../assets/robot.webp'
import './LoginPage.css'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { login } from '../../actions/userAction'

function LoginPage() {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated } = useSelector((state) => state.user);

    const handleSubmit = (e) => {
        e.preventDefault();
    
    dispatch(login(email, password));
    
    setEmail('');
    setPassword('');
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className='login-container'>
            <div className="logo">
                <img src={logo} alt="freefire" width="400px" height="200px" />
            </div>
            <div className="login-form">
                <div className="login-form-header">
                <h3>LOGIN FORM</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="login-input">
                        <div className="username">
                            <div className="username-icon">
                                <box-icon type='solid' name='user'></box-icon>
                            </div>
                            <div className="username-input">
                                <input type="text" name="email" id="username" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                        <div className="password">
                            <div className="password-icon">
                                <box-icon type='solid' name='lock'></box-icon>
                            </div>
                            <div className="password-input">
                                <input type="password" name="password" placeholder='Password' id="password"  value={password}  onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className="forgot">
                        <p>forgot password</p>
                    </div>
                    <div className="login-button">
                        <button>LOG IN</button>
                        <Link to="/register">SignUp</Link>
                    </div>
                </form>
             
            </div>
        </div>
    )
}

export default LoginPage