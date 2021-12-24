import React from 'react'

export default function Popover(props) {
    const { top, left, show } = props
    const display = show ? "block" : "none"
    return <button style={{
        top: top, left: left,
        height: '15px', width: '15px',
        backgroundColor: 'red',
        position: "absolute", display: display
    }}
    />
}
