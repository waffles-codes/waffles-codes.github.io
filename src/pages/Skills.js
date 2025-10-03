import React from 'react';
import Card from '../components/Card';

const Projects = () => {
  return (
    <>
      <div id="skills">
        <p className='section-title'>
          Skills
        </p>
      </div>
      <div className='projects-container'>
        <div className='projects-body'>
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
                    ],
                  },
                ]}
            />
            <Card
                title="Languages 🔊"
                sections={[
                  {
                    type: 'list',
                    content: [
                      'English - Fluent',
                      'Mandarin - Fluent',
                    ],
                  },
                ]}
            />
          </div>
      </div>
    </>
  );
}

export default Projects;