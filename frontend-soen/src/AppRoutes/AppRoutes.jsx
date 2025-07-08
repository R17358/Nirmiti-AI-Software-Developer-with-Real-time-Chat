import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from "../Pages/Home/Home";
import SignUp from "../Components/SignUp/SignUp";
import LoginPage from "../Components/Login/LoginPage";
import { Provider } from 'react-redux';
import store from '../store';
import Header from '../Components/Header/Header';
import HeaderSidebar from '../Components/HeaderSidebar/HeaderSidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../AppRoutes/AppRoutes.css';
import LogOut from '../Components/LogOut/LogOut';
import Chat from '../Pages/Chat/Chat';
import About from '../Pages/About/About';
import WorkingOnFeature from '../Components/Not_available/WorkingOnFeature';

function AppRoutes() {
  const [collapse, setCollapse] = useState(window.innerWidth <= 450);

  useEffect(() => {
    const handleResize = () => {
      setCollapse(window.innerWidth <= 450);
    };

    window.addEventListener('resize', handleResize);

    // Clean up event on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="top-Header">
          <Header setCollapse={setCollapse} collapse={collapse} />
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
            <Route path="/aboutus" element={<About />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/follow" element={<WorkingOnFeature />} />
            <Route path="/plans" element={<WorkingOnFeature />} />
            <Route path="/schedule" element={<WorkingOnFeature />} />
            <Route path="/membership" element={<WorkingOnFeature />} />
            <Route path="/payment" element={<WorkingOnFeature />} />
            <Route path="/report" element={<WorkingOnFeature />} />
            <Route path="/feedback" element={<WorkingOnFeature />} />
            <Route path="/employees" element={<WorkingOnFeature />} />
            <Route path="/more" element={<WorkingOnFeature />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default AppRoutes;
