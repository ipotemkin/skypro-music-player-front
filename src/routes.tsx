import { Routes as ReactRoutes, Route, Navigate, Outlet } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { TracksPage } from './pages/TracksPage/TracksPage'
import { PlaylistPage } from './pages/PlaylistPage/PlaylistPage'
import { Collection } from './pages/CollectionPage/CollectionPage'
import { useLoadCredentialsFromCookies } from './components/Tracks/hooks'
import { FC } from 'react'

export const ROUTES = {
  home: '/',
  login: '/login',
  tracks: '/tracks',
  playlist: '/playlist',
  collection: '/collection'
}

type ProtectedRouteProps = {
  redirectPath?: string;
  isAllowed: boolean;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ redirectPath = ROUTES.login, isAllowed }) => {
  if (!isAllowed) return <Navigate to={redirectPath} replace={true} />
  return <Outlet />
}

export const Routes = () => {
  const isLoggedIn = useLoadCredentialsFromCookies()

  return (
    <ReactRoutes>
      <Route path={ROUTES.login} element={ <LoginPage /> } />
      <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
        <Route path={ROUTES.home} element={ <TracksPage /> } />
        <Route path={ROUTES.tracks} element={ <TracksPage /> } />
        <Route path={ROUTES.playlist} element={ <PlaylistPage /> } />
        <Route path={`${ROUTES.collection}/:id`} element={ <Collection /> } />
        <Route path="*" element={ <Navigate replace to={ROUTES.home} /> } />      
      </Route>
    </ReactRoutes>
  )
}
