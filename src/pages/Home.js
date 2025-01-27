import face from '../assets/Evan_Lu_Professional_Profile_Cropped.png';
import resume_image from '../assets/1-26 Evan Lu - 2025 Resume.jpg';
import resume from '../assets/1-26 Evan Lu - 2025 Resume.pdf';
import React, { useState } from 'react';
import './Home.css';
import PDFModal from '../components/PDFModal.js';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='bodydiv'>
      <div className='infodiv'>
        <img src={face} className="pfp" alt='profile'/>
          <p id='info'>
            This website was bulit without the use of any website building tools, 
            other than VS Code, React.js, Github Pages, gh-pages, and many sleepless nights.
          </p>
        </div>

      <div className='container'>

        <div className='textdiv'>
          <div className='textcontainer'>
            {/* make this not AI next */}
            <p className='title'>
                About Me
            </p>
            <p className="walloftext">
              My name is Evan Lu, and I'm a second-year student at UC Merced studying Computer Science & Engineering.
              If you'd like to see what I'm capable of, 
              <b> check out my <a id="project-link" href="/#/projects">Projects</a> page! </b>
              <br/><br/>
              Currently, I'm working on advancing my computer science career in the 
              direction of embedded systems because I enjoy seeing my code come to 
              life as it interacts with the physical world.
              <br/><br/>
              I'm the most proficient when it comes to C++, because that's what almost 
              all of my classes are taught in, but I've also programmed robots in Java, 
              Kotlin, and Python, worked on multiple websites (including this one) 
              with React.js, and implemented database systems with SQL.              
              <br/><br/>
              I'm always eager to take on new challenges and learn from every experience. 
              Feel free to reach out if you'd like to discuss potential internship 
              opportunities or nerd out about computer stuff!
              <br/>
            </p>
          </div>

          <div className='spacer'/>

          <div className='textcontainer'>
            <div>
              <img 
                src={resume_image} 
                alt="resume preview"
                className='resume' 
                title="Click me to open PDF preview" 
                onClick={() => setIsModalOpen(true)}
              />
              <PDFModal 
                pdfUrl={resume}
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