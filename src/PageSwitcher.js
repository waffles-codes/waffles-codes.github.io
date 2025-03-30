import React from 'react';
// import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Projects from './pages/Projects.js';
import Skills from './pages/Skills.js';


const PageSwitcher = () => {
  return (
    // <Routes> {/* The 'Routes' decides which component to show based on the current URL.*/}
    //     <Route path="/" element={<Home/>}/>
    //     <Route path='/projects' element={<Projects/>}/>
    //     <Route path='/skills' element={<Skills/>}/>
    // </Routes>
    <>
      <Home/>
      <Projects/>
      <Skills/>
      <footer>
        <p>© 2024 Evan Lu. All rights reserved.</p>
      </footer>
    </>
  );
}

export default PageSwitcher;
