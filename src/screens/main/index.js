import React, { Component } from 'react';
import './styles.css'
import Main from '../../../components/main';

import {subMenu_products} from '../../../services/data/subMenu'

class ListProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            submenuData:subMenu_products
        }
    }
    render() {
        const submenuData = this.state.submenuData
        return (
            <div style={{ width: '100%' }}>
                {/* <NavTop submenu={submenuData} /> */}
                <main className='content'>
                    <Main />
                </main>
            </div>
        )
    }
}

export default ListProduct
