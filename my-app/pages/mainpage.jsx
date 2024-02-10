import * as React from 'react';
import Button from '@mui/material/Button';
import Link from 'next/link'
import './App.css';

function Splash() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{fontSize: 60}}>Welcome to ARISE</h1>
        <div style={{fontSize: 14}}>
          <p>Engaging, easy-to-understand health data interpretation at your fingertips.</p>
        </div>
        <div className="button-container">
          <Button variant="contained">Login</Button>
          <Button variant="contained"><Link href="/dashboard">Dashboard</Link></Button> 
          <Button variant="contained"><Link href="/data">Data</Link></Button> 
          <Button variant="contained"><Link href="/scheduling">Scheduler</Link></Button> 
          {/* <Link href="/other" passHref>
            <Button variant="contained">Guest User</Button>
          </Link> */}
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