import React, { Component } from 'react';

import './styles.css';

class Button extends Component {
  
  render() {
    return (
      <div className='btn' style={{display:'flex', justifyContent:'center', alignItems:'flex-start', alignContent:'flex-start'}}>
          <button onClick={this.props.onClick}>{this.props.value}</button>
      </div>
    )
  }
}

// class ButtonInverted extends Component {
//   render() {
//     return (
//       <div style={{display:'flex', justifyContent:'center', alignItems:'flex-start', alignContent:'flex-start'}}>
//           <input name='Cancelar' type={this.props.type} value={this.props.value} />
//       </div>
//     )
//   }
// }

export default Button