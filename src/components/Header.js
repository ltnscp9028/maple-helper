import React from 'react';
import { Link, BrowserRouter } from "react-router-dom";
import './Header.css';


const Header = () => (
    
    <div className="logo">
            <ul className="menu">
                {/* <Link to="/Arcane"> */}
                <BrowserRouter basename="/maple-helper">
                    <li className="menu-item">Arcane</li>
                    {/* </Link> */}
                {/* <Link to="/AddOp"> */}
                    <li className="menu-item">AddOp</li>
                    {/* </Link> */}
                   
                    <Link to="/maple-helper/Mvp"><li className="menu-item">Mvp</li></Link>
                </BrowserRouter>   
            </ul>        
    </div>
)

export default Header;