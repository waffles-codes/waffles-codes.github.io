import React from 'react';
import './Card.css';

const Card = ({ title, image, altText, link, sections }) => {
    return (
      <a className="card" target="blank" href={link}>
        <div className="card-header">
          <h2>{title}</h2>
          <img src={image} className="card-image" alt={altText} />
        </div>
  
        <div className="card-body">
          {/* map sections onto card */}
          {sections.map((section, index) => (
            <div key={index}>
              {/* For each section, if that section exists, show that section */}
              {section.header && <h3>{section.header}</h3>}
              {section.type === 'paragraph' && (
                <p className="project-description">{section.content}</p>
              )}
              {section.type === 'list' && (
                <ul className="feature-list">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </a>
    );
};

export default Card;  