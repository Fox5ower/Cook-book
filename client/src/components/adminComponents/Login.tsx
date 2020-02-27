import React, { Component, SyntheticEvent } from 'react';
import axios from "axios";
import { Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { DEV_URL } from "../App";

interface MyProps {

}

interface MyState {
    email: string,
    password: string,
    redirect: boolean
}


class Login extends Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props)

        this.state = {
            email: "",
            password: "",
            redirect: false
        }
    }

    changeHandler = (e: any) => {
        if (e.target) {
            if (e.target.name === "email") {
                this.setState({ email: e.target.value })
            } else if (e.target.name === "password") {
                this.setState({ password: e.target.value })
            }
        }
    }

    submitHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        console.log(this.state);
        axios.post(`${DEV_URL}admin/login`, this.state)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data.token);
                    localStorage.setItem("token", res.data.token);
                    this.setState({ redirect: true })
                }
            }).catch(err => {
                console.log(err)
            })

    }

    render() {
        const { email, password, redirect } = this.state;
        if (redirect) {
            return <Redirect to="/admin" />
        }

        return (
            <div className="admin__login-form-container">
                <form className="admin-login__form" method="POST" action="/admin/login">
                    <fieldset>
                        <legend><FormattedMessage id="admin.login" defaultMessage="Admin" /></legend>
                        <div className="input-container">
                            <input type="email" name="email" value={email} onChange={this.changeHandler} required />
                            <label className="label" htmlFor="email">
                                <FormattedMessage id="admin.login.email.placeholder" defaultMessage="Email" />
                            </label>
                        </div>
                        <div className="input-container">
                            <input type="password" name="password" value={password} onChange={this.changeHandler} required />
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