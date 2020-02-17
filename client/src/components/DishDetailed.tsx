import React, { Component } from 'react';
import IDish from "../interfaces/IDish";


interface MyProps {
    dish: IDish,
    toggleDescription: Function,
    showing: boolean
}

interface MyState {

}



class DishDetailed2 extends Component<MyProps, MyState> {

    render() {
        if (this.props.showing) {
            return (
                <div className="wrapper" style={{ margin: "0 0 0 0", visibility: "visible" }}>
                    <div className="recipe">
                        <span className="close" onClick={() => this.props.toggleDescription()}></span>
                        <div className="recipe__body">
                            <div className="engreediants">
                                <span className="body__name">
                                    Engreediants
                                </span>
                                <ul>
                                    {this.props.dish.engreediants.map((el, i) => {
                                        return (<li key={i}>
                                            <span className="counter">
                                                {i + 1}
                                            </span>
                                            <span className="engreediant">
                                                {el}
                                            </span>
                                        </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className="method">
                                <span className="body__name">
                                    Method
                                </span>
                                <div className="method__text">
                                    {this.props.dish.method}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="wrapper">
                    <div className="recipe">
                        <span className="close" onClick={() => this.props.toggleDescription()}></span>
                        <div className="recipe__body">
                            <div className="engreediants">
                                <span className="body__name">
                                    Engreediants
                                </span>
                                <ul>
                                    {this.props.dish.engreediants.map((el, i) => {
                                        return (<li key={i}>
                                            <span className="counter">
                                                {i + 1}
                                            </span>
                                            <span className="engreediant">
                                                {el}
                                            </span>
                                        </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className="method">
                                <span className="body__name">
                                    Method
                                </span>
                                <div className="method__text">
                                    {this.props.dish.method}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}


export default DishDetailed2;
