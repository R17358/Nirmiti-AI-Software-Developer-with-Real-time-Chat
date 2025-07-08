import React, { useEffect } from 'react';
import './Header.css';
import logo from '../../assets/soen_logo.png';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Header({ setCollapse, collapse }) {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  // Automatically add/remove body class when collapse changes
  useEffect(() => {
    const dashboardElements = document.querySelectorAll('.Dashboard');
    if (collapse) {
      document.body.classList.add('collapse');
    } else {
      document.body.classList.remove('collapse');
    }
  }, [collapse]);

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <div className='header'>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="button-collapse">
        <button type="button" onClick={handleCollapse}>
          <i
            className="bx bx-menu"
            style={{
              transform: collapse ? 'rotate(90deg)' : 'scaleY(-1)',
              color: '#fff1f1',
            }}
          ></i>
        </button>

        {isAuthenticated ? (
          <div className="header-username">
            <h2>{user?.email}</h2>
            <Link to="/logout">
              <i className="bx bx-log-out" style={{ color: '#ffeeee' }}></i>
            </Link>
          </div>
        ) : (
          <br />
        )}
      </div>
    </div>
  );
}

export default Header;
