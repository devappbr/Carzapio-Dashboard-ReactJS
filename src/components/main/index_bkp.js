import React, { Component } from 'react';
import './styles.css'
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

import NavTop from '../navtop';


const data = {
    labels: [
        'Red',
        'Green',
        'Yellow'
    ],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]
};


class Content extends Component {
    constructor(props){
        super(props)
        this.state={
            submenuData: [
               
              ]
        }
    }
    render(){
        const submenuData = this.state.submenuData
        return (
            <div style={{ width: '100%' }}>
                <NavTop submenu={submenuData} />
                <main className='content'>
                <article>
                    <h2>visitas de hoje</h2>
                    <Link to="/products">
                    <div className='contentCard'>
                        <div>
                            <h1>40</h1>
                        </div>
                        <div >
                            <Doughnut data={data} legend={false} width={100} height={100} options={{ maintainAspectRatio: false }} />
                        </div>
                    </div>
                    <h5>62% maior que na última semana</h5>
                    </Link>
                </article>
                
                
                <article>
                    <h2>visitas de hoje</h2>
                    <Link className='content' to="/products">
                    <div className='contentCard'>
                        <div>
                            <Bar
                                data={data}
                                width={300}
                                height={100}
                                legend={false}
                                options={{ maintainAspectRatio: false }}
                            />  
                        </div>
                    </div>
                    </Link>
                </article>
                <article>
                    <h2>visitas de hoje</h2>
                    <Link className='content' to="/products">
                    <div className='contentCard'>
                        <div>
                            <Line
                                data={data}
                                width={300}
                                height={100}
                                legend={false}
                                options={{ maintainAspectRatio: false }}
                            />
                        </div>
                    </div>
                    <h5>62% maior que na última semana</h5>
                    </Link>
                </article>
            </main>
            </div>
        )
    }
}

export default Content
