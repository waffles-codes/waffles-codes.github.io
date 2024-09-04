import face from '../ProfessionalPfp.jpg';
import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className='bodydiv'>
      <img src={face} className="pfp" alt='profile'/>
      <div className='container'>

        <div className='infodiv'>
          <p id='info'>
            Website was bulit by me from scratch using React.js and create-react-app.
          </p>
        </div>

        <div className='textdiv'>
          <div className='textcontainer'>
            <p id='aboutme'>
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
              <br/><br/>
            </p>
          </div>

          <div className='spacer'/>

          <div className='textcontainer'>
            <p className='center' id='areasofinterest'>
              Areas of Interest
            </p>
            <p id='listaoi'>
              • Software Engineering <br/>
              • Software Engineering <br/>
              • Software Engineering <br/>
              • Software Engineering <br/>
              • Software Engineering <br/>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;