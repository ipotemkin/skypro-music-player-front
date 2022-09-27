import { useFilteredTracks } from '../../hooks/trackHooks'
import { Tracks } from '../../components/Tracks/Tracks'
    
export const TracksPage = () => <Tracks title="Треки" showFilter tracksHook={useFilteredTracks}/>
