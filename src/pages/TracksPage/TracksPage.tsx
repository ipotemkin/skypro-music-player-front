import { useFilteredTracks } from '../../hooks/trackHooks'
import { Tracks } from '../../components/Tracks/Tracks'

import '../../index.css'
    
export const TracksPage = () => <div className="center">
  <Tracks title="Треки" showFilter tracksHook={useFilteredTracks}/>
</div>
