import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './styles.css';

export default class NavTop extends Component {

  _renderSubMenu() {
    return (
      this.props.submenu.map(i =>
        <ul>
          <Link to={i.link}>
            <li><h4>{i.sub}</h4></li>
          </Link>
        </ul>
      )
    )
  }

  render() {
    return (
      <nav className='navTop'>
        {this._renderSubMenu()}
      </nav>
    )
  }
}