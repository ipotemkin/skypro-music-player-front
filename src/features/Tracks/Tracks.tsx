import { FC, useEffect, useState } from 'react'

import { Filter } from '../../features/Filter/Filter'
import { TrackList } from '../../features/TrackList/TrackList'
import { Search } from '../../features/Search/Search'
import { SideMenu } from '../../features/SideMenu/SideMenu'
import { Sidebar } from '../../features/Sidebar/Sidebar'
import { useFilteredTracks, useFilterData } from './hooks'
import { IFilterItem, FilterData } from '../../models'
import { cnTracks } from './Tracks.classname'
import './Tracks.css'
import { initFilterQuery } from '../../constants'
// import { getUserIdFromJWT, parseJWT } from '../../utils'

type TracksProps = {
  title: string
  showFilter?: boolean
  showSidebar?: boolean
}

export const Tracks: FC<TracksProps> = ({ title, showFilter = false, showSidebar = false }) => {
  const [ searchString, setSearchString ] = useState('')
  const [ filterQuery, setFilterQuery ] = useState<FilterData>(initFilterQuery)  
  const { isLoading, isError, data } = useFilteredTracks(
    searchString, showFilter ? filterQuery : initFilterQuery
  )  
  const filterData = useFilterData()

  useEffect(() => {
    const{ field, filter } = filterData
    setFilterQuery({ field, query: getSelectedItems(filter[field]) })
  }, [filterData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchString(e.target.value)
  
  const getSelectedItems = (data: IFilterItem[]) => (
    data.filter((el: IFilterItem) => el.selected).map(el => el.value)
  )
  
  return (
    <div className={cnTracks()}>
      <SideMenu />
      {/* <button onClick={() => {
        console.log('cookies in tracks -->', cookies)
        console.log(parseJWT(cookies.access))
        console.log(getUserIdFromJWT(cookies.access))
      }}>tokens</button> */}
      <div className={cnTracks('centerblock')}>
        <Search onChange={handleChange} value={searchString}/>
        <h2 className={cnTracks('centerblock__title')}>{title}</h2>
        {showFilter && <Filter />}
        { isLoading && <p>Loading...</p>}
        { isError && <p>Error</p>}
        { data && <TrackList tracks={data} />}
      </div>
      {showSidebar && <Sidebar />}
    </div>
  ) 
}
