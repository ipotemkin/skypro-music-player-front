import { FC, useEffect, useState, useMemo} from 'react';

import { Filter, FilterStates } from '../../features/Filter/Filter'
import { TrackList } from '../../features/TrackList/TrackList'
import { Search } from '../../features/Search/Search';
import { SideMenu } from '../../features/SideMenu/SideMenu';
import { Sidebar } from '../../features/Sidebar/Sidebar';
import { useFilteredTracks, useGenres, useAuthors, useYears, FilterData } from './hooks';
import { FilterPopup } from '../FilterPopup/FilterPopup';
import { IFilterItem } from '../../models';

import { cnTracks } from './Tracks.classname';
import './Tracks.css'

type TracksProps = {
  title: string
  showFilter?: boolean
  showSidebar?: boolean
}

export const Tracks: FC<TracksProps> = ({ title, showFilter = false, showSidebar = false }) => {
  const [ searchString, setSearchString ] = useState('')
  const [ filterQuery, setFilterQuery ] = useState<FilterData>({ field: 'author', query: [] })
  const { isLoading, isError, data, error } = useFilteredTracks(searchString, filterQuery)
  const [ filter, setFilter ] = useState<FilterStates>(1)
  const { data: authors } = useAuthors()
  const { data: genres } = useGenres()
  const { data: years } = useYears()
  const [ showFilterPopup, setShowFilterPopup ] = useState(false)
  const [ stickers, setStickers ] = useState([0, 0, 0])

  useEffect(() => {
    if (filter === 1) setFilterQuery({ field: 'author', query: getSelectedItems(authors) })
    else if (filter === 2) setFilterQuery({ field: 'release_date', query: getSelectedItems(years) })
    else setFilterQuery({ field: 'genre', query: getSelectedItems(genres) })

    // console.group('Selected:')
    // console.log('data -->', data)
    // console.log('filter -->', filter)
    // console.log('filterQuery -->', filterQuery)
    // console.log('author -->', getSelectedItems(authors))
    // console.log('years -->', getSelectedItems(years))
    // console.log('genres -->', getSelectedItems(genres))
    // console.groupEnd()
  }, [showFilterPopup, stickers, filter])

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setSearchString(e.target.value)
  
  const onFilterChangeHandler = (filterIn: FilterStates) => {
    setFilter(filterIn)
    setShowFilterPopup(filter === filterIn ? !showFilterPopup : true)
  }

  const getSelectedCount = (data: IFilterItem[]) => {
    let res = 0
    for (let item of data) if (item.selected) res++
    return res
  }

  const getSelectedItems = (data: IFilterItem[]) => {
    const filteredData = data.filter((item: IFilterItem) => item.selected)
    return filteredData.map(item => item.value)
  }

  const onSelectAuthorsHandler = () => setStickers(prev => ([ getSelectedCount(authors), ...prev.slice(1, 3) ]))

  const onSelectYearsHandler = () => setStickers(prev => ([ prev[0], getSelectedCount(years), prev[2] ]))

  const onSelectGenresHandler = () => setStickers(prev => ([ ...prev.slice(0, 2), getSelectedCount(genres) ]))

  // console.log('error -->', error)
  // console.log('data -->', data)
  // console.log('isError -->', isError)
  
  return (
    <div className={cnTracks()}>
      <SideMenu />
      <div className={cnTracks('centerblock')}>
        <Search onChange={onChangeHandler} value={searchString}/>
        <h2 className={cnTracks('centerblock__title')}>{title}</h2>
        {showFilter &&
          <div style={{ position: 'relative' }}>
            <Filter onFilterChange={onFilterChangeHandler} stickers={stickers}/>
            {filter === 1 && <FilterPopup data={authors} shown={showFilterPopup} onClick={onSelectAuthorsHandler}/>}
            {filter === 2 && <FilterPopup data={years} shown={showFilterPopup} onClick={onSelectYearsHandler}/>}
            {filter === 3 && <FilterPopup data={genres} shown={showFilterPopup} onClick={onSelectGenresHandler}/>}
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
