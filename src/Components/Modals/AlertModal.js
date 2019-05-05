import React from 'react'

const AlertModal = ({ reset }) => {
  return (
    <div>
      <div id="modal1" className="modal">
        <div className="modal-content">
          <h5>reset current game to change options</h5>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-close waves-effect waves-green btn-flat">CANCEL</a>
          <a href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={reset} >RESET</a>
        </div>
      </div>

      <div id="modal2" className="modal">
        <div className="modal-content">
          <h5>Game Rules</h5>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-close waves-effect waves-green btn-flat">OK</a>
        </div>
      </div>
    </div>
  )
}

export default AlertModal
