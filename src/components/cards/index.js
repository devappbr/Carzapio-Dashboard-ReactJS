import React, { Component } from 'react';

import './styles.css';

export default class Cards extends Component {
  render() {
    return (
      <div className='cardContainer'>
        <div className='cardHeader'>
          <h2>{this.props.title}</h2>
        </div>
        <div className='cardContent'>
          <div>
            <h1>{this.props.content}</h1>
          </div>
          <div>
            <h2>Gráfico</h2>
          </div>
        </div>
        <div className='cardFooter'>
          <h5>{this.props.footer}</h5>
        </div>
      </div>
    )
  }
}
