import face from '../assets/Evan_Lu_Professional_Profile_Confident_Cropped.webp';
import resume_image from '../assets/Evan_Lu_Resume_Oct20_2025.webp';
import resume from '../assets/Evan_Lu_Resume_Oct20_2025.pdf';
import React, { useState } from 'react';
import './Home.css';
import PDFModal from '../components/PDFModal.js';
import { Link as ScrollLink } from 'react-scroll'; // for Project page link

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div id="home" className='bodydiv'>
      <div className='infodiv'>
        <img src={face} className="pfp" alt='profile'/>
        <p id='info'>
          This website was bulit without the use of any GUI-based website building tools, 
          other than VS Code, the React.js library, packages like gh-pages, and many sleepless nights.
        </p>
      </div>

      <div className='container'>

        <div className='textdiv'>
          <div className='textcontainer'>
            <p className='title'>
                About Me
            </p>
            <p className="walloftext">
              I'm a third year Computer Science & Engineering student at UC Merced with
              a minor in Electrical Engineering, though I'm planning on graduating by May 2026
              (in only 3 years).
              If you'd like to see what I'm capable of, 
              {/* <a id="project-link" href="/#/projects">Projects</a> */}
              <strong> check out my <a href="/">
                  <ScrollLink id="project-link" to="projects" smooth={true} duration={300} offset={-100}>
                    Projects
                  </ScrollLink>
                </a> section! 
              </strong>
              <br/><br/>
              Currently, I'm working on moving my computer science and electrical engineering studies in the 
              direction of robotics and embedded systems because I enjoy seeing my 
              code come to life as it interacts with the physical world.
              <br/><br/>
              I'm the most proficient when it comes to C++, because that's what almost 
              all of my classes are taught in, but I also have lots of experience in multiple other languages.
              I've programmed multiple robots in Java, Kotlin, and Python, I've worked on multiple websites
              (including this one) with React.js, and implemented database systems with SQLite and C++.              
              <br/><br/>
              I'm always eager to take on new challenges and learn from every experience. 
              Feel free to reach out if you'd like to discuss potential job 
              opportunities or just nerd out about making robots!
              <br/>
            </p>
          </div>

          <div className='spacer'/>

          <div className='resumecontainer'>
            <div>
              <img 
                src={resume_image} 
                alt="resume preview"
                className='resume' 
                title="Click me to open PDF preview" 
                onClick={() => setIsModalOpen(true)}
              />
              <PDFModal 
                pdf={resume}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;