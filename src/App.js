import React, { useState } from "react";
import Navbar from "./components/Navbar.js";
import PageSwitcher from "./PageSwitcher";

function App() {

  return (
    <div>
      <div className="app-content">
        <Navbar />
        <PageSwitcher />
      </div>
    </div>
  );
}

export default App;
