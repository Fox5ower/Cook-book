import React, { Component } from 'react';
import SkeletonLoader from "tiny-skeleton-loader-react";
import SkeletonStyles from "../services/static/preloader.style.json";

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

interface MyState {
    mounting: boolean
}


class MenuItem extends Component<MyProps, MyState> {

    constructor(props: MyProps) {
        super(props)

        this.state = {
            mounting: false
        }
    }

    dynamicBackground = {
        backgroundImage: "url(" + this.props.image + ")"
    }

    componentWillMount() {
        this.setState({
            mounting: true
        })
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                mounting: false
            })
        });
    }

    // componentDidUpdate() {
    //     setTimeout(() => {
    //         this.setState({
    //             mounting: false
    //         })
    //     }, 500);
    // }

    render() {
        return (
            <div onClick={() => { this.props.toggleSlider(); this.props.setIndex(this.props.counter) }} className="menu__item" style={this.dynamicBackground}>
                <SkeletonLoader style={this.state.mounting ? SkeletonStyles : { opacity: "0", transition: "all .3s" }} />
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