import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import { ICollection, IFilterItem, IStaredUser, ITrack } from '../../models';
import {
  useAddTrackToFavoriteMutation,
  useGetCollectionQuery,
  useGetTracksQuery,
  useRemoveTrackFromFavoriteMutation
 } from '../../app/MusicPlayer/music-player.api';
import { useAppDispatch, useAppSelector, useCurrentUser, useRefreshToken } from '../../app/hooks';
import { selectAccessToken, selectRefreshToken, setToken } from '../../app/Auth/tokenSlice';
import { IFilterSlice, initialState, selectFilter, updateFilter } from '../Filter/FilterSlice';
import { getUserIdFromJWT } from '../../utils';
import { ROUTES } from '../../routes';


const getFilteredData = (data: ITrack[], query = '') => 
  data.filter((item: ITrack) => item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
);

// getting tracks, searching by track name available
export const useTracks = (query = '') => {
  useCurrentUser();
  const { isLoading, isError, data, error } = useGetTracksQuery();
  const [ filteredData, setFilteredData ] = useState<ITrack[]>([]);

  useEffect(() => {    
    if (data) setFilteredData(getFilteredData(data, query));
  }, [data, isError, query]);
      
  return { data: filteredData, isLoading, isError, error };
}

// getting filtered tracks
export const useFilteredTracks = (query = '') => {
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
export const useFavoriteTracks = (query = '') => {
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

export const useCollection = (query = '', collectionId = 1) => {
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
    setFilteredData({
      ...data,
      items: getFilteredData(data.items, query)
    });
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

export const useFavoriteTrack = (track?: ITrack) => {
  const token = useAppSelector(selectAccessToken);
  const refreshToken = useAppSelector(selectRefreshToken);
  const handleRefreshToken = useRefreshToken();
  const [ addTrackToFavorite ] = useAddTrackToFavoriteMutation();
  const [ removeTrackFromFavorite ] = useRemoveTrackFromFavoriteMutation();
  const navigate = useNavigate();
  
  const isUserInStaredUser = (starredUser: IStaredUser[]) => {
    const user = starredUser.find((el: IStaredUser) => el.id === (token ? getUserIdFromJWT(token) : 0));
    if (user) return true;
    return false;
  }
  
  const favorite: boolean = track ? isUserInStaredUser(track.stared_user) : false;

  const toggleFavoriteTrack = async (trackId: number) => {
    const handler = favorite ? removeTrackFromFavorite : addTrackToFavorite;
    try {
      await handler(trackId).unwrap();
    } catch (err) {
      if (refreshToken) {
        await handleRefreshToken(refreshToken);
        await toggleFavoriteTrack(trackId);
      } else {
        console.error('No refresh token');
        navigate(ROUTES.login);
      }
    }
  }

  return { favorite, toggleFavoriteTrack };
}
