import React from 'react';
import Card from '../components/Card';
import robotImage from '../assets/robot hand raspberry pi side.webp';
import henryImage from '../assets/H-enry frc 4186 robot 2023.webp';
import spaceAppsImage from '../assets/WINNING_SPACEAPPS_HAHAHAHAHAHAHAH.webp'
import sachacksImage from '../assets/Market Mayhem Winner.webp'
import './Projects.css';

const Projects = () => {
  return (
    <>
      <div id="projects">
        <p className='section-title'>
          Projects
        </p>
      </div>
      <div className="projects-container">
        <div className="project-body">
          {/* Wooden Robot Hand Card */}
          <Card
            title="Wooden Robot Hand 👋"
            image={robotImage}
            altText="Wooden robot hand with all of its internals exposed"
            link = ""
            modalContent={
              <div>
                  {/* styling requires {{}} */}
                <h2 /*style={{margin:0}}*/>Wooden Robot Hand 👋</h2>
                {/* <p>this should show up in a modal</p> */}
                <a
                  href="https://docs.google.com/presentation/d/1H-vKABQXgFmLuaNdNsZt5CzbKaZLlPPrXXgHJjh5Lb0/edit?usp=sharing"
                  target='blank'
                >
                  Presentation
                </a>
                <br/>
                <a
                  href="https://github.com/waffles-codes/robot-hand-backup"
                  target='blank'
                >
                  Github For Robot Hand Code Backups
                </a>
              </div>
            }
            sections={[
              {
                header: 'Project Overview',
                type: 'paragraph',
                content:
                  [
                    'This project was initially created for the sole purpose of beating my friend in rock-paper-scissors. ',
                    'During the process, I developed proficiency in embedded systems, as I focused on learning parallel ',
                    'processing, machine learning models, and writing code at the lowest levels.',
                  ]
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
            title="H-enry 🤖"
            image={henryImage}
            altText="H-enry robot from Team 4186 The Aztechs"
            link="https://github.com/team4186/season-2023"
            sections={[
              {
                header: 'Project Overview',
                type: 'paragraph',
                content:
                //making this an array allows for the <i>"AztechsTeam"</i> part to be rendered properly
                [
                  'H-enry was made during my time with FRC Team 4186, The Aztechs, ',
                  'where I first found my passion in robotics programming. I took it upon myself to program ',
                  'the robot and learn the intricacies of the FRC libraries, devise an ergonomic and ',
                  'intuitive control scheme, and create responsive autonomous routines.', <br/>,
                  'Note: Almost all of my commits to our repository were under the ',<i>"AztechsTeam"</i>,' account. '
                ]
              },
              {
                header: 'Acheivements & Notes',
                type: 'list',
                content: [
                  ['H-enry won CalGames 2023 🏆',<br/>,'(First win for the team since 2017!)'],
                  'Programmed H-enry by myself, while also teaching potential future programmers',
                  'Auto-targeting and positioning utilizing a Limelight for computer vision',
                  'Programmed in Kotlin',
                  'Created for FRC Season 2023: Charged Up!',
                ],
              },
              {
                header: 'Previous Years',
                type: 'paragraph',
                content:
                  [
                    'The other robot I had a large part in programming was WWYRM, ',
                    'which ',<i>unofficially</i>,' stands for ', <i>"We Want YouR Money"</i>, 
                    ' (due to our robot needing a name in order to get sponsorships) and ', 
                    <i>officially</i>, ' being some type of dragon. ',
                    'WWYRM was programmed in Java and didn\'t have significant autonomous capabilities. ',
                    'Auto-targeting functionality was implemented during one of the competitions, but never used ',
                    'due to the volatility of using minimally field-tested code. ',
                    'WWYRM was built to compete in FRC Season 2022: Rapid React and obtained its highest rank (Rank 15) during CalGames.'
                  ]
              },
            ]}

          />

          {/* NASA SpaceApps Exosky! Card */}
          <Card
            title="Exosky! 🌃"
            image={spaceAppsImage}
            altText="My team posing in front of our presentation after our local win"
            // link="https://github.com/Shyam-723/NasaExoSkyChallenge"
            // link="https://www.spaceappschallenge.org/nasa-space-apps-2024/find-a-team/shyams-team/?tab=project"
            modalContent={
              <div>
                  {/* styling requires {{}} */}
                <h2 /*style={{margin:0}}*/>NASA SpaceApps Exosky! 🌃</h2>
                {/* <p>this should show up in a modal</p> */}
                <a
                  href="https://github.com/Shyam-723/NasaExoSkyChallenge"
                  target='blank'
                >
                  Github Repo
                </a>
                <br/>
                <a
                  href="https://www.spaceappschallenge.org/nasa-space-apps-2024/find-a-team/shyams-team/?tab=project"
                  target='blank'
                >
                  SpaceApps Challenge Website
                </a>
              </div>
            }
            sections={[
              {
                header: 'Project Overview',
                type: 'paragraph',
                content:
                  'This project was a team effort with my friends at UC Merced as part of the NASA SpaceApps 2024 Challenge. We picked this project because we thought it would be fun to be able to see the stars from other planets as if you were there. This was also my first hackathon experience ever!',
              },
              {
                header: 'Acheivements',
                type: 'list',
                content: [
                  'Local Challenge Winner at UC Merced 🏆',
                  '2024 Global Nominee for the NASA SpaceApps Challenge 🏆',
                  '2024 People\'s Choice for the NASA SpaceApps Challenge 🏆',
                  'Integration with Aladin Lite Viewer',
                  'Python Flask backend with React.js frontend',
                  'Simulating the sky from another planet'
                ],
              },
              {
                header: 'What I learned from the event',
                type: 'paragraph',
                content:
                  'Mostly, I learned that hackathons are actually quite fun, and that I wanted to do more in the future. I also gained valuable experience in working on a tight schedule (just 24 hours minus sleep for the whole thing) as well as making decisions and communicating them with my teammates on short notice in order to move our project forward.'
              },
            ]}
          />
        </div>

        {/* ROW TWO -- EACH PROJECT BODY SHOULD ONLY CONTAIN 3 ELEMENTS MAX */}
        {/* another implementation would be to put all of the cards into an array and then map 3 to each row */}
        <div className="project-body">
          {/* SacHacks VI Card */}
          <Card
            title="Market Mayhem 📈"
            image={sachacksImage}
            altText="The stock market simulator game shown with all panels"
            modalContent={
              <div>
                  {/* styling requires {{}} */}
                <h2 /*style={{margin:0}}*/>SacHacks VI - Market Mayhem 📈</h2>
                {/* <p>this should show up in a modal</p> */}
                <a
                  href="https://github.com/DDH2004/SacHacksVI_TheCowsOverYonder"
                  target='blank'
                >
                  Github Repo
                </a>
                <br/>
                <a
                  href="https://devpost.com/software/stock-market-simulator-0o7lxg"
                  target='blank'
                >
                  Devpost Project Website
                </a>
              </div>
            }
            sections={[
              {
                header: 'Project Overview',
                type: 'paragraph',
                content:
                  'This project was a team effort with my friends from UC Merced as part of the SacHacks VI hackathon.',
              },
              {
                header: 'Acheivements',
                type: 'list',
                content: [
                  'Second Runner Up in Best Technical Implementation 🏆',
                ],
              },
              // {
              //   header: 'What I learned/Cool Stuff/Experiences',
              //   type: 'paragraph',
              //   content:
              //     'Work in progress...'
              // },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default Projects;
