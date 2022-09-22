import { Routes as ReactRoutes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { TracksPage } from './pages/TracksPage/TracksPage'
import { PlaylistPage } from './pages/PlaylistPage/PlaylistPage'
import { Collection} from './pages/Collection/Collection'
import { useLoadCredentialsFromCookies } from './features/Tracks/hooks'

export const Routes = () => {
  const isLoggedIn = useLoadCredentialsFromCookies()

  return (
    <ReactRoutes>
      <Route path="/" element={ <Navigate replace to={isLoggedIn ? "/tracks" : "/login"}/> } />
      <Route path="/login" element={ <LoginPage /> } />
      <Route path="/tracks" element={ isLoggedIn ? <TracksPage /> : <Navigate replace to="/login"/> } />
      <Route path="/playlist" element={ isLoggedIn ? <PlaylistPage /> : <Navigate replace to="/login"/> }/>
      <Route path="/collection/:id" element={ isLoggedIn ? <Collection /> : <Navigate replace to="/login"/> } />
      <Route path="*" element={ <Navigate replace to="/" /> } />
    </ReactRoutes>
  )
}
