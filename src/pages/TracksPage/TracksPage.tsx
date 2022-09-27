import { useFilteredTracks } from '../../components/Tracks/hooks'
import { Tracks } from '../../components/Tracks/Tracks'
    
export const TracksPage = () => <Tracks title="Треки" showFilter tracksHook={useFilteredTracks}/>
