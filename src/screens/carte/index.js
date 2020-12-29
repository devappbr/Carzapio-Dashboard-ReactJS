import React, { Component } from 'react';
import './styles.css'
import CarteView from '../../components/carteview';
import { subMenu_products } from '../../services/data/subMenu'
import Modal from '../../components/modal';
import AddProduct from '../products/add/'
import axios from 'axios'
import {baseLocal} from '../../services/apiRest/conn' 
import {getProducts} from '../../services/apiRest/products'



class ListCarte extends Component {
    constructor(props) {
        super(props)
        this.state = {
            submenuData: subMenu_products,
            isOpen: false,
            products:[]
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
                    this.setState({ products: storesRes.data });
                })) 
            } catch (err) {
                alert('Erro ao buscar estabelecimentos');
            }
        }


    toggleModal(e) {
        this.setState({ isOpen:e })
    }
    render() {
        const { isOpen } = this.state
        return (
            <div style={{ width: '100%' }}>
                {/* <NavTop
                    submenu={submenuData}
                /> */}
                {this.state.products.length > 0 ?

                    <main className='contentCarte'>
                        <CarteView
                            title='MEU CARDÁPIO'
                            data={this.state.products}
                            placeholderSearch={'Buscar...'}
                            openModal={() => this.toggleModal(!isOpen)}
                        />
                    </main>
                    : null}
                <Modal
                    isOpen={this.state.isOpen}
                >
                    {this.state.name}
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

export default ListCarte
