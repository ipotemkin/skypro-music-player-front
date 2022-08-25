import { Routes } from './routes';
import './App.css';
import { useCookies } from 'react-cookie';
import { useAppDispatch } from './app/hooks';
import { setToken } from './app/Auth/tokenSlice';
// import { Player } from './features/Player/Player';

function App() {
  const [ cookies ] = useCookies(['access', 'refresh'])
  const dispatch = useAppDispatch()

  if (cookies) {
    console.log('cookies set')
    dispatch(setToken({ access: cookies.access, refresh: cookies.refresh }))
  }

  return (
    <div className="App">

      <Routes />
      {/* <Player /> */}

      {/* <header className="App-header">
      </header> */}
    </div>
  );
}

export default App;
