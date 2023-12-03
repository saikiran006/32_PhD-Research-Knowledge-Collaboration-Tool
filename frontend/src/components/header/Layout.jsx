import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import './Layout.css'
const Layout= ()=>{
    const navigate = useNavigate();

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
            <button onClick={logout} style={{ marginLeft:300 }}>Logout</button>
      </ul>
    </header>
          <Outlet></Outlet>
</>
    );
};

export default Layout;