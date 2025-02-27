import React from 'react';
import './DashboardElement.css';
import { NavLink } from 'react-router-dom';

function DashboardElement({ icon, name, link }) {
  return (
    <div className='dashboard-element'>
      <NavLink
        to={link}
        className={({ isActive }) => (isActive ? "Dashboard active" : "Dashboard")}
        style={{ textDecoration: 'none' }}
      >
        <div className="dashboard-icon">{icon}</div>
        <div className="dashboard-text">
          <h2>{name}</h2>
        </div>
      </NavLink>
    </div>
  );
}

export default DashboardElement;
