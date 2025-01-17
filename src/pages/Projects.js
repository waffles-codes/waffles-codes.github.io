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
          </div>

          <div className="card-body">
            <h3>Project Overview</h3>
            <p className="project-description">
              This project was designed to create a robot hand capable of beating a friend in rock-paper-scissors. 
              I focused on learning new skills, affordability, and applying Python in real-world applications.
            </p>

            <h3>Software Features</h3>
            <ul className="feature-list">
              <li>Rock paper scissors mode</li>
              <li>Copy hand motion mode</li>
              <li>Computer vision using OpenCV & Google’s MediaPipe</li>
              <li>Multiprocessing for simultaneous finger movement</li>
              <li>Low-level motor control with GPIO pins</li>
              <li>Reset back to starting state upon exit</li>
            </ul>

            <h3>What Makes it Cool</h3>
            <p className="project-description">
              The hand uses custom CAD-designed living hinges.
              It can not only beat you in rock paper scissors (albeit by cheating a lot), 
              it also has a "copy hand mode" to mimic the actions of your hand.
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
