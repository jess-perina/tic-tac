import React from 'react';

const  PlayerModeButton = ({player, setSinglePlayer, setTwoPlayer}) => {
  return (
    <div className="player-mode mode-btn ">
      <span className="card-title">Change Player Mode</span>
      <a className="dropdown-trigger btn" href="#!" data-target="player-mode">{player}</a>
      <ul id="player-mode" className="dropdown-content">
        <li onClick={setSinglePlayer}>
          <a href="#!">Single Player</a>
        </li>
        <li onClick={setTwoPlayer}>
          <a href="#!">Two Player</a>
        </li>
      </ul>
    </div>
  )
}

export default PlayerModeButton
