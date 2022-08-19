import { FC, useState } from 'react';

import { Filter, FilterStates } from '../../features/Filter/Filter'
import { TrackList } from '../../features/TrackList/TrackList'
import { Search } from '../../features/Search/Search';
import { SideMenu } from '../../features/SideMenu/SideMenu';
import { Sidebar } from '../../features/Sidebar/Sidebar';
// import { ITrack } from '../../models';

import { cnTracks } from './Tracks.classname';
import './Tracks.css'
// import { useGetTracksQuery } from '../../app/MusicPlayer/music-player.api';
// import { useEffect } from 'react';
import { useFilteredTracks, useGenres, useTrackNames, useYears } from './hooks';
import { FilterPopup } from '../FilterPopup/FilterPopup';
    
// type FilterStatesNames = 'name' | 'release_date' | 'genre'

// const filterList: {
//   1: 'name',
//   2: 'release_date',
//   3: 'genre'
// } = {
//   1: 'name',
//   2: 'release_date',
//   3: 'genre'
// }

const songsList = [
  'Song1', 'Song2', 'Song3', 'Song4', 'Song5',
  'Song1', 'Song2', 'Song3', 'Song4', 'Song5',
  'Song1', 'Song2', 'Song3', 'Song4', 'Song5',
]

type TracksProps = {
  title: string
  showFilter?: boolean
  showSidebar?: boolean
}

export const Tracks: FC<TracksProps> = ({ title, showFilter = false, showSidebar = false }) => {
  const [searchString, setSearchString] = useState('')
  const { isLoading, isError, data, error } = useFilteredTracks(searchString)
  const [ filter, setFilter ] = useState<FilterStates>(1)
  const { trackNames } = useTrackNames()
  const { genres } = useGenres()
  const { years } = useYears()
  const [showFilterPopup, setShowFilterPopup] = useState(false)

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value)
  }
  
  const onFilterChangeHandler = (filterIn: FilterStates) => {
    setFilter(filterIn)
    setShowFilterPopup(filter === filterIn ? !showFilterPopup : true)
    // console.log('showFilterPopup -->', showFilterPopup)
  }

  // console.log('genres -->', genres)

  // const { isLoading, isError, data, error } = useGetTracksQuery(1)

  // const [ filter, setFilter ] = useState<FilterStates>(1)

  // const initialData: ITrack[] = [] 
  // const [ filteredData, setFilteredData ] = useState<ITrack[]>(initialData)
  
  // const [searchString, setSearchString] = useState('')

  // useEffect(() => {
  //   if (data) filterData(data, filterList[filter], searchString)
  // }
  // , [data, searchString, filter])

  // const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setSearchString(e.target.value)

  // const filterData = (data: ITrack[], field: FilterStatesNames, query: string) => {
  //     setFilteredData(data.filter((item: ITrack) => (
  //       item[field] ?
  //       item[field]!.toLocaleLowerCase().includes(query.toLocaleLowerCase()) :
  //       null
  //     )))
  // }

  // const onFilterChangeHandler = (filter: FilterStates) => setFilter(filter)

  console.log('error -->', error)
  console.log('data -->', data)
  console.log('isError -->', isError)
  
  return (
    <div className={cnTracks()}>
      <SideMenu />
      <div className={cnTracks('centerblock')}>
        <Search onChange={onChangeHandler} value={searchString}/>
        <h2 className={cnTracks('centerblock__title')}>{title}</h2>
        {showFilter &&
          <div style={{ position: 'relative'}}>
            <Filter onFilterChange={onFilterChangeHandler} />
            {filter === 1 && <FilterPopup data={trackNames} shown={showFilterPopup}/>}
            {filter === 2 && <FilterPopup data={genres} shown={showFilterPopup}/>}
            {filter === 3 && <FilterPopup data={years} shown={showFilterPopup}/>}
          </div>
        }
        
        { isLoading && <p>Loading...</p>}
        { isError && <p>Error</p>}
        { data && <TrackList tracks={data} />}
      </div>
      {showSidebar && <Sidebar />}
    </div>
  ) 
}
