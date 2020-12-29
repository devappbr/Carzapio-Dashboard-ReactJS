import React, { Component } from 'react';
import { Link } from 'react-router-dom'


import './styles.css'

class Menu extends Component {
    render() {
        return (
            <nav className='menu'>
                <ul>
                    <section>
                        <h3>operacional</h3>
                        <ul>
                            <Link to="/carte">
                                <li><h4>meu Cardápio</h4></li>
                            </Link>
                            <Link to="/orders/">
                            <li><h4>ordens</h4></li>
                            </Link>
                            <Link to="/categories/">
                                <li><h4>categorias</h4></li>
                            </Link>
                            <Link to="/ingredients/">
                                <li><h4>ingredientes</h4></li>
                            </Link>
                            <Link to="/groupingredients/">
                                <li><h4>Grupo de Ingredientes</h4></li>
                            </Link>
                            <Link to="/products/">
                                <li><h4>produtos</h4></li>
                            </Link>
                        </ul>
                    </section>


                    <section>
                        <h3>gerencial</h3>
                        <ul>
                            <li><h4>relatorios</h4></li>
                            <li><h4>i.a suggestions</h4></li>
                            <li><h4>i.a analytics</h4></li>
                            <li><h4>i.a insights</h4></li>
                            <li><h4>push notifications</h4></li>
                            <li><h4>geolocation</h4></li>
                        </ul>
                    </section>
                </ul>
            </nav>
        )
    }
}

export default Menu
