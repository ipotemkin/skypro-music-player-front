import { useFavoriteTracks } from "../../components/Tracks/hooks"
import { Tracks } from "../../components/Tracks/Tracks"
      
export const PlaylistPage = () => <Tracks title="Мой плейлист" tracksHook={useFavoriteTracks}/>
