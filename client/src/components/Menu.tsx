import React, { Component } from 'react';
import axios from "axios";
import IDish from "../../../src/interfaces/IDish"
import MenuItem from "./MenuItem";

interface MyProps {
    dishes: Array<IDish>
}

interface MyState {
    dishes: Array<IDish>,
}


class Menu extends Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props)
        this.state = {
            dishes: []
        }
    }

    componentWillMount() {
        axios.get("http://localhost:3001/dishes")
            .then((dishes) => {
                this.setState({
                    dishes: dishes.data.dish
                })
            })
    }

    render() {
        return (
            <div className="menu-page-container">
                <div className="menu__container">
                    <span className="menu__header">Menu</span>
                    <div className="menu">
                        {this.state.dishes.map((dish, i) => (
                            <MenuItem key={dish.name} name={dish.name} image={dish.image} description={dish.description} counter={i + 1} />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}


export default Menu