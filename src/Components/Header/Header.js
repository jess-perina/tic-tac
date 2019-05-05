import React from 'react'

const Header = () => {
  return (
    <nav>
      <div className="nav-wrapper red darken-4">
        <a href="#!" className="brand-logo center">Tic-Tac-Toe</a>
        <a
          data-target="modal2"
          className="btn-floating halfway-fab waves-effect waves-light deep-orange accent-3 modal-trigger"
          href="#modal2">
          <i className="material-icons">info_outline</i>
        </a>
      </div>
    </nav>
  )
}

export default Header
