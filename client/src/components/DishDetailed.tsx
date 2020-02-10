import React, { Component } from 'react';
import IDish from "../interfaces/IDish";


interface MyProps {
    dish: IDish,
    toggleDescription: any,
    wrapperRef: any
}

interface MyState {

}

class DishDetailed extends Component<MyProps, MyState> {

    render() {
        return (
            <div ref={this.props.wrapperRef} className="wrapper">

                <div className="recipe">
                    <span className="close" onClick={() => this.props.toggleDescription()}></span>
                    <div className="recipe__body">
                        <div className="engreediants">
                            <span className="body__name">
                                Engreediants
                                </span>
                            <ul>
                                {this.props.dish.engreediants.map((el, i) => {
                                    return <li>
                                        <span className="counter">
                                            {i + 1}
                                        </span>
                                        <span className="engreediant">
                                            {el}
                                        </span>
                                    </li>
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


export default DishDetailed;
