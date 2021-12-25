import React from 'react'
import ReactDOM from 'react-dom'

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClick}></div>
}
const ModalOverlay = (props) => {
  return (
    <div className="modal">
      <div className="content">{props.children}</div>
    </div>
  )
}
const portalElement = document.getElementById('overlays')
export default function Modal(props) {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </React.Fragment>
  )
}
