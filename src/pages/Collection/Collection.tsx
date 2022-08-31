import { useParams } from "react-router-dom";
import { useCollection } from "../../features/Tracks/hooks"
import { Tracks } from "../../features/Tracks/Tracks"
      
export const Collection = () => {
    const { id } = useParams()
    const idx = Number(id) || 1
    const { name } = useCollection('', idx)

    return <Tracks title={name} hook={useCollection} collectionId={idx}/>
}
