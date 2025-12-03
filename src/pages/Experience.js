import React from 'react';
import Card from '../components/Card';
import classImage from '../assets/Robotics Class.webp';

import './Projects.css';

const Experience = () => {
  return (
    <>
      <div id="experience">
        <p className='section-title'>
          Experience
        </p>
      </div>
      <div className='projects-container'>
        <div className='project-body'>
          <Card
            title="Robotics Instructor 🎓"
            subheader="Little Fire Robot Academy"
            image={classImage}
            altText=""
            link=""
            modalContent={
              <div>
                  {/* styling requires {{}} */}
                <h2 /*style={{margin:0}}*/>Robotics Instructor 🎓</h2>
                {/* <p>this should show up in a modal</p> */}
                <br/>
              </div>
            }
            sections={[
              {
                header: 'Key Responsibilities',
                type: 'paragraph',
                content:
                  [
                    'I teach students programming and the basic concepts of robot code/operation ',
                    'as well as design custom robots and lesson plans to meet the needs of each cohort of students, ',
                    'ranging from elementary schoolers to high schoolers. ', <br/>,
                    "The most challenging part of the job is explaining concepts to people with differing knowledge and skill levels ",
                    'by figuring out how each concept can be best grasped by each person. ', <br/>,
                    'My favorite part of the job is hosting my robot arm design workshop with high schoolers, ',
                    'where I cover a variety of topics, including (but not limited to) Arduino, Raspberry Pi, serial communication, ',
                    'computer vision, pwm motor control, 3D modeling, 3D printing, etc. ',
                  ]
              },
              {
                header: 'Skills & Technologies',
                type: 'list',
                content: [
                  'Adapting To Various Environments',
                  'Lesson Planning',
                  'Classroom Management',
                  'Microsoft micro:bit',
                  'Arduino',
                  'Raspberry Pi',
                  'C++',
                  'Python',
                  '3D Modeling'
                ],
              },
            ]}
          />
          <Card
            title="I2G Intern 💻"
            subheader="Conectado Inc."
            image={""}
            altText=""
            link=""
            modalContent={
              <div>
                  {/* styling requires {{}} */}
                <h2 /*style={{margin:0}}*/>I2G Intern 💻</h2>
                {/* <p>this should show up in a modal</p> */}
                <br/>
              </div>
            }
            sections={[
              {
                header: 'Key Responsibilities',
                type: 'paragraph',
                content:
                  [
                    "WIP"
                  ]
              },
              {
                header: 'Technologies',
                type: 'list',
                content: [
                  "WIP"
                ],
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}

export default Experience;