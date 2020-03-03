import React, { Component, SyntheticEvent } from 'react';
import axios from "axios";
import { Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { DEV_URL } from "../App";
import inputValidator from "../../services/input.validator";
import resErrorHandler from "../../services/res.error.handler";
import { AiOutlineInfoCircle } from 'react-icons/ai';
import FormError from '../FormError';
import localizeRoute from '../../services/localize.route';

interface MyProps {

}

interface MyState {
    email: string,
    password: string,
    redirect: boolean,
    invalid: boolean
}


class Login extends Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props)

        this.state = {
            email: "",
            password: "",
            redirect: false,
            invalid: false
        }
    }

    changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        inputValidator(e);
        if (e.target) {
            if (e.currentTarget.name === "email") {
                this.setState({ email: e.currentTarget.value })
            } else if (e.currentTarget.name === "password") {
                this.setState({ password: e.currentTarget.value })
            }
        }
    }

    submitHandler = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (this.state.email && this.state.password) {
            axios.post(`${DEV_URL}/admin/login`, this.state)
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res.data.token);
                        localStorage.setItem("token", res.data.token);
                        this.setState({ redirect: true })
                    }
                }).catch(function (error) {
                    if (error.response) {
                        resErrorHandler(error.response.data)
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

    validate(e: React.FormEvent<HTMLInputElement>) {
        inputValidator(e);
    }

    render() {
        const { email, password, redirect } = this.state;
        if (redirect) {
            return <Redirect to={localizeRoute("admin")} />
        }
        return (
            <div className="admin__login-form-container">
                <form className="admin-login__form" method="POST" action="/admin/login">
                    <fieldset>
                        <legend><FormattedMessage id="admin.login" defaultMessage="Admin" /></legend>
                        <FormError />
                        <div className="input-container">
                            <input type="email" name="email" value={email} onChange={this.changeHandler} maxLength={20} required />
                            <label className="label" htmlFor="email">
                                <FormattedMessage id="admin.login.email.placeholder" defaultMessage="Email" />
                            </label>
                        </div>
                        <div className="input-container">
                            <input type="password" name="password" value={password} onChange={this.changeHandler} maxLength={20} required />
                            <label className="label" htmlFor="password">
                                <FormattedMessage id="admin.login.password.placeholder" defaultMessage="Password" />
                            </label>
                        </div>
                    </fieldset>
                    <FormattedMessage id="admin.login.button" defaultMessage="Log in">
                        {(placeholder: string) =>
                            <input type="submit" value={placeholder} onClick={this.submitHandler} />
                        }
                    </FormattedMessage>

                </form>
            </div>
        )
    }
}


export default Login