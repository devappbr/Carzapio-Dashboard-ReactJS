import React, { Component } from 'react';
import './styles.css'
import Cards from '../cards'

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    render() {
        return (
            <div style={{ width: '100%' }}>
                {/* <NavTop submenu={submenuData} /> */}
                <main className='content'>
                    <Cards title='Vendas do dia' content='43' footer='AS VENDAS AUMENTARAM 23% EM RELAÇÃO A ONTEM'/>
                    <Cards />
                    <Cards />
                    {/* <ListView  title='LISTAGEM DE PRODUTOS'/> */}
                    {/* <Form title='CADASTRO DE PRODUTOS'/> */}
                </main>
            </div>
        )
    }
}

export default Main
