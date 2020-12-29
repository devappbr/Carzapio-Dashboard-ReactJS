import React, { Component } from 'react';

import './styles.css';
import Button from '../button';
import ButtonInverted from '../button';
import Select from '../dropdown';
import { baseLocal } from '../../services/apiRest/conn'
import { getCategories} from '../../services/apiRest/categories'
import { getProducts} from '../../services/apiRest/products'
import axios from 'axios'
import { getStatus } from '../../services/apiRest/status';

export default class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataCategories: [],
      dataStatus:[],
      selectedStatus:null,
      selectedNameStatus: 'Selecione uma opção1',
      selectedCategorie: null,
      selectedName: 'Selecione uma opção1',
      user: {},
      form: [{
        sku: '',
        product: '',
        categorie: '',
        promotional: '',
        description: '',
        price: '',
        status: '',
      }],
      errors: {
        sku: '',
        product: '',
        categorie: '',
        promotional: '',
        description: '',
        price: '',
        status: '',
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
      this._getDataCategories()
      this._getDataStatus()

    } else {
      this.props.history.push("signin")
    }
  }

  _getDataCategories = async () => {
    const authPassed = { headers: { "Authorization": `Bearer ${this.state.user}` } }
    try {
      axios.all([
        await axios.get(`${baseLocal}${getCategories}`, authPassed),
      ]).then(axios.spread((storesRes, categoriesRes) => {
        this.setState({ dataCategories: storesRes.data })
      }))
    } catch (err) {
      alert('Erro ao buscar categorias');

    }
  }

  _getDataStatus= async () => {
    const authPassed = { headers: { "Authorization": `Bearer ${this.state.user}` } }
    try {
      axios.all([
        await axios.get(`${baseLocal}${getStatus}`, authPassed),
      ]).then(axios.spread((storesRes, categoriesRes) => {
        this.setState({ dataStatus: storesRes.data })
      }))
    } catch (err) {
      alert('Erro ao buscar categorias');

    }
  }

  _postData = async () => {
    try {
      const authPassed = { headers: { "Authorization": `Bearer ${this.state.user}` } }
      await axios.post(`${baseLocal}${getProducts}`, {
        
        sku:this.state.sku,
        name: this.state.name,
        icon: null,
        description: this.state.description,
        price: this.state.price,
        id_stores: 5,
        id_categories: 3
          
          // "sku": "1",
          // "name": "Combinado Califórnia",
          // "icon": "null",
          // "description": "Alga Nori, salmão em cubos, gergelim e cebolinha",
          // "price": "37.90",
          // "id_stores": "5",
          // "id_categories": "3"
      
      }, authPassed)
      alert(`O Produto ${this.state.form.product} foi salvo com sucesso!`);
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
    const { product, categorie, description, price, status } = this.state
    if (!product || product.length < 3) {
      this.setState({ errors: { product: 'Produto não pode ser menor que 3 caracteres' } })
    }
    // if (!categorie || categorie.length < 1) {
    //   this.setState({ errors:{categorie: 'Selecione uma categoria'} })
    // }
    else if (!description || description.length < 3) {
      this.setState({ errors: { description: 'Digite uma descrição maior que 3 caracteres' } })
    }
    else if (!price || price.length < 1) {
      this.setState({ errors: { price: 'Digite o preço' } })
    }
    // if (!status || status.length < 1) {
    //   this.setState({ errors:{status:'Selecione um status' } })
    // }
    else {
      this._postProduct()
      // alert(`O Produto ${this.state.product} foi salvo com sucesso!`);
      this.setState({
        sku: '',
        product: '',
        categorie: null,
        description: '',
        promotional: '',
        price: '',
        selectedCategorie: null,
        selectedName: 'Selecione uma opção',
        status: '',
        errors: {
          sku: '',
          product: '',
          categorie: '',
          promotional: '',
          description: '',
          price: '',
          status: '',
        }
      })
    }
  }


  render() {
    const { product, dataCategories, sku, description, price, promotional } = this.state
    const { errors } = this.state
    return (
      <div className='formContainer'>
        <div className='formHeader'>
          <h3>{this.props.title}</h3>
          <h3>{this.state.sku}</h3>

        </div>
        {/* <form onSubmit={this.handleSubmit}> */}
        <div className='formContent' >
          <table>
            <tr>
              <th>SKU</th>
              <th>PRODUTO</th>
              <th>CATEGORIA</th>
            </tr>
            <tr>
              <td style={{ width: '15%' }}><input type="text" name='sku' value={this.state.sku} onChange={this.handleChange} /></td>
              <td> <input type="text" name='product' value={product} onChange={this.handleChange} /></td>
              <td>
                <Select
                  options={this.state.dataCategories}
                  onClick={(id, name) => this.setState({ selectedCategorie: id, selectedName: name })}
                  value={this.state.selectedName}
                />
              </td>
            </tr>
            <tr>
              <td><span style={{ color: "red" }}>{errors.sku}</span></td>
              <td><span style={{ color: "red" }}>{errors.product}</span></td>
              {/* <td><span style={{ color: "red" }}>{errors.categorie}</span></td> */}
            </tr>
          </table>
        </div>
        <div className='formContent' >
          <table>
            <tr>
              <th>DESCRIÇÃO DO PRODUTO</th>
            </tr>
            <tr>
              <td ><textarea name='description' onChange={this.handleChange} value={description}></textarea></td>
            </tr>
            <tr>
              <td><span style={{ color: "red" }}>{errors.description}</span></td>
            </tr>
          </table>
        </div>
        <div className='formContent' >
          <table>
            <tr>
              <th>PREÇO</th>
              <th>PROMOCIONAL</th>
              <th>STATUS</th>
            </tr>
            <tr>
              <td> <input type="text" name='price' value={price} onChange={this.handleChange} /></td>
              <td> <input type="text" name='promotional' value={promotional} onChange={this.handleChange} /></td>
              <td>
                <Select
                  options={this.state.dataStatus}
                  onClick={(id, name) => this.setState({ selectedStatus: id, selectedNameStatus: name })}
                  value={this.state.selectedNameStatus}
                />
              </td>
            </tr>
            <tr>
              <td><span style={{ color: "red" }}>{errors.price}</span></td>
              <td><span style={{ color: "red" }}>{errors.promotional}</span></td>
              {/* <td><span style={{ color: "red" }}>{errors.status}</span></td> */}
            </tr>
          </table>
        </div>
        <div className='formContent' style={{ marginTop: 50 }}>
          <table>
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