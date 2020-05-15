/*eslint-disable */
import React from 'react';
import { Link, BrowserRouter } from "react-router-dom";
import './Header.css';


const Header = () => (
    
    <div className="logo">
            <ul className="menu">
                {/* <Link to="/Arcane"> */}
                    <li className="menu-item">Arcane</li>
                    {/* </Link> */}
                <Link to="/AddOp">
                    <li className="menu-item">AddOp</li>
                    </Link>
                   
                    <Link to="/Mvp"><li className="menu-item">Mvp</li></Link> 
            </ul>        
    </div>
)

export default Header;