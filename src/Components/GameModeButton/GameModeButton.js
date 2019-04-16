import React, { Component } from 'react'
import M from 'materialize-css';

export default class GameModeButton extends Component {
  componentDidMount() {
    let dropdown = document.querySelectorAll('.dropdown-trigger')
    let options = {
      inDuration: 300,
        outDuration: 300,
        hover: true, // Activate on hover
        coverTrigger: false
    }
    M.Dropdown.init(dropdown, options)
    // M.AutoInit()
  }

  render() {
    return (
      <div>
        <span className="card-title">Change Game Mode</span>
        <a className="dropdown-trigger btn" href="#!" data-target="practice-toggle">{this.props.practiceMode}</a>
        <ul id="practice-toggle" className="dropdown-content">
          <li onClick={this.props.setPractice}>
            <a href="#!">Practice</a>
          </li>
          <li onClick={this.props.setSerious}>
            <a href="#!">Serious</a>
          </li>
        </ul>
      </div>
    )
  }
}
