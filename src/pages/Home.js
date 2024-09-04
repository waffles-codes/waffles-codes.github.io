import face from '../ProfessionalPfp.jpg';
import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className='bodydiv'>
        <img src={face} className="pfp"/>
        <div className='container'>
          <div className='infodiv'>
            <p className='text' id='info'>
              Website was bulit by me from scratch using React.js and create-react-app.
            </p>
          </div>

          <div className='textdiv'>
            <header className='text'>
                <h1>Home Page</h1>
            </header>
            <p>
            My name is Evan Lu, and I'm a second-year student at UC Merced pursuing a Bachelor of Science in Computer Science and Engineering. I was born and raised in Alameda, California, where my passion for technology and problem-solving began to flourish.<br/><br/>
From an early age, I've been fascinated by the intersection of hardware and software. This curiosity led me to explore various aspects of computer science and robotics throughout my academic journey. During high school, I channeled my enthusiasm into creating a rock-paper-scissors robot using a Raspberry Pi, which allowed me to delve into machine learning, computer vision, and low-level motor control.<br/><br/>
My experience as the Lead Programmer for The Aztechs robotics team further honed my skills in Java and Kotlin, while also teaching me the value of collaboration and mentorship. This role allowed me to develop innovative solutions for robot aiming, balancing, and positioning, pushing the boundaries of what our team could achieve.<br/><br/>
Currently, I'm expanding my knowledge in algorithm design, probability and statistics, and various mathematical disciplines at UC Merced. When I'm not coding or studying, you can find me exploring graphic design, creating videos, or learning new programming languages.<br/><br/>
I'm always eager to take on new challenges and learn from every experience. Whether it's developing a custom timelapse app or building a responsive website, I approach each project with creativity, attention to detail, and a drive for continuous improvement.<br/><br/>
Feel free to reach out if you'd like to discuss potential opportunities, collaborate on interesting projects, or simply chat about the latest developments in computer science and engineering!
          </p>
          </div>
        </div>
    </div>
  );
}

export default Home;