import React from 'react'
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Home from "../Pages/Home/Home"
import SignUp from "../Components/SignUp/SignUp"
import LoginPage from "../Components/Login/LoginPage"
import { Provider } from 'react-redux'
import store from '../store'
import Header from '../Components/Header/Header'
import HeaderSidebar from '../Components/HeaderSidebar/HeaderSidebar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../AppRoutes/AppRoutes.css'
import LogOut from '../Components/LogOut/LogOut'
import Chat from '../Pages/Chat/Chat'
import { useState } from 'react'

function AppRoutes() {

  const [collapse, setCollapse] = useState(false);

  return (
    <Provider store={store}>
    <Router>
    <div className="top-Header">
        <Header  setCollapse={setCollapse} collapse={collapse} />
    </div>
    <div className="Header-sidebar">
        <HeaderSidebar />
    </div>
        <div className="main-container">
        <ToastContainer position="top-right" autoClose={2000} />     
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="/chat" element={<Chat collapse={collapse} />} />
        </Routes>
        </div>
    </Router>
    </Provider>
  )
}

export default AppRoutes