import React, { Component } from 'react';
import axios from "axios";
import { RouteComponentProps } from "react-router";
import IDish from "../../../src/interfaces/IDish";

interface MyState {
    dish: IDish,
    dynamicImage: any
}

class DishPage extends Component<RouteComponentProps<any>, MyState> {

    private wrapperRef: React.RefObject<HTMLInputElement>;

    constructor(props: RouteComponentProps<any>) {
        super(props)

        this.wrapperRef = React.createRef();

        this.state = {
            dish: {
                _id: "",
                name: "",
                category: "",
                method: "",
                description: "",
                engreediants: "",
                image: ""
            },
            dynamicImage: {
                backgroundImage: ""
            }

        }

    }

    showDescription() {
        const wrapper = this.wrapperRef.current;
        wrapper.classList.toggle('is-nav-open')
    }

    hideDescription() {
        const wrapper = this.wrapperRef.current;
        wrapper.classList.toggle("is-nav-open");
    }


    componentWillMount() {
        axios.get(`http://localhost:3001/dishes/${this.props.match.params.id}`)
            .then((dish) => {
                this.setState({
                    dish: dish.data,
                    dynamicImage: {
                        backgroundImage: "url(" + dish.data.image + ")"
                    }
                })
            })
    }

    render() {
        return (
            <div className="dish-page">
                <div ref={this.wrapperRef} className="wrapper">
                    <div className="nav">
                        <span className="close" onClick={() => this.hideDescription()}></span>
                        <div className="nav__body">
                            {this.state.dish.description}
                        </div>
                    </div>
                </div>




                <div className="dish-page-container" style={this.state.dynamicImage}>
                    <div className="dish-container">
                        <div className="img-container">
                            <img src={this.state.dish.image} />
                            <div className="short-description">
                                <span className="name">
                                    {this.state.dish.name}
                                </span>

                                <span className="description">{this.state.dish.description}
                                </span>
                                <div className="button" onClick={() => this.showDescription()}>Show Recipe</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


export default DishPage;
