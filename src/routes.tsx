import { Routes as ReactRoutes, Route } from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { TracksPage } from './pages/TracksPage/TracksPage'
import { Playlist } from './pages/Playlist/Playlist'

export const Routes = () => {
  return (
    <ReactRoutes>
      {/* <Redirect from="/" to="/login" exact /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/tracks" element={<TracksPage />} />
      <Route path="/playlist" element={<Playlist />} />
      {/* <Route path="*" element={<Page404 />} /> */}
    </ReactRoutes>
  )
}
