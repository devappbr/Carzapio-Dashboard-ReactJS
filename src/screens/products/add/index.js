import React, { Component } from 'react';
import './styles.css'
import Form from '../../../components/form'
import {subMenu_products} from '../../../services/data/subMenu'


class AddProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            submenuData:subMenu_products
        }
    }
    render() {
        return (
            <div style={{ width: '100%', }}>
                {/* <NavTop submenu={submenuData} /> */}
                <main className='content'>
                    <Form
                        title='CADASTRO DE PRODUTOS'
                        onClick={this.props.onClick}
                        value={this.props.value}
                        nameSave={this.props.nameSave}
                        nameCancel={this.props.nameCancel}    
                    />
                </main>
            </div>
        )
    }
}

export default AddProduct
