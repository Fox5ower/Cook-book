import React, { Component } from 'react';
import { Link } from 'react-router-dom';

interface MyProps {
    _id: string,
    name: string,
    category: string,
    method: string,
    description: string,
    engreediants: Array<string>,
    image: string,
    counter: number
}


class MenuItem extends Component<MyProps> {


    render() {
        return (
            <Link to={`/dishes/${this.props._id}`} className="menu__item">
                <span className="menu__item__name">{this.props.name}</span>
                <span className="menu__item__counter">{this.props.counter}</span>
                <br />
                <span className="menu__item__description">{this.props.description}</span>
            </Link>

        )
    }
}


export default MenuItem