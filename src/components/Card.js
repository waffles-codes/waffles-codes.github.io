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
          {sections.map((section, index) => (
            <div key={index}>
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