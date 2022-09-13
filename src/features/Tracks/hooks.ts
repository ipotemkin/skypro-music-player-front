import { useState, useEffect, useRef } from 'react'

import { ICollection, IFilterItem, IStaredUser, ITrack, IUser } from '../../models';
import { useGetCollectionQuery, useGetCurrentUserQuery, useGetTracksQuery, useRefreshUserTokenMutation } from '../../app/MusicPlayer/music-player.api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAccessToken, selectRefreshToken, selectTokens, setToken } from '../../app/Auth/tokenSlice';
import { useCookies } from 'react-cookie';
import { IFilterSlice, initialState, selectFilter, updateFilter } from '../Filter/FilterSlice';
import { getUserIdFromJWT } from '../../utils';
import { Navigate, useNavigate } from 'react-router-dom';

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
      return { access };
    } catch(err) {
      console.log(err);
      return { error: err };
    }
  }
  
  return handleRefreshToken;
}

export const useTracks = (query: string = '') => {

  // DEBUG
  console.log('in useTracks');

  useCurrentUser();
  const { isLoading, isError, data, error } = useGetTracksQuery();
  const [ filteredData, setFilteredData ] = useState<ITrack[]>([]);

  useEffect( () => {    
    if (data) filterData(data);
  // eslint-disable-next-line
  }, [data, isError, query]);
      
  const filterData = (data: ITrack[]) => 
    setFilteredData(data.filter((item: ITrack) => item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())));

  return { data: filteredData, isLoading, isError, error };
}

export const useFilteredTracks = (query: string = '') => {

  // DEBUG
  console.log('in useFilteredTracks');

  const { isLoading, isError, data, error } = useTracks(query);
  const [ filteredData, setFilteredData ] = useState<ITrack[]>([]);
  const filterSliceData = useFilterData();

  const getSelectedItems = (data: IFilterItem[]) => (
    data.filter((el: IFilterItem) => el.selected).map(el => el.value)
  )

  useEffect( () => {
    if (filterSliceData && data) filterData(data, filterSliceData);
  // eslint-disable-next-line
  }, [data, filterSliceData, query]);
      
  const filterData = (data: ITrack[], filter: IFilterSlice) => {
    setFilteredData(data.filter((item: ITrack) => {
      const { field } = filter;
      const filterItems = getSelectedItems(filter.filter[field]);

      if (filterItems.length) {
        return (
          field === 'release_date'
          ? filterItems.some(el => new RegExp(`^${el}`).test(String(item[field])))
          : filterItems.some(el => item[field]?.includes(el))
        );
      }
      return data;      
    }));
  }
  
  return { data: filteredData, isLoading, isError, error };
}

export const useFavoriteTracks = (query: string = '') => {
  const { isLoading, isError, data, error } = useTracks(query);
  const token = useAppSelector(selectAccessToken)
  const [ resultData, setResultData ] = useState<ITrack[]>([])

  const getFavoriteTracks = (data: ITrack[]) => {
    if (!token) return [];
    return data.filter((track: ITrack) => track.stared_user.find(
      (el: IStaredUser) => el.id === getUserIdFromJWT(token)
    ));
  }
  
  useEffect(() => { setResultData(getFavoriteTracks(data)); }, [data]);

  return { data: resultData, isLoading, isError, error };
}

