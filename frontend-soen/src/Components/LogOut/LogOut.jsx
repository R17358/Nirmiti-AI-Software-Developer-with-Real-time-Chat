import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import {logout} from '../../actions/userAction'
import LoginPage from '../Login/LoginPage';
import { useNavigate } from 'react-router-dom';

function LogOut() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(logout());
        navigate('/login');
    }, [dispatch, navigate]); 
}

export default LogOut

