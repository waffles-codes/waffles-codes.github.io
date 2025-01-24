import React from 'react';
import Card from '../components/Card';
import robotImage from '../robot hand raspberry pi side.jpg';
import henryImage from '../H-enry frc 4186 robot 2023.jpg';
import spaceAppsImage from '../WINNING_SPACEAPPS_HAHAHAHAHAHAHAH.jpg'
import './Projects.css';

const Projects = () => {
  return (
    <div className="project-body">
      {/* Wooden Robot Hand Card */}
      <Card
        title="Wooden Robot Hand"
        image={robotImage}
        altText="Wooden robot hand with all of its internals exposed"
        link="https://docs.google.com/presentation/d/1H-vKABQXgFmLuaNdNsZt5CzbKaZLlPPrXXgHJjh5Lb0/edit?usp=sharing"
        sections={[
          {
            header: 'Project Overview',
            type: 'paragraph',
            content:
              'This project was created for the sole purpose of beating my friend in rock-paper-scissors. During the process, I developed proficiency in embedded systems, as I focused on learning parallel processing, machine learning models, and writing code at the lowest levels.',
          },
          {
            header: 'Software Features',
            type: 'list',
            content: [
              'Rock paper scissors mode',
              'Copy hand motion mode',
              'Computer vision using OpenCV & Google’s MediaPipe for gesture recognition',
              'Multi-core parallel processing to enhance both computational and temporal efficiency',
              'Low-level motor control with GPIO pins',
              'Reset back to starting state upon exit',
            ],
          },
          {
            header: 'What Makes it Cool',
            type: 'paragraph',
            content:
              'The hand uses custom CAD-designed living hinges. Not only can it beat you in rock paper scissors (albeit by cheating a lot), but it also has a "copy hand mode" to mimic the actions of your hand. Oh, and I forgot to mention, it also uses a vintage webcam from the WINDOWS XP ERA for its computer vision.',
          },
        ]}
      />

      <Card
        title="H-enry"
        image={henryImage}
        altText="Wooden robot hand with all of its internals exposed"
        link="https://docs.google.com/presentation/d/1H-vKABQXgFmLuaNdNsZt5CzbKaZLlPPrXXgHJjh5Lb0/edit?usp=sharing"
        sections={[
          {
            header: 'Project Overview',
            type: 'paragraph',
            content:
              'This project was created for the sole purpose of beating my friend in rock-paper-scissors. During the process, I developed proficiency in embedded systems, as I focused on learning parallel processing, machine learning models, and writing code at the lowest levels.',
          },
          {
            header: 'Software Features',
            type: 'list',
            content: [
              'Rock paper scissors mode',
              'Copy hand motion mode',
              'Computer vision using OpenCV & Google’s MediaPipe for gesture recognition',
              'Multi-core parallel processing to enhance both computational and temporal efficiency',
              'Low-level motor control with GPIO pins',
              'Reset back to starting state upon exit',
            ],
          },
          {
            header: 'What Makes it Cool',
            type: 'paragraph',
            content:
              'The hand uses custom CAD-designed living hinges. Not only can it beat you in rock paper scissors (albeit by cheating a lot), but it also has a "copy hand mode" to mimic the actions of your hand. Oh, and I forgot to mention, it also uses a vintage webcam from the WINDOWS XP ERA for its computer vision.',
          },
        ]}
      />

      {/* NASA SpaceApps Exosky! Card */}
      <Card
        title="NASA SpaceApps Exosky!"
        image={spaceAppsImage}
        altText="My team posing in front of our presentation after our local win"
        link="https://github.com/Shyam-723/NasaExoSkyChallenge"
        sections={[
          {
            header: 'Project Overview',
            type: 'paragraph',
            content:
              'This project was a team effort with my friends at UC Merced.',
          },
          {
            header: 'Software Features',
            type: 'list',
            content: [
              'Integration with Aladin Lite Viewer',
              'Python Flask backend with React.js frontend',
            ],
          },
          {
            header: 'What I learned from the event',
            type: 'paragraph',
            content:
              'WIP'
          },
        ]}
      />
    </div>
  );
};

export default Projects;
