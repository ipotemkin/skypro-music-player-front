import { useState, useEffect } from 'react'

import { IFilterItem, ITrack } from '../../models';
import { useGetTracksQuery, useRefreshUserTokenMutation } from '../../app/MusicPlayer/music-player.api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectRefreshToken, setToken } from '../../app/Auth/tokenSlice';
import { useCookies } from 'react-cookie';

type FiledNames = 'author' | 'name' | 'genre' | 'release_date';

export type FilterData = {
  field: FiledNames
  query: string[]
}

export const useFilteredTracks = (query: string = '', filter: FilterData = { field: 'author', query: [] }) => {

  const [ cookies, setCookies ] = useCookies(['access', 'refresh'])
  const dispatch = useAppDispatch()

  // DEBUG
  console.log('in useFilteredTracks');
  console.log('filter -->', filter);

  const { isLoading, isError, data, error } = useGetTracksQuery();

  const [ filteredData, setFilteredData ] = useState<ITrack[]>([]);

  const [ doRefreshToken ] = useRefreshUserTokenMutation()

  const refreshToken = useAppSelector(selectRefreshToken)

  const handleRefreshTokens = async (refreshTokenIn: string) => {
    try {
      const newTokens = await doRefreshToken(refreshTokenIn).unwrap()
      const { access, refresh } = newTokens
      setCookies('access', access)
      setCookies('refresh', refresh)
      dispatch(setToken({ access, refresh }))
    } catch(err) {
      console.log(err)
    }   
  }
  
  useEffect( () => {
    if (isError) {
      if ('status' in error && error.status === 401) {
        if (refreshToken) {
          console.log('cokkies -->', cookies)
          console.log('before handleRefreshTokens')
          handleRefreshTokens(refreshToken)
        }
      }
    }
    if (data) filterData(data, query)
  }, [data, query, filter, isError]);
      
  const filterData = (data: ITrack[], query: string) => {
    setFilteredData(data.filter((item: ITrack) => {
      let res = item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase());
      if (filter.query.length) {
        return (
          item[filter.field] === 'release_date'
          ? res && filter.query.some(el => new RegExp(`^${el}`).test(String(item[filter.field])))
          : res && filter.query.some(el => item[filter.field]?.includes(el))
        );
      }
      return res;      
    }));
  }
  
  return { data: filteredData, isLoading, isError, error };
}

const getFilterData = (data: ITrack[], field: FiledNames) => {
  const tempList: string[] = data.map((item: ITrack) => (item[field]!)).filter(item => item !== '-');
  const orderedList = Array.from(new Set(tempList)).sort();
  return orderedList.map(i => ({ 'value': i, 'selected': false }));
}

const useFieldData = (field: FiledNames) => {
  const { isLoading, isError, data, error } = useGetTracksQuery();
  const [ filteredData, setFilteredData ] = useState<IFilterItem[]>([]);
  useEffect(() => { if (data) setFilteredData(getFilterData(data, field)) }, [data]);
  return { data: filteredData, isLoading, isError, error };
}

export const useTrackNames = () => ({ ...useFieldData('name') })

export const useAuthors = () => ({ ...useFieldData('author') })

export const useGenres = () => ({ ...useFieldData('genre') })

export const useYears = () => {
  const { isLoading, isError, data, error } = useGetTracksQuery();
  const [ filteredData, setFilteredData ] = useState<IFilterItem[]>([]);

  useEffect(() => { if (data) filterData(data) }, [data]);
      
  const filterData = (data: ITrack[]) => {
    const yearList = data.map((item: ITrack) => (item.release_date ? +item.release_date.split('-')[0] : 0));
    const uniqueList = Array.from(new Set(yearList)).filter(item => item !== 0);
    const orderedList = uniqueList.sort((a, b) => (b! - a!));
    setFilteredData(orderedList.map(item => ({ 'value': String(item), 'selected': false })));
  }
  
  return { data: filteredData, isLoading, isError, error };
}
