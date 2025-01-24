import face from '../Evan_Lu_Professional_Profile_Cropped.png';
import resume_image from '../Evan Lu - 2025 Resume 1-6.jpg';
import resume from '../Evan Lu - 2025 Resume 1-6.pdf';
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
            This website was bulit without the use of any website building tools, other than VS Code, React.js, Github Pages, gh-pages, and many sleepless nights.
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
              <br/><br/>
              * Not AI Generated Description * (come up with something soon)
              {/* <br/><br/>
              <br/><br/> */}
              <br/><br/>
              I'm always eager to take on new challenges and learn from every experience. Feel free to reach out if you'd like to discuss potential opportunities or simply chat about the latest developments in the computing world!
              <br/>
            </p>
          </div>

          <div className='spacer'/>

          <div className='textcontainer'>
            {/* <p className='title'>
              Resume
            </p> */}

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