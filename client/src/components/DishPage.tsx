import React, { Component } from 'react';
import IDish from "../interfaces/IDish";
import DishDetailed from './DishDetailed';
import { FormattedMessage } from 'react-intl';

interface IBackground {
    backgroundImage: string
}

interface MyState {
    dish: IDish,
    dynamicImage: IBackground,
    showDescription: boolean
}

interface MyProps {
    dish: IDish,
    toggleSlider: Function,
    closeDescription: boolean
}

class DishPage extends Component<MyProps, MyState> {

    constructor(props: MyProps) {
        super(props)

        this.state = {
            dish: {
                _id: "",
                name: "",
                category: "",
                method: "",
                description: "",
                engreediants: [],
                language: "",
                image: ""
            },
            dynamicImage: {
                backgroundImage: ""
            },
            showDescription: false

        }

    }

    toggleDescription() {
        this.setState({
            showDescription: !this.state.showDescription
        })
    }

    closeDescription() {
        if (this.state.showDescription) {
            this.setState({
                showDescription: false
            })
        }
    }

    UNSAFE_componentWillMount() {
        this.setState({
            dish: this.props.dish,
            dynamicImage: {
                backgroundImage: "linear-gradient(45deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url(" + this.props.dish.image + ")"
            }
        })
    }

    UNSAFE_componentWillReceiveProps() {
        if (this.state.showDescription && this.props.closeDescription) {
            this.setState({
                showDescription: false
            })
        }

    }

    render() {
        return (
            <div className="dish-page">
                <DishDetailed
                    dish={this.state.dish}
                    showing={this.state.showDescription}
                    toggleDescription={this.toggleDescription.bind(this)}
                >
                </DishDetailed>
                <div className="dish-page-container" style={this.state.dynamicImage}>
                    <div className="menu-link" onClick={() => this.props.toggleSlider()}>
                        <FormattedMessage id="dish.return.link" defaultMessage="Menu" /> ⮌
                    </div>
                    <div className="dish-container">
                        <div className="img-container">
                            <img src={this.state.dish.image} alt={this.state.dish.name} />
                            <div className="short-description">
                                <span className="name">
                                    {this.state.dish.name}
                                </span>

                                <span className="description">{this.state.dish.description}
                                </span>
                                <div className="description-button" onClick={this.toggleDescription.bind(this)}>
                                    <FormattedMessage id="dish.showRecipe.button" defaultMessage="Show Recipe" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


export default DishPage;
