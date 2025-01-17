import React from 'react';
import robotImage from '../robot hand raspberry pi side.jpg';
import spaceAppsImage from '../WINNING_SPACEAPPS_HAHAHAHAHAHAHAH.jpg'
import './Projects.css'; // Import the CSS file

const Projects = () => {
  return (
      <div className="project-body">
        {/* Robot Hand Project Card */}
        <div className="card">
          <div className="card-header">
            <h2>Wooden Robot Hand</h2>
            <img src={robotImage} 
              className="card-image" 
              alt='wooden robot hand with all of its internals exposed'/>
            <a  className='project-details-link' target='blank'
                href="https://docs.google.com/presentation/d/1H-vKABQXgFmLuaNdNsZt5CzbKaZLlPPrXXgHJjh5Lb0/edit?usp=sharing"
            >
                Project Presentation
            </a>
          </div>

          <div className="card-body">
            <h3>Project Overview</h3>
            <p className="project-description">
              This project was created for the sole purpose of beating my friend in rock-paper-scissors. 
              During the process, I developed proficiency in embedded systems, 
              as I focused on learning parallel processing, machine learning models, and writing code at the lowest levels.
            </p>

            <h3>Software Features</h3>
            <ul className="feature-list">
              <li>Rock paper scissors mode</li>
              <li>Copy hand motion mode</li>
              <li>Computer vision using OpenCV & Google’s MediaPipe for gesture recognition</li>
              <li>Multi-core parallel processing to enhance both computational and temporal efficiency</li>
              <li>Low-level motor control with GPIO pins</li>
              <li>Reset back to starting state upon exit</li>
            </ul>

            <h3>What Makes it Cool</h3>
            <p className="project-description">
              The hand uses custom CAD-designed living hinges.
              Not only can it beat you in rock paper scissors (albeit by cheating a lot), 
              but it also has a "copy hand mode" to mimic the actions of your hand.
              Oh, and I forgot to mention, it also uses a vintage webcam from the WINDOWS XP ERA for its computer vision.
            </p>
          </div>
        </div>

        {/* NASA Spaceapps Project Card */}
        <div className="card">
          <div className="card-header">
            <h2>NASA SpaceApps Exosky!</h2>
            <img src={spaceAppsImage} 
              className="card-image" 
              alt='my nasa spaceapps team posing in front of our presentation for the local win'/>
            <a  className='project-details-link' target='blank'
                href="https://docs.google.com/presentation/d/1H-vKABQXgFmLuaNdNsZt5CzbKaZLlPPrXXgHJjh5Lb0/edit?usp=sharing"
            >
                
            </a>
          </div>

          <div className="card-body">
            <h3>Project Overview</h3>
            <p className="project-description">
              This project was a team effort with my friends at UC Merced.
            </p>

            <h3>Software Features</h3>
            <ul className="feature-list">
              <li>Integration with Aladin Lite Viewer</li>
              <li>Python Flask backend with React.js frontend </li>
            </ul>

            <h3>What Makes it Cool</h3>
            <p className="project-description">
                WIP
            </p>
          </div>
        </div>



      </div>
  );
};

export default Projects;
