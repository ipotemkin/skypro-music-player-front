import { useState, useEffect } from 'react'

import { ITrack } from '../../models';
import { useGetTracksQuery, useRefreshUserTokenMutation } from '../../app/MusicPlayer/music-player.api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectRefreshToken, setToken } from '../../app/Auth/tokenSlice';
import { useCookies } from 'react-cookie';
import { IFilter, initialState, selectFilter, updateFilter } from '../../app/slices/FilterAuthorsSlice';

type FiledNames = 'author' | 'name' | 'genre' | 'release_date';

export type FilterData = {
  field: FiledNames
  query: string[]
}

// export const useSetCookies = () => {
//   const [ cookies, setCookies ] = useCookies(['access', 'refresh']);
//   return [ setCookies, cookies ];
// }

// возвращает функцию для обновления access токена
// запрашивает новый access token с помощью refresh token
// монтирует его в cookies и strore
// возвращает новый access token или ошибку
export const useRefreshToken = () => {
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

export const useFilteredTracks = (query: string = '', filter: FilterData = { field: 'author', query: [] }) => {

  // const [ cookies, setCookies ] = useCookies(['access', 'refresh'])
  // const dispatch = useAppDispatch()

  // DEBUG
  console.log('in useFilteredTracks');
  console.log('filter -->', filter);

  const { isLoading, isError, data, error } = useGetTracksQuery();
  const [ filteredData, setFilteredData ] = useState<ITrack[]>([]);
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

// const getFilterData = (data: ITrack[], field: FiledNames) => {
//   const tempList: string[] = data.map((item: ITrack) => (item[field]!)).filter(item => item !== '-');
//   const orderedList = Array.from(new Set(tempList)).sort();
//   return orderedList.map(i => ({ value: i, selected: false }));
// }

// const useFieldData = (field: FiledNames) => {
//   const { isLoading, isError, data, error } = useGetTracksQuery();
//   const [ filteredData, setFilteredData ] = useState<IFilterItem[]>([]);
//   useEffect(() => { if (data) setFilteredData(getFilterData(data, field)) }, [data]);
//   return { data: filteredData, isLoading, isError, error };
// }

// const useFieldData = (field: FiledNames) => {
//   const { isLoading, isError, data, error } = useGetTracksQuery();
//   const [ filteredData, setFilteredData ] = useState<IFilterItem[]>([]);
//   const dispatch = useAppDispatch();
//   const selectedData = useAppSelector(selectFilterAuthors);
//   dispatch(updateAuthors())

//   useEffect(() => {
//     if (data) setFilteredData(getFilterData(data, field))
//   }, [data]);
//   return { data: filteredData, isLoading, isError, error };
// }

// export const useFilterData = () => {
//   const { isLoading, isError, data, error } = useGetTracksQuery();
//   const [ filteredData, setFilteredData ] = useState<IFilterItem[]>([]);
//   const dispatch = useAppDispatch();
//   const selectedData = useAppSelector(selectFilterAuthors);
//   console.log('useAppSelector test');
//   useAppSelector((state) => console.log(state));

//   useEffect(() => {
//     if (selectedData.length) {
//       // console.log('setting selectedData');
//       // console.log('selectedData -->', selectedData);
//       setFilteredData(selectedData);
//       return;
//     }}, [selectedData]
//   );

//   useEffect(() => {
//     if (data) dispatch(updateAuthors(data.map((el: ITrack) => el.author)));
//   }, [data]);

//   return { data: filteredData, isLoading, isError, error };
// }

export const useFilterData = () => {
  const { data } = useGetTracksQuery();
  const [ filteredData, setFilteredData ] = useState<IFilter>(initialState);
  const dispatch = useAppDispatch();
  const selectedData = useAppSelector(selectFilter);
  
  useEffect(() => { if (data) dispatch(updateFilter(data)); }, [data]);
  useEffect(() => { if (selectedData) setFilteredData(selectedData); }, [selectedData]);

  return filteredData;
}


// export const useTrackNames = () => ({ ...useFieldData('name') })

// export const useAuthors = () => ({ ...useFieldData('author') })

// export const useGenres = () => ({ ...useFieldData('genre') })

// export const useYears = () => {
//   const { isLoading, isError, data, error } = useGetTracksQuery();
//   const [ filteredData, setFilteredData ] = useState<IFilterItem[]>([]);

//   useEffect(() => { if (data) filterData(data) }, [data]);
      
//   const filterData = (data: ITrack[]) => {
//     const yearList = data.map((item: ITrack) => (item.release_date ? +item.release_date.split('-')[0] : 0));
//     const uniqueList = Array.from(new Set(yearList)).filter(item => item !== 0);
//     const orderedList = uniqueList.sort((a, b) => (b! - a!));
//     setFilteredData(orderedList.map(item => ({ 'value': String(item), 'selected': false })));
//   }
  
//   return { data: filteredData, isLoading, isError, error };
// }
