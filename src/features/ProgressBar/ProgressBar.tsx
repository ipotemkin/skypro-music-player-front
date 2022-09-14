import { FC } from "react"

import { cnProgressBar } from './ProgressBar.classname'
import './ProgressBar.css'


type ProgressBarProps = {
    value: number
}

export const ProgressBar: FC<ProgressBarProps> = ({ value = 0 }) => {
    return (
        <div className={cnProgressBar()}>
            <div className={cnProgressBar('gauge')} style={{ width: `${value}%` }}></div>
        </div>
    )
}
