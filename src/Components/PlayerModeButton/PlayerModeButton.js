import React from 'react';

function PlayerModeButton(props) {
  return (
    <div className="player-mode mode-btn">
      <span className="card-title">Change Player Mode</span>
      <a className="dropdown-trigger btn" href="#" data-target="player-mode">{props.player}</a>
      <ul id="player-mode" className="dropdown-content">
        <li onClick={props.setSinglePlayer}>
          <a href="#!">Single Player</a>
        </li>
        <li onClick={props.setTwoPlayer}>
          <a href="#!">Two Player</a>
        </li>
      </ul>
    </div>
  )
}

export default PlayerModeButton
