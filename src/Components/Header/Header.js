import React from 'react'

function Header() {
  return (
    <nav>
      <div className="nav-wrapper">
        <a href="#!" className="brand-logo center">Tic-Tac-Toe</a>
        <a data-target="modal2" className="btn-floating halfway-fab waves-effect waves-light red modal-trigger" href="#modal2"><i className="material-icons">info_outline</i></a>
      </div>
    </nav>
  )
}

export default Header
