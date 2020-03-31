import React, { Component } from "react"
import Input from "../adminComponents/adminDishComponents/Input";
import "../../styles/input.scss"
import inputValidator from "../../services/input.validator";

interface MyProps {
    isOpened: boolean
    initiator: string
    toggleModal: any
}

interface MyState {
    modalFor: string,
    email: string,
    password: string,
    name: string
}

class AuthModal extends Component<MyProps, MyState> {

    constructor(props: MyProps) {
        super(props);

        this.state = {
            modalFor: "",
            name: "",
            email: "",
            password: ""
        }

    }

    toggleModal() {
        if (this.props.toggleModal) {
            this.props.toggleModal()
        }
    }

    changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        inputValidator(e)
        if (e.target) {
            if (e.currentTarget.name === 'email') {
                this.setState({ email: e.currentTarget.value })
            } else if (e.currentTarget.name === 'password') {
                this.setState({ password: e.currentTarget.value })
            } else if (e.currentTarget.name === 'name') {
                this.setState({ name: e.currentTarget.value })
            }
        }
    }

    componentDidUpdate(prevProps: MyProps) {
        if (prevProps.isOpened !== this.props.isOpened) {
            if (this.props.isOpened === true) {
                document.querySelector(".overlay").classList.add("showing");
                if (this.props.initiator === "login") {
                    this.setState({
                        modalFor: "Login"
                    })
                } else if (this.props.initiator === "register") {
                    this.setState({
                        modalFor: "Register"
                    })
                }
            } else {
                document.querySelector(".overlay").classList.remove("showing");
            }
        }
    }

    render() {
        const { email, password, name } = this.state
        if (this.props.initiator === "login") {
            return (
                <>
                    <div className="overlay">
                        <div className="btn__container">
                            <div className="close" onClick={() => this.toggleModal()}></div>
                        </div>
                        <form action="" className="user__auth__form">
                            <legend>{this.state.modalFor}</legend>
                            <fieldset>
                                <div className="input-container">
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={this.changeHandler}
                                        maxLength={20}
                                        required
                                    />
                                    <label className="label" htmlFor="email">
                                        Email
                                    </label>
                                </div>
                                <div className="input-container">
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={this.changeHandler}
                                        maxLength={20}
                                        required
                                    />
                                    <label className="label" htmlFor="password">
                                        Password
                                    </label>
                                </div>
                                <input type="submit" value={this.state.modalFor} />
                            </fieldset>
                        </form>
                    </div>
                </>
            )
        }
        else
            return (
                <>
                    <div className="overlay">
                        <div className="btn__container">
                            <div className="close" onClick={() => this.toggleModal()}></div>
                        </div>
                        <form action="" className="user__auth__form">
                            <legend>{this.state.modalFor}</legend>
                            <fieldset>
                                <div className="input-container">
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={this.changeHandler}
                                        maxLength={20}
                                        required
                                    />
                                    <label className="label" htmlFor="name">
                                        Name
                                    </label>
                                </div>
                                <div className="input-container">
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={this.changeHandler}
                                        maxLength={20}
                                        required
                                    />
                                    <label className="label" htmlFor="email">
                                        Email
                                    </label>
                                </div>
                                <div className="input-container">
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={this.changeHandler}
                                        maxLength={20}
                                        required
                                    />
                                    <label className="label" htmlFor="password">
                                        Password
                                    </label>
                                </div>
                                <input type="submit" value={this.state.modalFor} />
                            </fieldset>
                        </form>
                    </div>
                </>
            )
    }
}

export default AuthModal