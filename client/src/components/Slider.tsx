import React, { Component } from "react";
import IDish from "../interfaces/IDish";
import DishPage from "./DishPage";
import { FaChevronLeft } from "react-icons/fa"
import { FaChevronRight } from "react-icons/fa"

interface MyProps {
    initialData: Array<IDish>;
    toggleSlider: Function,
    index: number
}

interface MyState {
    x: number
}

class Slider extends Component<MyProps, MyState>{

    constructor(props: MyProps) {
        super(props)
        this.state = {
            x: (this.props.index - 1) * -100
        }
    }

    goLeft() {
        this.setState({
            x: (this.state.x === 0) ? (-100 * (this.props.initialData.length - 1)) : this.state.x + 100
        })
    }

    goRight() {
        this.setState({
            x: (this.state.x === -100 * (this.props.initialData.length - 1)) ? 0 : this.state.x - 100
        })
    }


    render() {
        return (
            <div className="slider">
                {this.props.initialData.map((dish: IDish, i: number) => {
                    return (
                        <div className="slide" key={i} style={{ transform: `translateX(${this.state.x}%)` }}>
                            <DishPage dish={dish} toggleSlider={this.props.toggleSlider.bind(this)}></DishPage>
                        </div>
                    )
                })}
                <button id="goLeft" onClick={this.goLeft.bind(this)}><FaChevronLeft /></button>
                <button id="goRight" onClick={this.goRight.bind(this)}><FaChevronRight /></button>
            </div>
        )
    }
}

export default Slider;