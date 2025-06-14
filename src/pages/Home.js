import face from '../assets/Evan_Lu_Professional_Profile_Confident_Cropped.webp';
import resume_image from '../assets/Evan_Lu_Resume_May27_2025.webp';
import resume from '../assets/Evan_Lu_Resume_May27_2025.pdf';
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
          other than VS Code, React.js, gh-pages, and many sleepless nights.
        </p>
      </div>

      <div className='container'>

        <div className='textdiv'>
          <div className='textcontainer'>
            <p className='title'>
                About Me
            </p>
            <p className="walloftext">
              I'm a second year Computer Science & Engineering student at UC Merced 
              trying to speedrun college by winter of my junior year (only two and a half years!). 
              If you'd like to see what I'm capable of, 
              {/* <a id="project-link" href="/#/projects">Projects</a> */}
              <strong> check out my <a href="/">
                  <ScrollLink id="project-link" to="projects" smooth={true} duration={300} offset={-100}>
                    Projects
                  </ScrollLink>
                </a> page! 
              </strong>
              <br/><br/>
              Currently, I'm working on advancing my computer science career in the 
              direction of robotics and embedded systems because I enjoy seeing my 
              code come to life as it interacts with the physical world.
              <br/><br/>
              I'm the most proficient when it comes to C++, because that's what almost 
              all of my classes are taught in, but I've also programmed robots in Java, 
              Kotlin, and Python, worked on multiple websites (including this one) 
              with React.js, and implemented database systems with SQL & their C++ API.              
              <br/><br/>
              I'm always eager to take on new challenges and learn from every experience. 
              Feel free to reach out if you'd like to discuss potential internship 
              opportunities or nerd out about computer stuff!
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