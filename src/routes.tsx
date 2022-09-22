import { Routes as ReactRoutes, Route, Navigate, Outlet } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { TracksPage } from './pages/TracksPage/TracksPage'
import { PlaylistPage } from './pages/PlaylistPage/PlaylistPage'
import { Collection } from './pages/CollectionPage/CollectionPage'
import { useLoadCredentialsFromCookies } from './features/Tracks/hooks'
import { FC } from 'react'

export const ROUTES = {
  login: '/login',
  tracks: '/tracks',
  playlist: '/playlist',
  collection: '/collection'
}

type ProtectedRouteProps = {
  redirectPath?: string;
  isAllowed: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProtectedRoute: FC<ProtectedRouteProps> = ({ redirectPath = ROUTES.login, isAllowed }) => {
  if (!isAllowed) return <Navigate to={redirectPath} replace={true} />
  return <Outlet />
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

  // Я попробовал, но этот код не работает. Он вывывает бесконечный цикл и браузер зависает.
  // return (
  //   <ReactRoutes>
  //     <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
  //       <Route path="/" element={ <LoginPage/> } />
  //       <Route path={ROUTES.login} element={ <LoginPage /> } />
  //       <Route path={ROUTES.tracks} element={ <TracksPage /> } />
  //       <Route path={ROUTES.playlist} element={ <PlaylistPage /> } />
  //       <Route path={`${ROUTES.collection}/:id`} element={ <Collection /> } />
  //       <Route path="*" element={ <Navigate replace to="/" /> } />      
  //     </Route>
  //   </ReactRoutes>
  // )
}
