import * as React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './App.css';

function Splash() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to ARISE</h1>
        <p>Engaging, easy-to-understand health data interpretation at your fingertips.</p>
        <div className="button-container">
          <Button variant="contained">Login</Button>
          <Button variant="contained" component={Link} to="/dashboard">Guest</Button> 
        </div>
        <div style={{alignContent: 'center'}}>
          <Button variant="contained">Register</Button>
        </div>
      </header>
      <footer className="App-footer">
        <p>ARISE © 2024</p>
      </footer>
    </div>
  );
}

export default Splash;
