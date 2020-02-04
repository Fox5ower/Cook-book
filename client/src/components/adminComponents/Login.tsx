import React, { Component, SyntheticEvent } from 'react';
import axios from "axios";
import { Redirect } from 'react-router-dom';

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

        axios.post("http://localhost:3001/admin/login", this.state)
            .then((res) => {

                console.log(res.data.token);
                localStorage.setItem("token", res.data.token);
                this.setState({ redirect: true })

            }).catch(err => {

                console.log(err);

            })

    }

    render() {
        const { email, password, redirect } = this.state;

        if (redirect) {
            return <Redirect to="/admin/pannel" />
        }

        return (
            <div className="admin__login-form-container">
                <form className="admin-login__form" method="POST" action="/admin/login">
                    <fieldset>
                        <legend>Admin Login</legend>
                        <input type="email" name="email" placeholder="Email" value={email} onChange={this.changeHandler} />
                        <input type="text" name="password" placeholder="Password" value={password} onChange={this.changeHandler} />
                    </fieldset>

                    <input type="submit" value="Log In" onClick={this.submitHandler} />
                </form>
            </div>
        )
    }
}


export default Login