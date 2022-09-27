import { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes';
import { selectRefreshToken, setToken } from '../slices/tokenSlice';
import { musicPlayerApi, useGetCurrentUserQuery, useRefreshUserTokenMutation } from '../slices/music-player.api';
import { useAppDispatch, useAppSelector } from './appHooks';

export const useLogout = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookies, removeCookies] = useCookies(['access', 'refresh']);
  const dispatch = useAppDispatch();

  const logout = () => {
    console.log('processing logout');
    removeCookies('access');
    removeCookies('refresh');
    dispatch(setToken({ access: undefined, refresh: undefined }));        
  }

  return logout;
}

// returns the current user, refreshing his token if necessary
// if no loggedin user or the refresh token is invalid, returns undefined
export const useCurrentUser = () => {
  const timestampRef = useRef(Date.now()).current;
  const { data, isLoading, isError, error } = useGetCurrentUserQuery(timestampRef);  
  const doRefreshToken = useRefreshToken();
  const refreshToken = useAppSelector(selectRefreshToken);
  const [ resultError, setResultError ] = useState(false)
  const navigate = useNavigate();
  
  const handleRefreshToken = async (rt: string) => {
    const result = await doRefreshToken(rt);
    if ('error' in result) navigate(ROUTES.login);
  }

  const shouldRefreshTokens = () => error ? 'status' in error && error.status === 401 : false;

  useEffect(() => {
    if(isError) {
      if (shouldRefreshTokens() && refreshToken) {
        setResultError(false);
        handleRefreshToken(refreshToken);
      } else {
        navigate(ROUTES.login);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, refreshToken]);

  return  { user: data, isLoading, isError, error: resultError };
}

// возвращает функцию для обновления access токена
// запрашивает новый access token с помощью refresh token
// монтирует его в cookies и strore
// возвращает новый access token или ошибку
export const useRefreshToken = () => {
  // eslint-disable-next-line
  const [ cookies, setCookies ] = useCookies(['access']);
  const dispatch = useAppDispatch();
  const [ doRefreshToken ] = useRefreshUserTokenMutation();
  
  const handleRefreshToken = async (refreshTokenIn: string) => {
    try {
      const { access } = await doRefreshToken(refreshTokenIn).unwrap();
      setCookies('access', access);
      dispatch(setToken({ access, refresh: refreshTokenIn }));
      
      // монтируем нового пользователя в store, но мне кажется, это не работает
      // Date.now() используем, чтобы не брать пользователя из cache, а получать с сервера
      console.log(musicPlayerApi.endpoints.getCurrentUser.initiate(Date.now()));
      
      return { access };
    } catch(err) {
      return { error: err };
    }
  }
  
  return handleRefreshToken;
}
