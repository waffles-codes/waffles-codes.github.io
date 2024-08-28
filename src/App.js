import logo from './ProfessionalPfp.jpg';
import Navbar from './Navbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <img src={logo} className="App-logo" alt="logo" />
      {/* <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
