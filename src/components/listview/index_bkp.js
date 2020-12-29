import React, { Component } from 'react';

import './styles.css';
import { data_products } from '../../services/data/products'


const initialData = data_products

export default class ListView extends Component {


  constructor(props) {
    super(props)
    this.state = {
      data: data_products,
    }
    this._handlerChange = this._handlerChange.bind(this);
  }

  _handlerFind = (text) => {
    const { data } = this.state
    const searchLower = text.toString().trim().toLowerCase().normalize('NFD').replace(/([\u0300-\u036f\s*$]|[^0-9a-zA-Z\s*$])/g, '')
    const dataLower = data
    const result = dataLower.filter(r => r.product.toLowerCase().normalize('NFD').replace(/([\u0300-\u036f\s*$]|[^0-9a-zA-Z\s\s*$])/g, '').includes(searchLower))

    // alert(JSON.stringify(result));
    this.setState({ data: result })
  }

  _handlerChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    // this.setState({ [name]: value })
    if (value.length > 2) {
      this._handlerFind(value)
    } else {
      this.setState({ data: initialData })
    }

  }

  _renderList() {
    const list = this.state.data.map(l => {
      return (
        <tr>
          <td>{l.sku}</td>
          <td >{l.product}</td>
          <td>{l.categorie}</td>
          <td>{l.description}</td>
          <td>{l.price}</td>
          <td><div className='statusAtivo'>{l.status}</div></td>
          <td>
            <span>Editar</span>
            <span> / </span>
            <span>Excluir</span></td>
        </tr>
      )

    })
    return list
  }

  render() {
    return (
      <div className='listViewContainer'>
        <div className='listViewHeader'>
          <div className='listViewHeaderLeft'>
            <h3>{this.props.title}</h3>
          </div>
          <div className='listViewHeaderCenter'>
            <input type='text' className='searchForm' name='search' placeholder='Procurar' onChange={this._handlerChange} />
          </div>
          <div className='listViewHeaderRight'>
            <div className='statusAtivo'>Ativo</div>
            <div className='statusInativo'>Inativo</div>
            <div className='statusLixo' >Lixo</div>
          </div>
        </div>
        <div className='listViewContent' >
          <table cellspacing="0">
            <tr>
              <th>SKU</th>
              <th>PRODUTO</th>
              <th>CATEGORIA</th>
              <th>DESCRIÇÃO</th>
              <th>VALOR UNIT</th>
              <th>STATUS</th>
              <th>FUNÇÕES</th>
            </tr>
            {this._renderList()}
          </table>
        </div>
        <div className='listViewFooter'>
          <h5>{this.props.footer}</h5>
        </div>
      </div>
    )
  }
}
