import React from 'react'

function AlertModal(props) {
  return (
    <div>
      <a className="modal-trigger" href="#!" />
      <div id="modal1" className="modal">
        <div className="modal-content">
          <h5>reset current game to change options</h5>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-close waves-effect waves-green btn-flat">CANCEL</a>
          <a href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={props.reset} >RESET</a >
        </div>
      </div>
    </div>
  )
}

export default AlertModal