export const useCollection = (query: string = '', collectionId: number) => {

  // DEBUG
  console.log('in useCollections');

  const { isLoading, isError, data, error } = useGetCollectionQuery(collectionId);
  const [ filteredData, setFilteredData ] = useState<ICollection>();
  const refreshToken = useAppSelector(selectRefreshToken)
  const handleRefreshTokens = useRefreshToken();

  useEffect( () => {
    if (isError) {
      if ('status' in error && error.status === 401) {
        if (refreshToken) {
          console.log('before handleRefreshTokens')
          handleRefreshTokens(refreshToken)
        }
      }
    }
    if (data) filterData(data);
  // eslint-disable-next-line
  }, [data, isError, query]);
      
  const filterData = (data: ICollection) => {
    const { items } = data;
    const newItems = items.filter((item: ITrack) => item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
    const newData = {...data};
    newData.items = [...newItems];
    setFilteredData(newData);
  }

  if (filteredData) {
    return { name: filteredData.name, data: filteredData.items, isLoading, isError, error };
  }
  return { name: '', data: [], isLoading, isError, error };
  // return { data: filteredData, isLoading, isError, error };
}

export const useCollectionOne = (query: string = '') => {
  return useCollection(query, 1);
}

export const useCollectionTwo = (query: string = '') => {
  return useCollection(query, 2);
}

export const useCollectionThree = (query: string = '') => {
  return useCollection(query, 3);
}

export const useFilterData = () => {
  const { data } = useGetTracksQuery();
  const [ filteredData, setFilteredData ] = useState<IFilterSlice>(initialState);
  const dispatch = useAppDispatch();
  const selectedData = useAppSelector(selectFilter);

  console.log('selectedData -->', selectedData);
  
  useEffect(() => { if (data) dispatch(updateFilter(data)); }, [data]);
  
  useEffect(() => {
    console.log('in useEffect selectedData');
    if (selectedData) {
      console.log('in useEffect selectedData before setFileteredData');
      console.log('selectedData -->', selectedData);
      setFilteredData(selectedData);
    }
  }, [selectedData]);

  console.log('filteredData -->', filteredData);
  return filteredData;
}

// not finished
const checkUserToken = (token: string) => {
  return true;
}

// not finished
export const useCurrentUserId = () => {
  const token = useAppSelector(selectAccessToken);
  if (token) checkUserToken(token);
}

export const useLoadCredentialsFromCookies = () => {
  const [ cookies ] = useCookies(['access', 'refresh']);
  const dispatch = useAppDispatch();

  console.log('before checking tokens');
  
  if (cookies && cookies.access !== '' && cookies.access !== undefined) {
    console.log('credentials set from cookies');
    console.log(cookies);
    dispatch(setToken({ access: cookies.access, refresh: cookies.refresh }));
    return true;
  }

  console.log('no credentials found in cookies');
  return false;
}

export const useLogout = () => {
  const [cookies, setCookies, removeCookies] = useCookies(['access', 'refresh']);
  const dispatch = useAppDispatch();

  console.log('processing logout');
  removeCookies('access');
  removeCookies('refresh');
  dispatch(setToken({ access: undefined, refresh: undefined }));
  // setCookies('access', '');
  // setCookies('refresh', '');
}

export const useAuth = () => {
  const dispatch = useAppDispatch();
  
  // проверить, есть ли токены в сторе
  const tokens = useAppSelector(selectTokens);

  if (tokens.access) {}
    // если есть, то получаем пользователя
      // если OK --> return
      // если нет --> рефрешим токен
        // если OK --> получаем пользователя
        // если нет --> loginPage
  
    // если нет, проверить токены в куках

      // если есть, то загрузить в стор и получить пользователя

        // если пользователя не получили, то рефрешим токен

          // если ОК --> получаем пользователя
          // если нет --> loginPage

      // если нет, то --> loginPage

}

export const useAuthUser = () => {
  const timestampRef = useRef(Date.now()).current;
  return useGetCurrentUserQuery(timestampRef);
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
    console.log('in handleREfreshToken');
    const result = await doRefreshToken(rt);
    if ('error' in result) navigate('/login');
  }

  useEffect(() => {
    console.group('useCurrentUser useEffect:');
    console.log('isError -->', isError);
    console.log('refreshToken -->', refreshToken);
    console.log('error.status -->', error);
    console.groupEnd();
    
    if(isError) {
      if ('status' in error && error.status === 401 && refreshToken) {
        console.log('refreshing token');
        setResultError(false);
        handleRefreshToken(refreshToken);
      } else {
        navigate('/login');
      }
    }
  }, [isError, error, refreshToken]);

  console.log('exiting useCurrentUser -->', data);
  return  { user: data, isLoading, isError, error: resultError };
}

export const useCurrentUserOld = () => {
  const timestampRef = useRef(Date.now()).current;
  const { isError, data, error } = useGetCurrentUserQuery(timestampRef);
  
  const [ user, setUser ] = useState<IUser | undefined>(data)
  const doRefreshToken = useRefreshToken();
  const refreshToken = useAppSelector(selectRefreshToken);
  const [ loaded, setLoaded ] = useState(false);

  useEffect(() => {
    if(data) { 
      setUser(data);
      setLoaded(true);
    }
  }, [data]);

  useEffect(() => {
    if(isError) {
      if ('status' in error && error.status === 401 && refreshToken) {
        console.log('refreshing token');
        const access = doRefreshToken(refreshToken);
        console.log('access token -->', access);
        setLoaded(true);
      }
    }
  }, [isError, error, refreshToken, doRefreshToken]);

  console.log('exiting useCurrentUser -->', user);
  return  { user, loaded };
}
