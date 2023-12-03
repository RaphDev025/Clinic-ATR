import React from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'

const ToolTip = ({title, id, place}) => { 

    return (
        <ReactTooltip id={id} place={place} content={title} />
    )
}

export default ToolTip