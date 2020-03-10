import React, { Component, SyntheticEvent } from "react"
import axios from "axios";
import { DEV_URL } from "../../App";
import tokenInterceptor from "../../../middlewares/tokenInterceptor"
import { Redirect } from "react-router";
import Input from "./Input";
import resErrorHandler from "../../../services/res.error.handler";
import { FormattedMessage } from "react-intl";
import FormError from "../../FormError";

interface MyProps {
    isOpen: boolean,
    onClose: any,
    actionType: string,
    changeName: Function
}

interface MyState {
    password: string,
    password2: string,
    email: string,
    name: string,
    redirect: boolean
}

class Modal extends Component<MyProps, MyState> {

    constructor(props: MyProps) {
        super(props)

        this.state = {
            password: "",
            password2: "",
            email: "",
            name: "",
            redirect: false
        }
    }


    changeHandler = (e: any) => {
        if (e.target) {
            if (e.target.name === "password") {
                this.setState({ password: e.target.value })
            } else if (e.target.name === "confirm password") {
                this.setState({ password2: e.target.value })
            } else if (e.target.name === "email") {
                this.setState({ email: e.target.value })
            } else if (e.target.name === "name") {
                this.setState({ name: e.target.value })
            }
        }
    }

    submitHandler = (e: SyntheticEvent) => {

        e.preventDefault();
        if ((this.state.password && this.state.password2) || (this.state.email || this.state.name)) {
            if (this.state.name) {
                this.props.changeName(this.state.name)
            }
            axios.put(`${DEV_URL}/api/admin/${this.props.actionType}`, this.state)
                .then((res) => {
                    console.log(res.data);
                    if (res.status === 200) {
                        this.setState({
                            password: "",
                            password2: "",
                            email: "",
                            name: ""
                        });

                        this.close(e);
                        alert("Changes has been submited");
                    }
                })
                .catch(err => {
                    if (err.response) {
                        resErrorHandler(err.response.data)
                    } else {
                        let errData = {
                            message: "Something is wrong. Try again"
                        }
                        resErrorHandler(errData)
                    }
                })
        } else {
            let errData = {
                message: "All fields are required"
            }
            resErrorHandler(errData)
        }
    }
    UNSAFE_componentWillMount() {
        tokenInterceptor();
    }

    render() {
        const { password, password2, email, name } = this.state;
        if (this.props.isOpen === false) { return null }
        if (this.state.redirect === true) {
            localStorage.clear();
            return (
                <Redirect to="/" />
            )
        }
        if (this.props.actionType === "logout") {
            return (
                <div>
                    <div className="modal">
                        <button className="button" onClick={(e) => { this.logout(e) }}>
                            <FormattedMessage id="admin.modal.logout.button" defaultMessage="Logout" />
                        </button>
                    </div>
                    <div className="bg" onClick={e => this.close(e)} />
                </div>
            )
        } else if (this.props.actionType === "password") {
            return (
                <div>
                    <div className="modal">
                        <form id="form" method="POST" action="/api/admin/password">
                            <fieldset className="column-fieldset">
                                <legend><FormattedMessage id="admin.modal.changePass.header" defaultMessage="Change Password" /></legend>
                                <FormError></FormError>
                                <FormattedMessage id="admin.modal.changePass.pass.placeholder" defaultMessage="Password">
                                    {(placeholder: string) =>
                                        <Input placeholder={placeholder} name="password" maxLength={50} value={password} onChange={this.changeHandler}></Input>
                                    }
                                </FormattedMessage>
                                <FormattedMessage id="admin.modal.changePass.confirmPass.placeholder" defaultMessage="Confirm password">
                                    {(placeholder: string) =>
                                        <Input placeholder={placeholder} name="confirm password" maxLength={50} value={password2} onChange={this.changeHandler}></Input>
                                    }
                                </FormattedMessage>
                            </fieldset>
                            <FormattedMessage id="admin.modal.send.button" defaultMessage="Send">
                                {(value: string) =>
                                    <input type="submit" className="button" value={value} onClick={this.submitHandler} />
                                }
                            </FormattedMessage>
                        </form>
                    </div>
                    <div className="bg" onClick={e => this.close(e)} />
                </div>
            );
        } else if (this.props.actionType === "information") {
            return (
                <div>
                    <div className="modal">
                        <form id="form" method="POST" action="/api/admin/password">
                            <fieldset className="column-fieldset">
                                <legend><FormattedMessage id="admin.modal.changeInfo.header" defaultMessage="Change Information" /></legend>
                                <FormError></FormError>
                                <FormattedMessage id="admin.modal.changeInfo.email.placeholder" defaultMessage="Email">
                                    {(placeholder: string) =>
                                        <Input placeholder={placeholder} name="email" maxLength={50} value={email} onChange={this.changeHandler}></Input>
                                    }
                                </FormattedMessage>
                                <FormattedMessage id="admin.modal.changeInfo.name.placeholder" defaultMessage="Name">
                                    {(placeholder: string) =>
                                        <Input placeholder={placeholder} name="name" maxLength={50} value={name} onChange={this.changeHandler.bind(this)}></Input>
                                    }
                                </FormattedMessage>
                            </fieldset>

                            <FormattedMessage id="admin.modal.send.button" defaultMessage="Send">
                                {(value: string) =>
                                    <input type="submit" className="button" value={value} onClick={this.submitHandler} />
                                }
                            </FormattedMessage>
                        </form>
                    </div>
                    <div className="bg" onClick={e => this.close(e)} />
                </div>
            );
        }
    }

    close(e: SyntheticEvent) {

        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    logout(e: SyntheticEvent) {
        e.preventDefault();
        let token: string = localStorage.getItem("token");
        axios.post(`${DEV_URL}/api/admin/logout`, token)
            .then(res => {
                if (res.status === 200) {
                    console.log(res);
                    this.setState({
                        redirect: true
                    })
                }
            })
    }
}

export default Modal