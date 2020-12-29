import React from 'react';
import './styles.css';

class Select extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayMenu: false,
            selected: null,
        };

        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

    };

    showDropdownMenu(event) {
        event.preventDefault();
        this.setState({ displayMenu: true}, () => {
            document.addEventListener('click', this.hideDropdownMenu);
        });
    }

    hideDropdownMenu() {
        this.setState({ displayMenu: false }, () => {
            document.removeEventListener('click', this.hideDropdownMenu);
        });

    }


    render() {
        return (
            <div className="dropdown" >
                <div className="button" onClick={this.showDropdownMenu}>{this.props.value}</div>

                {this.state.displayMenu ? (
                    <ul>
                        {this.props.options.map(o => {
                            const { name, id } = o                            
                            return (
                                <li onClick={()=>this.props.onClick(id, name)}>{name}</li>
                            )
                        })}
                    </ul>
                ) :
                    (
                        null
                    )
                }

            </div>

        );
    }
}

export default Select;