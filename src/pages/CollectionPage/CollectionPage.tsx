import { useParams } from "react-router-dom";
import { useCollection } from "../../hooks/trackHooks"
import { Tracks } from "../../components/Tracks/Tracks"

import '../../index.css'

export const Collection = () => {
  const { id } = useParams()
  const idx = Number(id) || 1
  const { name } = useCollection('', idx)

  return <div className="center">
    <Tracks title={name} tracksHook={useCollection} collectionId={idx}/>
  </div>
}
