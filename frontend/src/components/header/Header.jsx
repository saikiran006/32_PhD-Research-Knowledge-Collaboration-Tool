import React from "react";
import './Header.css'
const Header= ()=>{

    return (
        <header>
            <h3 className="Nav-title">Title</h3>
        <ul className="flex-ul">
            <li>First Link</li>
            <li>Second Link</li>
        </ul>
        <ul className="flex-ul">
            <li>
                profile
            </li>
        </ul>
       </header>
    );
};

export default Header;