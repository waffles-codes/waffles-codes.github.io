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
      </div>
    </>
  );
}

export default Projects;