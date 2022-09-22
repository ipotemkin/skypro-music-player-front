import { useFilteredTracks } from '../../features/Tracks/hooks'
import { Tracks } from '../../features/Tracks/Tracks'
    
export const TracksPage = () => <Tracks title="Треки" showFilter hook={useFilteredTracks}/>
