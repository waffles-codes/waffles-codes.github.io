import React from 'react';
import './Navbar.css';

const Navbar = () => {
return (
    <nav className="navbar">
        <div className="navbar-left">
            <h1>
                Evan&nbsp;Lu
            </h1>
        </div>

        <div className="navbar-center">
            <ul className="nav-links">
                <li>
                    <a href="/about">About&nbsp;Me</a>
                </li>
                <li>
                    <a href="/projects">Projects</a>
                </li>
                <li>
                    <a href="/contact">Contact</a>
                </li>
            </ul>
        </div>
        
        <div className="navbar-right">
            <a href="mailto:evalu802@gmail.com" className="image-links">
                <img src="email.svg" width="20"/>
            </a>
            <a href="https://www.linkedin.com/in/waffles-codes/" className="image-links">
                <img src="linkedin.svg" width="20"/>
            </a>
            <a href="https://github.com/waffles-codes" className="image-links">
                <img src="github.svg" width="20"/>
            </a>
        </div>
    </nav>
    );
};

export default Navbar;