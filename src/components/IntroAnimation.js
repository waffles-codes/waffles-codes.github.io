import React, { useEffect, useRef, useState } from "react";
import "./IntroAnimation.css";
import WaffleParticles from './WaffleParticles';


const IntroAnimation = ({ onComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const cursorRef = useRef(null); // Reference to the cursor element span (to help handle blinking)
  const fullText = "Hello, I'm Evan"; // The text to be typed out
  const typingSpeed = 100; // Typing speed in ms

  const introTextRef = useRef(null); // Reference to the cursor element span for updating the text

  useEffect(() => {
    let index = 0;

    const typeText = () => {
      if (index < fullText.length) {
        if (introTextRef.current) {
          introTextRef.current.textContent += fullText[index]; // Append one character directly to DOM
        }
        index++;
        setTimeout(typeText, typingSpeed); // Continue typing
      } else {
        // Enable blinking cursor after typing is complete
        if (cursorRef.current) {
          cursorRef.current.classList.add("blink");
        }
        setTimeout(() => {
          setIsFadingOut(true); // Start fade-out after blinking starts
          setTimeout(onComplete, 2500); // Trigger onComplete after fade-out
        }, 8000); // Let animation keep going for a little bit before fade-out
      }
    };

    typeText(); // Start typing animation

    const handleClick = () => {
      onComplete();
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick); // Clean up event listener on unmount
    };
  }, [fullText, onComplete]);

  return (
    <div className={`intro-overlay ${isFadingOut ? "fade-out" : ""}`}>
      <h1 className="intro-text">   
        <span ref={introTextRef}></span>
        <span ref={cursorRef} className="cursor">|</span>
      </h1>
      <div className="bottom-text">
        <p>(click to skip animation)</p>
      </div>
      <WaffleParticles />
    </div>
  );
};

export default IntroAnimation;
