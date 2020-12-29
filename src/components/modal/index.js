import React, { Component } from 'react'
import './styles.css'

export default class Modal extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }

        this.renderModal = this.renderModal.bind(this)
    }

    renderModal() {
        // <AddProduct />
    }

    render() {
        const { children } = this.props
        return (
            <div>
                {this.props.isOpen ?
                    <div className='container'>
                        <div className='modal'>
                                {children}
                        </div>
                    </div>
                    : null}
            </div>
        )
    }
}
