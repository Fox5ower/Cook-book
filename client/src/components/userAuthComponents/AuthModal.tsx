import React, { Component } from "react"
import axios from "axios"
import "../../styles/input.scss"
import inputValidator from "../../services/input.validator";
import { DEV_URL } from "../App";
import FormError from '../FormError'
import resErrorHandler from "../../services/res.error.handler";

interface MyProps {
    isOpened: boolean
    initiator: string
    toggleModal: any
}

interface MyState {
    email: string,
    password: string,
    name: string,
    password2: string
}

class AuthModal extends Component<MyProps, MyState> {

    constructor(props: MyProps) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            password2: ""
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
            } else if (e.currentTarget.name === 'password2') {
                this.setState({ password2: e.currentTarget.value })
            } else if (e.currentTarget.name === 'name') {
                this.setState({ name: e.currentTarget.value })
            }
        }
    }

    submitHandler = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (this.props.initiator === "login") {
            if (this.state.email && this.state.password) {
                axios
                    .post(`${DEV_URL}/login`, this.state)
                    .then(res => {
                        if (res.status === 200) {
                            localStorage.setItem('token', res.data.token)
                            this.toggleModal()
                        }
                    })
                    .catch(function (error) {
                        if (error.response) {
                            resErrorHandler(error.response.data)
                        } else {
                            let errData = {
                                message: 'Something is wrong. Try again',
                            }
                            resErrorHandler(errData)
                        }
                    })
            } else {
                let errData = {
                    message: 'All fields are required',
                }
                resErrorHandler(errData)
            }
        } else if (this.props.initiator === "register") {
            if (this.state.email && this.state.password && this.state.name) {
                axios
                    .post(`${DEV_URL}/register`, this.state)
                    .then(res => {
                        if (res.status === 200) {
                            localStorage.setItem('token', res.data.token)
                            this.toggleModal()
                        }
                    })
                    .catch(function (error) {
                        if (error.response) {
                            resErrorHandler(error.response.data)
                        } else {
                            let errData = {
                                message: 'Something is wrong. Try again',
                            }
                            resErrorHandler(errData)
                        }
                    })
            } else {
                let errData = {
                    message: 'All fields are required',
                }
                resErrorHandler(errData)
            }
        }
    }
    componentDidUpdate(prevProps: MyProps) {
        if (prevProps.isOpened !== this.props.isOpened) {
            if (this.props.isOpened === true) {
                document.querySelector(".overlay").classList.add("showing");
            } else {
                document.querySelector(".overlay").classList.remove("showing");
                this.setState({
                    name: "",
                    email: "",
                    password: "",
                    password2: ""
                })
                resErrorHandler("")
            }
        }
    }

    render() {
        const { email, password, password2, name } = this.state
        const modalFor = this.props.initiator ? this.props.initiator : ""
        if (this.props.initiator === "login") {
            return (
                <>
                    <div className="overlay">
                        <div className="btn__container">
                            <div className="close" onClick={() => this.toggleModal()}></div>
                        </div>
                        <form action="" className="user__auth__form">
                            <legend>Login</legend>
                            <FormError />
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
                                <input type="submit" value={"Sign In"} onClick={this.submitHandler} />
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
                            <legend>Register</legend>
                            <FormError />
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
                                <div className="input-container">
                                    <input
                                        type="password"
                                        name="password2"
                                        value={password2}
                                        onChange={this.changeHandler}
                                        maxLength={20}
                                        required
                                    />
                                    <label className="label" htmlFor="password">
                                        Confirm password
                                    </label>
                                </div>
                                <input type="submit" value={"Sign Up"} onClick={this.submitHandler} />
                            </fieldset>
                        </form>
                    </div>
                </>
            )
    }
}

export default AuthModal