import { useState, useEffect, useRef } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import { ICollection, IFilterItem, IStaredUser, ITrack } from '../../models';
import {
  useAddTrackToFavoriteMutation,
  useGetCollectionQuery,
  useGetCurrentUserQuery,
  useGetTracksQuery,
  useRefreshUserTokenMutation,
  useRemoveTrackFromFavoriteMutation
 } from '../../app/MusicPlayer/music-player.api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAccessToken, selectRefreshToken, setToken } from '../../app/Auth/tokenSlice';
import { IFilterSlice, initialState, selectFilter, updateFilter } from '../Filter/FilterSlice';
import { getUserIdFromJWT } from '../../utils';
import { musicPlayerApi } from '../../app/MusicPlayer/music-player.api';

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

// getting tracks, searching by track name available
export const useTracks = (query: string = '') => {
  useCurrentUser();
  const { isLoading, isError, data, error } = useGetTracksQuery();
  const [ filteredData, setFilteredData ] = useState<ITrack[]>([]);

  useEffect(() => {    
    if (data) filterData(data);
  // eslint-disable-next-line
  }, [data, isError, query]);
      
  const filterData = (data: ITrack[]) => 
    setFilteredData(data.filter((item: ITrack) => item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())));

  return { data: filteredData, isLoading, isError, error };
}

// getting filtered tracks
export const useFilteredTracks = (query: string = '') => {
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

// getting the favorite tracks
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
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { setResultData(getFavoriteTracks(data)); }, [data]);

  return { data: resultData, isLoading, isError, error };
}

export const useCollection = (query: string = '', collectionId: number) => {
  const { isLoading, isError, data, error } = useGetCollectionQuery(collectionId);
  const [ filteredData, setFilteredData ] = useState<ICollection>();
  const refreshToken = useAppSelector(selectRefreshToken)
  const handleRefreshTokens = useRefreshToken();

  useEffect(() => {
    if (isError && 'status' in error && error.status === 401 && refreshToken) {
      handleRefreshTokens(refreshToken);
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
}

export const useFilterData = () => {
  const { data } = useGetTracksQuery();
  const [ filteredData, setFilteredData ] = useState<IFilterSlice>(initialState);
  const dispatch = useAppDispatch();
  const selectedData = useAppSelector(selectFilter);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (data) dispatch(updateFilter(data)); }, [data]);
  
  useEffect(() => { if (selectedData) setFilteredData(selectedData); }, [selectedData]);

  return filteredData;
}

export const useLoadCredentialsFromCookies = () => {
  const [ cookies ] = useCookies(['access', 'refresh']);
  const dispatch = useAppDispatch();

  if (cookies && cookies.access !== '' && cookies.access !== undefined) {
    dispatch(setToken({ access: cookies.access, refresh: cookies.refresh }));
    return true;
  }

  console.log('no credentials found in cookies');
  return false;
}

// export const useAuthUser = () => {
//   const timestampRef = useRef(Date.now()).current;
//   return useGetCurrentUserQuery(timestampRef);
// }

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
    if ('error' in result) navigate('/login');
  }

  useEffect(() => {
    if(isError) {
      if ('status' in error && error.status === 401 && refreshToken) {
        setResultError(false);
        handleRefreshToken(refreshToken);
      } else {
        navigate('/login');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error, refreshToken]);

  return  { user: data, isLoading, isError, error: resultError };
}

export const useFavorite = (track: ITrack | undefined) => {
  const token = useAppSelector(selectAccessToken)
  const refreshToken = useAppSelector(selectRefreshToken)
  const handleRefreshToken = useRefreshToken()
  const [ addTrackToFavorite ] = useAddTrackToFavoriteMutation()
  const [ removeTrackFromFavorite ] = useRemoveTrackFromFavoriteMutation()
  
  const navigate = useNavigate()
  
  const favorite: boolean = (
    track
    ? track.stared_user.filter((el: IStaredUser) => el.id === (token ? getUserIdFromJWT(token) : 0)).length > 0
    : false
  )

  const toggleFavoriteTrack = async (trackId: number) => {
    try {
      favorite ? await removeTrackFromFavorite(trackId).unwrap() : await addTrackToFavorite(trackId).unwrap()
    } catch (err) {
      console.error('toggleFavoriteTrack -> catch err =', err)
      if (refreshToken) {
        await handleRefreshToken(refreshToken)
        toggleFavoriteTrack(trackId)
      } else {
        console.error('No refresh token')
        navigate('/login')
      }
    }
  }

  return { favorite, toggleFavoriteTrack };
}
