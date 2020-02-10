import React, { Component } from 'react';
import axios from "axios";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import IDish from "../interfaces/IDish";
import DishDetailed from './DishDetailed';

interface IBackground {
    backgroundImage: string
}

interface MyState {
    dish: IDish,
    dynamicImage: IBackground
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
                engreediants: [],
                image: ""
            },
            dynamicImage: {
                backgroundImage: ""
            }

        }

    }

    toggleDescription() {
        const wrapper = this.wrapperRef.current;
        wrapper.classList.toggle('is-recipe-open')
    }


    componentWillMount() {
        axios.get(`http://localhost:3001/dishes/${this.props.match.params.id}`)
            .then((dish) => {
                this.setState({
                    dish: dish.data,
                    dynamicImage: {
                        backgroundImage: "linear-gradient(45deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url(" + dish.data.image + ")"
                    }
                })
            })
    }

    render() {
        return (
            <div className="dish-page">
                <DishDetailed
                    dish={this.state.dish}
                    toggleDescription={this.toggleDescription}
                    wrapperRef={this.wrapperRef}>
                </DishDetailed>
                <div className="dish-page-container" style={this.state.dynamicImage}>
                    <Link to="/dishes" className="menu-link">
                        Menu
                    </Link>
                    <div className="dish-container">
                        <div className="img-container">
                            <img src={this.state.dish.image} alt={this.state.dish.name} />
                            <div className="short-description">
                                <span className="name">
                                    {this.state.dish.name}
                                </span>

                                <span className="description">{this.state.dish.description}
                                </span>
                                <div className="button" onClick={() => this.toggleDescription()}>Show Recipe</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


export default DishPage;
