import React from 'react'
import logo from '../../assets/robot.webp'
import './SignUp.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { register } from '../../actions/userAction'
import { toast } from 'react-toastify'

function SignUp() {


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('admin')
    const [cnfPass, setCnfPass] = useState('');


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated } = useSelector((state) => state.user);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newUser = { name, email, password, role };

        // Dispatch action to add the new product
        if (password === cnfPass)
            dispatch(register(newUser));
        else
            toast.error("Password Not Matched")

        // Clear form after submission
        setName(name);
        setEmail(email);
        setPassword('');
        setRole(role);
        setCnfPass('');
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className='login-container'>
            <div className="logo">
                <img src={logo} alt="gymshim" width="400px" height="200px" />
            </div>
            <div className="login-form"  id='register'>
                <div className="login-form-header">
                    <h3>REGISTRATION FORM</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="login-input">
                    <div className="username">
                            <div className="username-icon">
                                <box-icon type='solid' name='user'></box-icon>
                            </div>
                            <div className="username-input">
                                <input type="text" id="name" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="username">
                            <div className="username-icon">
                                <box-icon type='solid' name='user'></box-icon>
                            </div>
                            <div className="username-input">
                                <input type="text" id="username" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="password">
                            <div className="password-icon">
                                <box-icon type='solid' name='lock'></box-icon>
                            </div>
                            <div className="password-input">
                                <input type="password" placeholder='Password' id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                        </div>
                        <div className="password">
                            <div className="password-icon">
                                <box-icon type='solid' name='lock'></box-icon>
                            </div>
                            <div className="password-input">
                                <input type="password"  placeholder='Password' id="cnfpassword" value={cnfPass} onChange={(e) => setCnfPass(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="username">
                            <div className="username-icon">
                                <box-icon type='solid' name='user'></box-icon>
                            </div>
                            <div className="username-input">
                                <select 
                                    name="role" 
                                    id="role" 
                                    value={role} 
                                    onChange={(e) => setRole(e.target.value)} 
                                    required
                                >
                                    <option value="admin">admin</option>
                                    <option value="user">user</option>
                                </select>
                            </div>

                        </div>

                    </div>
                    <div className="login-button">
                        <button>Sign Up</button>
                    </div>
                    <Link to="/login"><p>Already account?LogIn</p></Link>
                </form>

            </div>
        </div>
    )
}

export default SignUp