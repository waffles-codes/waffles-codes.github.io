import face from '../Evan_Lu_Professional_Profile_Cropped.png';
import resume_image from '../Evan Lu - 2024 Resume B&W 11-13-24-1.png';
import resume from '../Evan Lu - 2024 Resume B&W 11-13-24.pdf';
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
            Website was bulit by me from scratch using React.js and create&#8209;react&#8209;app.
          </p>
        </div>

      <div className='container'>

        <div className='textdiv'>
          <div className='textcontainer'>
            <p className='title'>
                About Me
            </p>
            <p className="walloftext">
              My name is Evan Lu, and I'm a second-year student at UC Merced studying Computer Science & Engineering. I was born and raised in Alameda, California, where my passion for technology and problem-solving started.
              <br/><br/>
              Ever since I was little, I've been fascinated by the intersection of hardware and software. This curiosity led me to explore various aspects of computer science and robotics throughout my academic journey. One of my most exciting projects was creating a rock-paper-scissors robot using a Raspberry Pi, which allowed me to delve into machine learning, computer vision, and low-level motor control.
              <br/><br/>
              As the Lead Programmer for The Aztechs robotics team, I also honed my skills in Java and Kotlin, developing innovative solutions for robot aiming, balancing, and positioning. This experience not only sharpened my technical abilities but also taught me the value of collaboration and mentorship.
              <br/><br/>
              At UC Merced, I'm expanding my knowledge in algorithm design, probability and statistics, and various mathematical disciplines. When I'm not coding or studying, you can find me exploring graphic design, creating videos, playing games, or learning to dance.
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