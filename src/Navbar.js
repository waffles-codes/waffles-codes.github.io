import React from 'react';
import './Navbar.css';

const Navbar = () => {
return (
    <nav className="navbar">
        <div className="navbar-left">
            <h1>
                Evan Lu
            </h1>
        </div>

        <div className="navbar-center">
            <ul className="nav-links">
            <li>
                <a href="/about">About Me</a>
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
            <a href="mailto:evalu802@gmail.com" className="mailto">
                <img href="public\logo192.png"></img>
            </a>
                <a href="https://www.linkedin.com/in/waffles-codes/" className="linkedin">
                <img href="public\logo192.png"></img>
            </a>
        </div>
    </nav>
    );
};

export default Navbar;