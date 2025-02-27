import React from 'react'
import './Header.css'
import logo from '../../assets/soen_logo.png'
import { useState } from 'react';
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom';

function Header({setCollapse, collapse}) {

  
  // const [collapse, setCollapse] = useState(false);
  const {isAuthenticated, user} = useSelector((state) => state.user);

    const handleCollapse = ()=>{
        setCollapse(!collapse);
        const dashboardElements = document.querySelectorAll(".Dashboard");
        dashboardElements.forEach((element) => {
          if (collapse) {
            document.body.classList.remove("collapse");
          } else {
            document.body.classList.add("collapse");
          }
        })
    }
   // console.log("user",user.name)

  return (
    <div className='header'>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="button-collapse">
      {collapse ? (
  <button type="button" onClick={handleCollapse}>
    <i className="bx bx-menu" style={{ transform: 'rotate(90deg)', color: '#fff1f1' }}></i>
  </button>
) : (
  <button type="button" onClick={handleCollapse}>
    <i className="bx bx-menu" style={{ transform: 'scaleY(-1)', color: '#fff4f4' }}></i>
  </button>
)}   

      {isAuthenticated?
     ( <div className="header-username">
        <h2>{user?.email}</h2>
       <Link to="/logout"><i className="bx bx-log-out" style={{ color: '#ffeeee' }}></i>

       </Link>
        </div>): (<br/>)}
    </div>
    </div>
  )
}

export default Header