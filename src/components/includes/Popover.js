import React from 'react'
import AddCommentIcon from '@mui/icons-material/AddComment'

export default function Popover(props) {
    const { top, left, show, handleAddTopic } = props
    const display = show ? "block" : "none"
    return <div style={{
        top: top, left: left,
        position: "absolute", display: display,
        cursor: "pointer"
    }}
        onClick={() => handleAddTopic()}
    >
        <AddCommentIcon color="success" sx={{ fontSize: 40 }} />
    </div>
}
