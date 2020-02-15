import React, { Component } from 'react';
import axios from "axios";
import IDish from "../interfaces/IDish"
import MenuItem from "./MenuItem";
import ToolBar from './ToolBar';


interface MyProps {
    dishes: Array<IDish>
}

interface MyState {
    dishes: Array<IDish>,
    term: string
}


class Menu extends Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props)

        this.initialData = []

        this.state = {
            dishes: [],
            term: ""
        }
    }

    initialData: Array<IDish>;

    updateData(config: MyState) {
        this.setState(config);
    }

    componentWillMount() {
        axios.get("http://localhost:3001/dishes")
            .then((dishes) => {
                this.initialData = dishes.data.dish;
                this.setState({
                    dishes: this.initialData
                })
            })
    }

    render() {
        return (
            <div className="menu-page-container">
                <div className="menu__container">
                    <span className="menu__header">Dish List</span>
                    <ToolBar
                        term={this.state.term}
                        data={this.initialData}
                        update={this.updateData.bind(this)}
                        initialState={this.initialData}
                    />
                    <div className="menu">

                        {this.state.dishes.map((dish, i) => (

                            <MenuItem key={dish._id}
                                _id={dish._id}
                                name={dish.name}
                                category={dish.category}
                                method={dish.method}
                                description={dish.description}
                                engreediants={dish.engreediants}
                                image={dish.image}
                                counter={i + 1} >
                            </MenuItem>

                        ))}
                    </div>
                </div>
            </div>
        )
    }
}


export default Menu