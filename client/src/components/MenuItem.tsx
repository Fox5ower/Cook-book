import React, { Component } from 'react';

interface MyProps {
    _id: string,
    name: string,
    category: string,
    method: string,
    description: string,
    engreediants: Array<string>,
    image: string,
    toggleSlider: Function,
    setIndex: Function,
    counter: number
}


class MenuItem extends Component<MyProps> {

    dynamicBackground = {
        backgroundImage: "url(" + this.props.image + ")"
    }

    render() {
        return (
            <div onClick={() => { this.props.toggleSlider(); this.props.setIndex(this.props.counter) }} className="menu__item" style={this.dynamicBackground}>
                <div className="memu__item__head-container">
                    <span className="menu__item__name">{this.props.name}</span>
                    <span className="menu__item__counter">{this.props.counter}</span>
                </div>
                <br />
                <hr />
                <span className="menu__item__description">{this.props.description}</span>
            </div>
        )
    }
}


export default MenuItem