import React, { useEffect, useState, useRef } from 'react';
import { Link as ScrollLink } from 'react-scroll'; // Import react-scroll for smooth scrolling
import './Navbar.css';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef(null);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <div className="navbar">
                <div className="navbar-left">
                    <p>Evan&nbsp;Lu</p>
                </div>

                <div className="navbar-center">
                    <ul className="nav-links">
                        <li>
                            <a href="/">
                                <ScrollLink to="home" smooth={true} duration={300} offset={-100}>
                                    Home
                                </ScrollLink>
                            </a>
                        </li>
                        <li>
                            <a href="/">
                                <ScrollLink to="projects" smooth={true} duration={300} offset={-100}>
                                    Projects
                                </ScrollLink>
                            </a>

                        </li>
                        <li>
                            <a href="/">
                                <ScrollLink to="skills" smooth={true} duration={300} offset={-100}>
                                    Skills
                                </ScrollLink>
                            </a>
                        </li>
                        {/* <li>
                            <a href="/#">Home Page</a>
                        </li>
                        <li>
                            <a href="/#/projects">Projects Page</a>
                        </li>
                        <li>
                            <a href="/#/skills">Skills Page</a>
                        </li> */}
                    </ul>
                </div>

                <div className="navbar-right">
                    <a href="mailto:evalu802@gmail.com" className="image-links" target="blank">
                        <img src="email.svg" width="20" alt="mailto" id="email" />
                    </a>
                    <a href="https://www.linkedin.com/in/evan-lu-tw/" className="image-links" target="blank">
                        <img src="linkedin.svg" width="20" alt="linkedin" id="linkedin" />
                    </a>
                    <a href="https://github.com/waffles-codes" className="image-links" target="blank">
                        <img src="github.svg" width="20" alt="github" id="github" />
                    </a>
                </div>
            </div>

            {/* MOBILE SECTION */}
            <button className="menu-icon" onClick={toggleMobileMenu}>
                <MenuIcon />
            </button>
            <div ref={mobileMenuRef} className={`mobile ${isMobileMenuOpen ? 'mobile-open' : 'mobile-hidden'}`}>
                <div className='top-two-container'>
                    <div className="mobile-top">
                        <p style={{ marginBottom: 0 }}>Evan&nbsp;Lu</p>
                        <button className="menu-icon-nav" onClick={toggleMobileMenu}>
                            <MenuIcon />
                        </button>
                    </div>

                    <div className="mobile-middle">
                        <ul className="mobile-links">
                            <li>
                                <ScrollLink to="home" smooth={true} duration={300} offset={-50}>
                                    Home
                                </ScrollLink>
                            </li>
                            <li>
                                <ScrollLink to="projects" smooth={true} duration={300} offset={-50}>
                                    Projects
                                </ScrollLink>
                            </li>
                            <li>
                                <ScrollLink to="skills" smooth={true} duration={300} offset={-50}>
                                    Skills
                                </ScrollLink>
                            </li>
                            {/* <li>
                                <a href="/#">Home Page</a>
                            </li>
                            <li>
                                <a href="/#/projects">Projects Page</a>
                            </li>
                            <li>
                                <a href="/#/skills">Skills Page</a>
                            </li> */}
                        </ul>
                    </div>
                </div>
                <div className="mobile-bottom">
                    <a href="mailto:evalu802@gmail.com" className="image-links" target='blank'>
                        <img src="email.svg" width="20" alt='mailto' id='email'/>
                        &nbsp;&nbsp;Email
                    </a>
                    <a href="https://www.linkedin.com/in/evan-lu-tw/" className="image-links" target='blank'>
                        <img src="linkedin.svg" width="20" alt='linkedin' id='linkedin'/>
                        &nbsp;&nbsp;LinkedIn
                    </a>
                    <a href="https://github.com/waffles-codes" className="image-links" target='blank'>
                        <img src="github.svg" width="20" alt='github' id='github'/>
                        &nbsp;&nbsp;GitHub
                    </a>
                </div>
            </div>
        </>
    );
};

export default Navbar;