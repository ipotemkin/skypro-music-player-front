import { Routes as ReactRoutes, Route } from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { Tracks } from './pages/Tracks/Tracks'
import { Playlist } from './pages/Playlist/Playlist'

export const Routes = () => {
  return (
    <ReactRoutes>
      {/* <Redirect from="/" to="/login" exact /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/tracks" element={<Tracks />} />
      <Route path="/playlist" element={<Playlist />} />
      {/* <Route path="*" element={<Page404 />} /> */}
    </ReactRoutes>
  )
}
