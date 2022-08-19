import { useState, useEffect } from 'react'

import { ITrack } from '../../models';

import { useGetTracksQuery } from '../../app/MusicPlayer/music-player.api';


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

export const useTrackNames = (query: string = '') => {
  const { isLoading, isError, data, error } = useGetTracksQuery(1);

  const [filteredData, setFilteredData] = useState<string[]>([]);
  
  useEffect(() => { if (data) filterData(data, query) }, [data, query]);
      
  const filterData = (data: ITrack[], query: string) => {
    const tempList: string[] = data.map((item: ITrack) => (item.name));
    setFilteredData(Array.from(new Set(tempList)));
  }
  
  return { trackNames: filteredData, isLoading, isError, error };
}

export const useGenres = (query: string = '') => {
  const { isLoading, isError, data, error } = useGetTracksQuery(1);

  const [filteredData, setFilteredData] = useState<string[]>([]);
  
  useEffect(() => { if (data) filterData(data, query) }, [data, query]);
      
  const filterData = (data: ITrack[], query: string) => {
    const tempList: string[] = data.map((item: ITrack) => (item.genre));
    setFilteredData(Array.from(new Set(tempList)));
  }
  
  return { genres: filteredData, isLoading, isError, error };
}

export const useYears = (query: string = '') => {
  const { isLoading, isError, data, error } = useGetTracksQuery(1);

  const [filteredData, setFilteredData] = useState<string[]>([]);
  
  useEffect(() => { if (data) filterData(data, query) }, [data, query]);
      
  const filterData = (data: ITrack[], query: string) => {
    const yearList = data.map((item: ITrack) => (item.release_date ? +item.release_date.split('-')[0] : 0));
    const uniqueList = Array.from(new Set(yearList)).filter(item => item !== 0);
    const orderedList = uniqueList.sort((a, b) => (b! - a!));
    setFilteredData(orderedList.map(item => String(item)));
  }
  
  return { years: filteredData, isLoading, isError, error };
}
