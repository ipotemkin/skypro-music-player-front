import { Routes } from './routes';
import './App.css';
import { useLoadCredentialsFromCookies } from './features/Tracks/hooks';
import { TracksPage } from './pages/TracksPage/TracksPage';
import { Login } from './pages/Login/Login';

function App() {  
  return (
    <div className="App">
      <Routes />

      {/* {userLoggedIn && <TracksPage />} */}
      {/* {!userLoggedIn && <Login />} */}

      {/* <Player /> */}

      {/* <header className="App-header">
      </header> */}
    </div>
  );
}

export default App;
