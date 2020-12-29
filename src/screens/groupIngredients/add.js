import React, { Component } from 'react';

import './styleAdd.css';
import Button from '../../components/button';
import ButtonInverted from '../../components/button';
import { baseLocal } from '../../services/apiRest/conn'
import axios from 'axios'
import { getGroupIngredients } from '../../services/apiRest/ingredients';

export default class AddGroupIngredients extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',

      errors: {
        name: ''
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = async () => {
    const json = await localStorage.getItem('@selfood/data')
    const tokenUser = JSON.parse(json) || {}
    if (tokenUser) {
      axios.defaults.headers.common['Authorization']
        = `bearer ${tokenUser}`
      this.setState({ user: tokenUser })

    } else {
      this.props.history.push("signin")
    }
  }

  _postProduct = async () => {
    try {
      const authPassed = { headers: { "Authorization": `Bearer ${this.state.user}` } }
      await axios.post(`${baseLocal}${getGroupIngredients}`, {
        name: this.state.name,
      }, authPassed)
      alert(`O grupo ${this.state.name} foi salvo com sucesso!`);
      this.setState({
        name: null,
        errors: {
          name: ''
        }
      })

    } catch (err) {
      console.log(err.response.data)
      // console.log(this.state.chave)
      alert(
        JSON.stringify(`Problemas ao incluir produto: ${err.response.data.msg}`)
      )
    }
  }


  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value })
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name } = this.state
    if (!name || name.length < 3) {
      this.setState({ errors: { name: 'Nome do grupo não pode ser menor que 3 caracteres' } })
    }
    else {
      this._postProduct()
      // alert(`O Produto ${this.state.product} foi salvo com sucesso!`);
    }
  }


  render() {
    const { errors } = this.state
    return (
      <div className='formContainer'>
        <div className='formHeader'>
          <h3>{this.props.title}</h3>
        </div>
        {/* <form onSubmit={this.handleSubmit}> */}
        <div className='formContent' >
          <table>
            <tr>
              <th>NOME DO GRUPO</th>
            </tr>
            <tr>
              <td style={{ width: '15%' }}><input type="text" name='name' value={this.state.name} onChange={this.handleChange} /></td>
              <td>{errors.name}</td>
            </tr>
            <tr>
              <td><Button name='cancel' onClick={this.props.onClick} value={'Cancelar'} /></td>
              <td><ButtonInverted onClick={this.handleSubmit} value={'Salvar'} /></td>
            </tr>
          </table>
        </div>
        {/* </form> */}
        <div className='formFooter'>
          <h5>{this.props.footer}</h5>
        </div>
      </div>
    )
  }
}