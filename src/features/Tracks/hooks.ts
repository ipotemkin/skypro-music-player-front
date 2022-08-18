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
