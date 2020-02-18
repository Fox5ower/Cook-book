import React, { Component } from 'react';
import axios from "axios";
import IDish from "../interfaces/IDish"
import MenuItem from "./MenuItem";
import ToolBar from './ToolBar';
import Slider from './Slider';


interface MyProps {
    dishes: Array<IDish>
}

interface MyState {
    dishes: Array<IDish>,
    term: string,
    showSlider: boolean,
    index: number
}


class Menu extends Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props)

        this.initialData = []

        this.state = {
            dishes: [],
            term: "",
            showSlider: false,
            index: undefined
        }
    }

    initialData: Array<IDish>;

    updateData(config: MyState) {
        this.setState(config);
    }

    toggleSlider() {
        this.setState({
            showSlider: !this.state.showSlider
        })
    }

    setIndex(index: number) {
        this.setState({
            index: index
        })
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
        if (!this.state.showSlider) {
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
                                    toggleSlider={this.toggleSlider.bind(this)}
                                    counter={i + 1}
                                    setIndex={this.setIndex.bind(this)}>
                                </MenuItem>

                            ))}
                        </div>
                    </div>
                </div>
            )
        } else if (this.state.showSlider && this.state.index) {
            return (
                <Slider initialData={this.state.dishes} toggleSlider={this.toggleSlider.bind(this)} index={this.state.index}></Slider>
            )
        }

    }
}


export default Menu