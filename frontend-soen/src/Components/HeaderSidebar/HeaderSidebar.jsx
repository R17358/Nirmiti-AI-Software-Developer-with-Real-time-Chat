import DashboardElement from "./DashboardElement"
import "./HeaderSidebar.css"
import { useState } from "react";

import React from 'react'

function HeaderSidebar() {

  return (
   <div className="sidebar">
      <DashboardElement icon={<i className="bx bx-home"></i>} name="Dashboard" link="/"/>
      <DashboardElement icon={<i className='bx bx-phone-call'></i>} name="Chat" link="/chat" />
      <DashboardElement icon={<i className="bx bx-group"></i>} name="Members" link="/aboutus"/>
      <DashboardElement icon={<i className="bx bx-refresh"></i>} name="Follow Ups" link="/follow"/>
      <DashboardElement icon={<i className='bx bx-book-alt' ></i>} name="Membership Plans" link="/plans"/>
      <DashboardElement icon={<i className='bx bx-calendar-alt' ></i>} name="Schedule" link="/schedule"/>
      <DashboardElement icon={<i className="bx bx-group"></i>} name="Memberships" link="/membership"/>
      <DashboardElement icon={<i className="bx bx-dollar"></i>} name="Payments" link="/payment"/>
      <DashboardElement icon={<i className="bx bx-bar-chart-alt-2"></i>} name="Reports" link="/report"/>
      <DashboardElement icon={<i className="bx bx-message-dots"></i>} name="Feedbacks" link="/feedback"/>
      <DashboardElement icon={<i className="bx bx-group"></i>} name="Employees" link="/employees"/>
      <DashboardElement icon={<i className="bx bx-plus"></i>} name="App Plus" link="/more"/>
   </div>

  )
}

export default HeaderSidebar