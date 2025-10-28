import React from 'react';
import Card from '../components/Card';
import './Projects.css';

const Skills = () => {
  return (
    <>
      <div id="skills">
        <p className='section-title'>
          Skills
        </p>
      </div>
      <div className='projects-container'>
        <div className='project-body'>
          <Card
                title="Languages 💻"
                sections={[
                  {
                    type: 'list',
                    content: [
                      'C++',
                      'Python',
                      'Java',
                      'Kotlin',
                      'React JS',
                      'CSS'
                    ],
                  },
                ]}
            />
            <Card
                title="Languages 🗣️"
                sections={[
                  {
                    type: 'list',
                    content: [
                      'English - Fluent',
                      'Mandarin Chinese - Fluent',
                    ],
                  },
                ]}
            />
          </div>
      </div>
    </>
  );
}

export default Skills;