import { useFavoriteTracks } from "../../features/Tracks/hooks"
import { Tracks } from "../../features/Tracks/Tracks"
      
export const Playlist = () => <Tracks title="Мой плейлист" hook={useFavoriteTracks}/>
