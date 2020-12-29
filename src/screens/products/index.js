import React, { Component } from 'react';
import './styles.css'
import ListView from '../../components/listview';
import { baseLocal } from '../../services/apiRest/conn'
import axios from 'axios'
import { subMenu_products } from '../../services/data/subMenu'
import Modal from '../../components/modal';
import AddProduct from '../products/add'
import { getProducts } from '../../services/apiRest/products';

class ListProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            submenuData: subMenu_products,
            isOpen: false,
            data: [],
            user: {}
        }
        this.toggleModal = this.toggleModal.bind(this)
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
        this._getData()
    }

    _getData = async () => {
        const authPassed = { headers: { "Authorization": `Bearer ${this.state.user}` } }
        try {
            // const res = await axios.get(`${baseLocal}${getStores}`, authPassed);
            axios.all([
                await axios.get(`${baseLocal}${getProducts}`, authPassed),
            ]).then(axios.spread((storesRes, categoriesRes) => {
                this.setState({ data: storesRes.data });
            }))
        } catch (err) {
            alert('Erro ao buscar estabelecimentos');
        }
    }

    toggleModal(e) {
        this.setState({ isOpen: e })
    }

    render() {
        const { isOpen } = this.state
        return (
            <div style={{ width: '100%' }}>

                {this.state.data.length > 0 ?
                    <main className='content'>
                        <ListView
                            title='LISTAGEM DE PRODUTOS'
                            data={this.state.data}
                            placeholderSearch={'Buscar...'}
                            openModal={() => this.toggleModal(!isOpen)}
                        />
                    </main>
                    : null}
                <Modal
                    isOpen={this.state.isOpen}
                >
                    <AddProduct
                        onClick={() => this.toggleModal(!isOpen)}
                        nameSave={'Salvar'}
                        nameCancel={'Cancelar'}
                    />
                </Modal>
            </div>
        )
    }
}

export default ListProduct
