import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import './Layout.css'
const Layout= ()=>{
    const [isProfileOpen, setIsProfileOpen] = React.useState(false);
    const navigate = useNavigate();
    const toggleProfileDropdown = () => {
      setIsProfileOpen(!isProfileOpen);
    };

    const logout = () => {
      sessionStorage.clear();
      navigate('/login')
    }
  
    return (
      <>
        <header className="header">
      <h3 className="nav-title">PhD Research Tool</h3>
      <ul className="nav-links">
            <li><a href="/home">Home</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/bookmarks">Library</a></li>
      </ul>
      <div className="profile-dropdown">
        <div className="profile-trigger" onClick={toggleProfileDropdown}>
          <span>Profile</span>
          <span className="arrow-icon">&#9660;</span>
        </div>
        {isProfileOpen && (
          <ul className="profile-menu">
            <li><button>Profile</button></li>
            <li><button>Settings</button></li>
            <li><button onClick={logout}>Logout</button></li>
          </ul>
        )}
      </div>
    </header>
          <Outlet></Outlet>
</>
    );
};

export default Layout;