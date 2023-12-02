import React from "react";
import { Outlet } from "react-router-dom";
import './Layout.css'
const Layout= ()=>{
    const [isProfileOpen, setIsProfileOpen] = React.useState(false);

    const toggleProfileDropdown = () => {
      setIsProfileOpen(!isProfileOpen);
    };
  
    return (
      <>
        <header className="header">
      <h3 className="nav-title">PhD Research Tool</h3>
      <ul className="nav-links">
        <li><a href="/dashboard">Home</a></li>
        <li><a href="/bookmarks">Library</a></li>
      </ul>
      <div className="profile-dropdown">
        <div className="profile-trigger" onClick={toggleProfileDropdown}>
          <span>Profile</span>
          <span className="arrow-icon">&#9660;</span>
        </div>
        {isProfileOpen && (
          <ul className="profile-menu">
            <li><a href="/profile">My Profile</a></li>
            <li><a href="/settings">Settings</a></li>
            <li><a href="/logout">Logout</a></li>
          </ul>
        )}
      </div>
    </header>
          <Outlet></Outlet>
</>
    );
};

export default Layout;