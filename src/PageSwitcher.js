import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Projects from './pages/Projects.js';
import Contact from './pages/Contact.js';


const PageSwitcher = () => {
  return (
    <Routes> {/* The 'Routes' decides which component to show based on the current URL.*/}
        <Route path="/" element={<Home/>}/>
        <Route path='/projects' element={<Projects/>}/>
        <Route path='/contact' element={<Contact/>}/>
    </Routes>
  );
}

export default PageSwitcher;
