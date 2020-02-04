import React, { Component } from 'react';

interface MyProps {
    name: string,
    image: string,
    description: string,
    counter: number
}

interface MyState {
    counter: number
}

class MenuItem extends Component<MyProps, MyState> {


    render() {
        return (
            <div className="menu__item">
                <span className="menu__item__name">{this.props.name}</span>
                <span className="menu__item__counter">{this.props.counter}</span>
                <br />
                <br />
                <span className="menu__item__description">{this.props.description}</span>
            </div>
        )
    }
}


export default MenuItem