import { Routes as ReactRoutes, Route, Navigate } from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { TracksPage } from './pages/TracksPage/TracksPage'
import { Playlist } from './pages/Playlist/Playlist'
import { Collection} from './pages/Collection/Collection'
import { useLoadCredentialsFromCookies } from './features/Tracks/hooks'

export const Routes = () => {
  const isLoggedIn = useLoadCredentialsFromCookies()

  return (
    <ReactRoutes>
      <Route path="/" element={<Navigate replace to={isLoggedIn ? "/tracks" : "/login"}/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/tracks" element={<TracksPage />} />
      <Route path="/playlist" element={<Playlist />} />
      <Route path="/collection/:id" element={<Collection />} />
      {/* <Route path="*" element={<Page404 />} /> */}
    </ReactRoutes>
  )
}
