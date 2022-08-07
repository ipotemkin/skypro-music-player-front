// import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import { LoginForm } from './features/LoginForm/LoginForm';
import { SideMenu } from './features/SideMenu/SideMenu';
import { Track, TrackType } from './features/Track/Track';
import { Tracks } from './pages/Tracks/Tracks';

const sampleTrack: TrackType = {
  title: 'Guilt',
  author: 'Nero',
  album: 'Welcome Reality',
  time: '4:45'
}

function App() {
  return (
    <div className="App">
      {/* <SideMenu /> */}
      {/* <Tracks /> */}
      <Track track={sampleTrack} />

      <header className="App-header">
        
        {/* <LoginForm /> */}


        {/* <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span> */}
      </header>
    </div>
  );
}

export default App;
