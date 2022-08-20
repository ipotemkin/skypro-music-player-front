import { useState, useEffect } from 'react'

import { IFilterItem, ITrack } from '../../models';

import { useGetTracksQuery } from '../../app/MusicPlayer/music-player.api';

type FiledNames = 'author' | 'name' | 'genre' | 'release_date';

export type FilterData = {
  field: FiledNames
  query: string[]
}

export const useFilteredTracks = (query: string = '', filter: FilterData = { field: 'author', query: [] }) => {

  console.log('in useFilteredTracks');
  console.log('filter -->', filter);

  const { isLoading, isError, data, error } = useGetTracksQuery(1);

  const [filteredData, setFilteredData] = useState<ITrack[]>([]);
  
  useEffect(() => { if (data) filterData(data, query) }, [data, query, filter]);
      
  const filterData = (data: ITrack[], query: string) => {
    setFilteredData(data.filter((item: ITrack) => {
      if (filter.query.length && item[filter.field] !== 'release_date') {
        return (
          item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
          && filter.query.some(el => item[filter.field]?.includes(el))    
        )
      }

      if (filter.query.length && item[filter.field] === 'release_date') {
        return (
          item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        && filter.query.some(el => new RegExp(`^${el}`).test(String(item[filter.field])))    
        )
      }
      return item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    }));
  }
      // item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      // && ((filter.query.length && item[filter.field]) ? filter.query.some(el => item[filter.field]?.includes(el)) : true)

      // if (filter.query.length) {
      //   return (
      //     item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()) &&
      //     filter.query.some(el => item[filter.field].includes(el))
      //   )
      // }
      // return item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    // )));

  
  return { data: filteredData, isLoading, isError, error };
}

const getFilterData = (data: ITrack[], field: FiledNames) => {
  const tempList: string[] = data.map((item: ITrack) => (item[field]!)).filter(item => item !== '-');
  const orderedList = Array.from(new Set(tempList)).sort();
  return orderedList.map(i => ({ 'value': i, 'selected': false }));
}

const useFieldData = (field: FiledNames) => {
  const { isLoading, isError, data, error } = useGetTracksQuery(1);
  const [filteredData, setFilteredData] = useState<IFilterItem[]>([]);
  useEffect(() => { if (data) setFilteredData(getFilterData(data, field)) }, [data]);
  return { data: filteredData, isLoading, isError, error };
}

export const useTrackNames = () => ({ ...useFieldData('name') })

export const useAuthors = () => ({ ...useFieldData('author') })

export const useGenres = () => ({ ...useFieldData('genre') })

export const useYears = () => {
  const { isLoading, isError, data, error } = useGetTracksQuery(1);
  const [filteredData, setFilteredData] = useState<IFilterItem[]>([]);

  useEffect(() => { if (data) filterData(data) }, [data]);
      
  const filterData = (data: ITrack[]) => {
    const yearList = data.map((item: ITrack) => (item.release_date ? +item.release_date.split('-')[0] : 0));
    const uniqueList = Array.from(new Set(yearList)).filter(item => item !== 0);
    const orderedList = uniqueList.sort((a, b) => (b! - a!));
    setFilteredData(orderedList.map(item => ({ 'value': String(item), 'selected': false })));
  }
  
  return { data: filteredData, isLoading, isError, error };
}
