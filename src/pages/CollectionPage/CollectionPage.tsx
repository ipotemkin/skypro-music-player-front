import { useParams } from "react-router-dom";
import { useCollection } from "../../components/Tracks/hooks"
import { Tracks } from "../../components/Tracks/Tracks"
      
export const Collection = () => {
    const { id } = useParams()
    const idx = Number(id) || 1
    const { name } = useCollection('', idx)

    return <Tracks title={name} tracksHook={useCollection} collectionId={idx}/>
}
