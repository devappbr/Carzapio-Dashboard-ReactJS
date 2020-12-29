import React, { Component } from 'react';

import './styles.css';

export default class ListView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,

    }
    this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
    this.getKeys = this.getKeys.bind(this);
    this._handlerChange = this._handlerChange.bind(this);
  }


  // componentDidMount() {
  //   this.setState({ data: this.props.data })
  // }

  _handlerFind = (text) => {
    const { data } = this.state
    const searchLower = text.toString().trim().toLowerCase().normalize('NFD').replace(/([\u0300-\u036f\s*$]|[^0-9a-zA-Z\s*$])/g, '')
    const result = data.filter(r => r.name.toLowerCase().normalize('NFD').replace(/([\u0300-\u036f\s*$]|[^0-9a-zA-Z\s\s*$])/g, '').includes(searchLower))
    this.setState({ data: result })
    console.log(result)
  }

  async _handlerChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // this.setState({ [name]: value })
    if (value.length > 2) {
      await this._handlerFind(value)
    } else {
      await this.setState({ data: this.props.data })
    }
  }

  getKeys = () => {
    if (this.state.data.length > 0) {
      return Object.keys(this.state.data[0]);
    } else {
      return null
    }
  }

  getHeader = () => {
    var keys = this.getKeys();
    if (this.state.data.length > 0) {
      return keys.map((key, index) => {
        return <th key={key}>{key.toUpperCase()}</th>
      })
    } else {
      return null
    }
  }


  getRowsData = () => {
    
    var items = this.state.data;
    var keys = this.getKeys();
    if (this.state.data.length > 0) {
      return items.map((row, index) => {
        return (
          <tr key={index}><RenderRow key={index} data={row} keys={keys} />
            <td><span onClick={()=> alert(row.id)}>Editar</span><span onClick={()=> this._handlerDel(row.id)}> Excluir</span></td>
          </tr>
        )
      })
    } else {
      return null
    }

  }

  // _renderColumn() {
  //   const column = this.props.column.map(column => {
  //     return (
  //       <th>{column}</th>
  //     )
  //   })
  //   return column
  // }

  render() {
    return (
      <div className='listViewContainer'>
        <div className='listViewHeader'>
          <div className='listViewHeaderLeft'>
            <h3>{this.props.title}</h3>
          </div>
          <div className='listViewHeaderCenter'>
            <input type='text' className='searchForm' name='search' placeholder={this.props.placeholderSearch} onChange={this._handlerChange} />
          </div>
          <div className='listViewHeaderRight'>
            <button onClick={this.props.openModal} className='newProduct'>
              Novo produto
              </button>
          </div>
        </div>
        <div className='listViewContent' >
          <table cellspacing="0">
            <tr>
              {this.getHeader()}
            </tr>
            {this.getRowsData()}
          </table>
        </div>
        <div className='listViewFooter'>
          <h5>{this.props.footer}</h5>
        </div>
      </div>
    )
  }
}
const RenderRow = (props) => {
  return props.keys.map((key, index) => {
    return (
      <td key={props.data[key]}>{props.data[key]}</td>
    )
  })
}