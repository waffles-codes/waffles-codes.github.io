import React, { useState } from "react";
import Navbar from "./components/Navbar.js";
import PageSwitcher from "./PageSwitcher";
import IntroAnimation from "./components/IntroAnimation";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <div>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      <div className="app-content">
        <Navbar />
        <PageSwitcher />
      </div>
    </div>
  );
}

export default App;
