import React, { Component, SyntheticEvent } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import setObject from "../services/localStorage/set.object";
import getObject from "../services/localStorage/get.object";

interface MyProps {
    name: string
    counter: number
}

interface MyState {
    isFavourite: boolean
    stars: {
        oneStar: boolean
        twoStars: boolean
        threeStars: boolean
        fourStars: boolean
        fiveStars: boolean
    }
}

class DishActions extends Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);

        this.state = {
            isFavourite: false,
            stars: {
                oneStar: false,
                twoStars: false,
                threeStars: false,
                fourStars: false,
                fiveStars: false,
            }
        }
    }

    async handleClick(e: SyntheticEvent) {
        e.preventDefault();
        let promise = new Promise((resolve) => {
            resolve(this.setState({
                isFavourite: !this.state.isFavourite
            }))

        })
        await promise.then(() => {
            console.log(this.state.isFavourite);
            let name = this.props.name.trim()
            setObject(name, { stars: null, isFavourite: this.state.isFavourite })
        }
        )
    }

    handleRating(e: any) {
        switch (e.target.id) {
            case `star-${this.props.counter}-1`: {
                let promise = new Promise((resolve) => {
                    resolve(this.setState({
                        stars: {
                            oneStar: !this.state.stars["oneStar"],
                            twoStars: false,
                            threeStars: false,
                            fourStars: false,
                            fiveStars: false,
                        }
                    }))
                })
                promise.then(() => { setObject(this.props.name, { stars: this.state.stars["oneStar"] ? 1 : null, isFavourite: this.state.isFavourite }) });

                break;
            }
            case `star-${this.props.counter}-2`: {
                let promise = new Promise((resolve) => {
                    resolve(this.setState({
                        stars: {
                            oneStar: false,
                            twoStars: !this.state.stars["twoStars"],
                            threeStars: false,
                            fourStars: false,
                            fiveStars: false,
                        }
                    }))
                })
                promise.then(() => { setObject(this.props.name, { stars: this.state.stars["twoStars"] ? 2 : null, isFavourite: this.state.isFavourite }) });

                break;
            }
            case `star-${this.props.counter}-3`: {
                let promise = new Promise((resolve) => {
                    resolve(this.setState({
                        stars: {
                            oneStar: false,
                            twoStars: false,
                            threeStars: !this.state.stars["threeStars"],
                            fourStars: false,
                            fiveStars: false,
                        }
                    }))
                })
                promise.then(() => { setObject(this.props.name, { stars: this.state.stars["threeStars"] ? 3 : null, isFavourite: this.state.isFavourite }) });

                break;
            }
            case `star-${this.props.counter}-4`: {
                let promise = new Promise((resolve) => {
                    resolve(this.setState({
                        stars: {
                            oneStar: false,
                            twoStars: false,
                            threeStars: false,
                            fourStars: !this.state.stars["fourStars"],
                            fiveStars: false,
                        }
                    }))
                })
                promise.then(() => { setObject(this.props.name, { stars: this.state.stars["fourStars"] ? 4 : null, isFavourite: this.state.isFavourite }) });

                break;
            }
            case `star-${this.props.counter}-5`: {
                let promise = new Promise((resolve) => {
                    resolve(this.setState({
                        stars: {
                            oneStar: false,
                            twoStars: false,
                            threeStars: false,
                            fourStars: false,
                            fiveStars: !this.state.stars["fiveStars"],
                        }
                    }))
                })
                promise.then(() => { setObject(this.props.name, { stars: this.state.stars["fiveStars"] ? 5 : null, isFavourite: this.state.isFavourite }) });

                break;
            }
        }
    }

    UNSAFE_componentWillMount() {
        let object = getObject(this.props.name)
        object ?
            this.setState({
                isFavourite: object["isFavourite"]
            }) :
            this.setState({
                isFavourite: false
            })

        if (object) {
            switch (object["stars"]) {
                case 1: {
                    this.setState(prevState => ({
                        stars: {
                            ...prevState.stars,
                            oneStar: true
                        }
                    }))
                    break
                }
                case 2: {
                    this.setState(prevState => ({
                        stars: {
                            ...prevState.stars,
                            twoStars: true
                        }
                    }))
                    break
                }
                case 3: {
                    this.setState(prevState => ({
                        stars: {
                            ...prevState.stars,
                            threeStars: true
                        }
                    }))
                    break
                }
                case 4: {
                    this.setState(prevState => ({
                        stars: {
                            ...prevState.stars,
                            fourStars: true
                        }
                    }))
                    break
                }
                case 5: {
                    this.setState(prevState => ({
                        stars: {
                            ...prevState.stars,
                            fiveStars: true
                        }
                    }))
                    break
                }
            }
        }
    }

    render() {
        const { oneStar, twoStars, threeStars, fourStars, fiveStars } = this.state.stars
        return (
            <div className="dish-actions__container">
                <div className="rating-area">
                    <input type="radio" id={`star-${this.props.counter}-5`} onChange={(e: any) => this.handleRating(e)} checked={fiveStars} />
                    <label htmlFor={`star-${this.props.counter}-5`} title="5"></label>

                    <input type="radio" id={`star-${this.props.counter}-4`} onChange={(e: any) => this.handleRating(e)} checked={fourStars} />
                    <label htmlFor={`star-${this.props.counter}-4`} title="4"></label>

                    <input type="radio" id={`star-${this.props.counter}-3`} onChange={(e: any) => this.handleRating(e)} checked={threeStars} />
                    <label htmlFor={`star-${this.props.counter}-3`} title="3"></label>

                    <input type="radio" id={`star-${this.props.counter}-2`} onChange={(e: any) => this.handleRating(e)} checked={twoStars} />
                    <label htmlFor={`star-${this.props.counter}-2`} title="2"></label>

                    <input type="radio" id={`star-${this.props.counter}-1`} onChange={(e: any) => this.handleRating(e)} checked={oneStar} />
                    <label htmlFor={`star-${this.props.counter}-1`} title="1"></label>

                </div>
                {this.state.isFavourite ?
                    <AiFillHeart className="favourite-btn-filled" onClick={(e: SyntheticEvent) => { this.handleClick(e) }} />
                    : <AiOutlineHeart className="favourite-btn" onClick={(e: SyntheticEvent) => { this.handleClick(e) }} />
                }
            </div>
        )
    }

}

export default DishActions; 