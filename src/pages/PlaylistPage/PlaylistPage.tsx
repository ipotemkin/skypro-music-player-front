import { useFavoriteTracks } from "../../hooks/trackHooks"
import { Tracks } from "../../components/Tracks/Tracks"

import '../../index.css'

export const PlaylistPage = () => <div className="center">
  <Tracks title="Мой плейлист" tracksHook={useFavoriteTracks}/>
</div>
