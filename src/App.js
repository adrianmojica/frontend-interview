import React from 'react';
import './App.css';
import Routes from "./Routes";
import { BrowserRouter } from 'react-router-dom';

class App extends React.Component {
    render() {
        return (
          <>
            <nav className="navbar navbar-light bg-light">
              <span className="navbar-brand mb-0 h1"><i className="bi bi-globe"></i> World Info App</span>
            </nav>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>              
          </>
        );
    }
}

export default App;
