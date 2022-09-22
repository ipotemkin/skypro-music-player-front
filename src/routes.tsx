import { Routes as ReactRoutes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { TracksPage } from './pages/TracksPage/TracksPage'
import { PlaylistPage } from './pages/PlaylistPage/PlaylistPage'
import { Collection } from './pages/CollectionPage/CollectionPage'
import { useLoadCredentialsFromCookies } from './features/Tracks/hooks'

export const ROUTES = {
  login: '/login',
  tracks: '/tracks',
  playlist: '/playlist',
  collection: '/collection'
}


export const Routes = () => {
  const isLoggedIn = useLoadCredentialsFromCookies()

  return (
    <ReactRoutes>
      <Route path="/" element={ <Navigate replace to={isLoggedIn ? ROUTES.tracks : ROUTES.login}/> } />
      <Route path={ROUTES.login} element={ <LoginPage /> } />
      <Route path={ROUTES.tracks} element={ isLoggedIn ? <TracksPage /> : <Navigate replace to={ROUTES.login}/> } />
      <Route path={ROUTES.playlist} element={ isLoggedIn ? <PlaylistPage /> : <Navigate replace to={ROUTES.login}/> }/>
      <Route path={`${ROUTES.collection}/:id`} element={ isLoggedIn ? <Collection /> : <Navigate replace to={ROUTES.login}/> } />
      <Route path="*" element={ <Navigate replace to="/" /> } />
    </ReactRoutes>
  )
}
