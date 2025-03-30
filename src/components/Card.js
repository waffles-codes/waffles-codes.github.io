import React, { useState } from 'react';
import './Card.css';

const Card = ({ title, image, altText, link, sections, modalContent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    console.log("toggling modal");
    setIsModalOpen(!isModalOpen);
    console.log("modal state " + isModalOpen);
  };

  // disable hover if the card is not clickable
  const disableHover = !link && !modalContent;

  return (
    <>
      {link ? (
        <a
          className={`card ${disableHover ? 'no-hover' : ''}`}
          rel="noreferrer"
          target="_blank"
          href={link}
        >
          <div className="card-header">
            <h2>{title}</h2>
            {image && <img src={image} className="card-image" alt={altText || "Card image"} />}
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
      ) : (
        <div
          className={`card ${disableHover ? 'no-hover' : ''}`}
          onClick={modalContent ? toggleModal : undefined}
        >
          <div className="card-header">
            <h2>{title}</h2>
            {image && <img src={image} className="card-image" alt={altText || "Card image"} />}
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
        </div>
      )}

      {isModalOpen && modalContent && (
        <div className="card-modal-overlay" onClick={toggleModal}>
          <div className="card-modal-content" onClick={(e) => e.stopPropagation()}>
            {modalContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Card;