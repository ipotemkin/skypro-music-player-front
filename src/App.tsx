// import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import { Filter } from './features/Filter/Filter';
import { FilterButton } from './features/FilterButton/FilterButton';
import { Search } from './features/Search/Search';
// import { LoginForm } from './features/LoginForm/LoginForm';
// import { SideMenu } from './features/SideMenu/SideMenu';
import { TrackType } from './features/Track/Track';
// import { TrackList } from './features/TrackList/TrackList';
import { Tracks } from './pages/Tracks/Tracks';
// import { Tracks } from './pages/Tracks/Tracks';

const sampleTrack: TrackType = {
  title: 'Guilt',
  author: 'Nero',
  album: 'Welcome Reality',
  time: '4:45'
}

const sampleTrack2: TrackType = {
  title: 'Guilt2',
  author: 'Nero2',
  album: 'Welcome Reality2',
  time: '4:45'
}

const sampleTrack3: TrackType = {
  title: 'Guilt3',
  author: 'Nero3',
  album: 'Welcome Reality3',
  time: '3:00'
}


const sampleTrackList: TrackType[] = [
  sampleTrack,
  sampleTrack2,
  sampleTrack3
]

function App() {
  return (
    <div className="App">

      <Tracks />

      {/* <header className="App-header">
      </header> */}
    </div>
  );
}

export default App;
