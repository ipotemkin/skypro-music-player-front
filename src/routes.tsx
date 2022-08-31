import { Routes as ReactRoutes, Route } from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { TracksPage } from './pages/TracksPage/TracksPage'
import { Playlist } from './pages/Playlist/Playlist'
import { Collection} from './pages/Collection/Collection'

export const Routes = () => {
  return (
    <ReactRoutes>
      {/* <Redirect from="/" to="/login" exact /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/tracks" element={<TracksPage />} />
      <Route path="/playlist" element={<Playlist />} />
      <Route path="/collection/:id" element={<Collection />} />
      {/* <Route path="*" element={<Page404 />} /> */}
    </ReactRoutes>
  )
}
