import React, { Component } from 'react';

import './styles.css';

export default class CarteView extends Component {


  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
    // this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
    this.getKeys = this.getKeys.bind(this);
    this._handlerChange = this._handlerChange.bind(this);
  }

  componentWillMount() {
    this.setState({ data: this.props.data })
  }

  _handlerFind = (text) => {
    const { data } = this.state
    const searchLower = text.toString().trim().toLowerCase().normalize('NFD').replace(/([\u0300-\u036f\s*$]|[^0-9a-zA-Z\s*$])/g, '')
    const result = data.filter(r => r.name.toLowerCase().normalize('NFD').replace(/([\u0300-\u036f\s*$]|[^0-9a-zA-Z\s\s*$])/g, '').includes(searchLower))
    this.setState({ data: result })
  }

  _handlerChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // this.setState({ [name]: value })
    if (value.length > 2) {
      this._handlerFind(value)
    } else {
      this.setState({ data: this.props.data })
    }
  }

  getKeys = () => {
    return Object.keys(this.state.data[0]);
  }

  getRowsData = () => {
    var items = this.state.data;
    return items.map(i => {
      return (
        <div className='carteViewContent' key={i.id}>
          <div className='carteViewLeft'>
            <img alt={i.id} src='https://img.stpu.com.br/?img=https://s3.amazonaws.com/pu-mgr/default/a0R0f00000xDjmoEAC/5ac7747ae4b083d15f072073.jpg&w=710&h=462'></img>
          </div>
          <div className='carteViewCenter'>
            <span><h2>{i.name}</h2></span>
            <span><h3>{i.categorie}</h3></span>
            <span><h4>{i.description}</h4></span>
            <span><h2 style={{ marginTop: 10 }}>R$ {i.price.toFixed(2)}</h2></span>
          </div>
          <div className='carteViewContentTools'>
          <div className='carteViewRight'>
            <div className='statusAtivo'>
              <span>Ativo</span>
            </div>
            <div className='statusLixo'>
              <span>com destaque</span>
            </div>
          </div>
          <div className='carteViewRight'>
            <div className='btnTools'>
              <span>editar</span>
            </div>
            <div className='btnTools'>
              <span>remover</span>
            </div>
          </div>
          </div>
        </div>

      )
    })
  }

  render() {
    return (
      <div className='carteViewContainer'>
        <div className='carteViewHeader'>
          <div className='carteViewHeaderLeft'>
            <h3>{this.props.title}</h3>
          </div>
          <div className='carteViewHeaderCenter'>
            <input type='text' className='searchForm' name='search' placeholder={this.props.placeholderSearch} onChange={this._handlerChange} />
          </div>
          <div className='carteViewHeaderRight'>
            <button onClick={this.props.openModal} className='newProduct'>
              Novo produto
            </button>
          </div>
        </div>
        {/* <div className='carteViewHeader'>
          <div className='carteViewHeaderLeft'>
            <h4>MOSTRAR</h4>
            <Select />
          </div>
          <div className='carteViewHeaderCenter'>
            <h4>Status</h4>
            <Select />
          </div>
          <div className='carteViewHeaderRight'>
            <h4>Destaques</h4>
            <Select />
          </div>
        </div> */}
        <div className='carteViewContent' style={{ borderBottom: 0 }} >
          <table cellspacing="0">
            <tr>
              {this.getRowsData()}
            </tr>
          </table>
        </div>
        <div className='carteViewFooter'>
          <h5>{this.props.footer}</h5>
        </div>
      </div>
    )
  }
}
