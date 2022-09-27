import { useFavoriteTracks } from "../../hooks/trackHooks"
import { Tracks } from "../../components/Tracks/Tracks"
      
export const PlaylistPage = () => <Tracks title="Мой плейлист" tracksHook={useFavoriteTracks}/>
