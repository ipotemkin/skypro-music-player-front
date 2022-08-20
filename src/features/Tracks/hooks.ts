import { useState, useEffect } from 'react'

import { IFilterItem, ITrack } from '../../models';

import { useGetTracksQuery } from '../../app/MusicPlayer/music-player.api';

type FiledNames = 'author' | 'name' | 'genre';

export const useFilteredTracks = (query: string = '') => {
  const { isLoading, isError, data, error } = useGetTracksQuery(1);

  const [filteredData, setFilteredData] = useState<ITrack[]>([]);
  
  useEffect(() => { if (data) filterData(data, query) }, [data, query]);
      
  const filterData = (data: ITrack[], query: string) => {
    setFilteredData(data.filter((item: ITrack) => (
      item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    )));
  }
  
  return { data: filteredData, isLoading, isError, error };
}

const getFilterData = (data: ITrack[], field: FiledNames) => {
  const tempList: string[] = data.map((item: ITrack) => (item[field])).filter(item => item !== '-');
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
