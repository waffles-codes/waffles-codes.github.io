import React from 'react';
import './Navbar.css';

const Navbar = () => {
return (
    <nav className="navbar">
        <div className="navbar-left">
            <p>
                Evan&nbsp;Lu
            </p>
        </div>

        <div className="navbar-center">
            <ul className="nav-links">
                <li>
                    <a href="/#">Home</a>
                </li>
                <li>
                    <a href="/#/projects">Projects</a>
                </li>
                <li>
                    <a href="/#/contact">Contact</a>
                </li>
            </ul>
        </div>
        
        <div className="navbar-right">
            <a href="mailto:evalu802@gmail.com" className="image-links" target='blank'>
                <img src="email.svg" width="25" alt='mailto' id='email'/>
            </a>
            <a href="https://www.linkedin.com/in/waffles-codes/" className="image-links" target='blank'>
                <img src="linkedin.svg" width="20" alt='linkedin' id='linkedin'/>
            </a>
            <a href="https://github.com/waffles-codes" className="image-links" target='blank'>
                <img src="github.svg" width="20" alt='github' id='github'/>
            </a>
        </div>
    </nav>
    );
};

export default Navbar;