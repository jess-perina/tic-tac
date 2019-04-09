import React, { Component } from 'react'
import M from 'materialize-css';

export default class WhoStartsButton extends Component {
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
      <div className="mode-btn">
        <span className="card-title">Who Starts</span>
        <a className="dropdown-trigger btn" href="#" data-target="start-toggle">{this.props.starts}</a>
        <ul id="start-toggle" className="dropdown-content">
          <li onClick={this.props.setHumanStart}>
            <a href="#!">You</a>
          </li>
          <li onClick={this.props.setComputerStart}>
            <a href="#!">Computer</a>
          </li>
        </ul>
      </div>
    )
  }
}
