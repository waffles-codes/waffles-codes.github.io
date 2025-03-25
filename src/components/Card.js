import React, { useState } from 'react';
import './Card.css';

const Card = ({ title, image, altText, link, sections, modalContent }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    console.log("toggling modal");
    setIsModalOpen(!isModalOpen);
    console.log("modal state " + isModalOpen)
  };

  return (
    // this <> </> syntax is NOT valid HTML, but it IS valid React
    // it allows for grouping of the entire card component without using <React.Fragment>
    // or using <div>, which breaks the styling of the card
    <>
    {link ? (
      // if a link is provided, set the card to open the link in a new tab
      <a className="card" rel='noreferrer' target='_blank' href={link}>
        <div className="card-header">
          <h2>{title}</h2>
          <img src={image} className="card-image" alt={altText} />
        </div>
  
        <div className="card-body">
          {/* maps all sections onto card */}
          {sections.map((section, index) => (
            <div key={index}>
              {/* for each section, depending on what that section is, show that type of section */}
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
      // else, if there is a modalContent, open modal on click
      <div className="card" onClick={toggleModal}>
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
      </div>
    )}

    {/* Modal Component */}
    {isModalOpen && modalContent && (
      <div className="card-modal-overlay" onClick={toggleModal}>
        {/* e.stopPropagation() prevents the click event from activating the card componenet itself */}
        <div className="card-modal-content" onClick={(e) => e.stopPropagation()}>
          {modalContent}
        </div>
      </div>
    )}
    </>
  );
};

export default Card;  