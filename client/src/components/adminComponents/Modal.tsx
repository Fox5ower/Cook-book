import React, { Component, SyntheticEvent } from "react"
import axios from "axios";
import tokenInterceptor from "../../middlewares/tokenInterceptor"
import { Redirect } from "react-router";
interface MyProps {
    isOpen: boolean
    onClose: any
    actionType: string
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
            } else if (e.target.name === "password2") {
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
        console.log(this.state);
        axios.put(`http://localhost:3001/api/admin/${this.props.actionType}`, this.state)
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
                console.log(err);
            })

    }
    componentWillMount() {
        tokenInterceptor();
    }

    render() {
        const { password, password2, email, name } = this.state;
        if (this.props.isOpen === false) { return null };
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
                        <button className="button" onClick={(e) => { this.logout(e) }}>Logout</button>
                    </div>
                    <div className="bg" onClick={e => this.close(e)} />
                </div>
            )
        } else if (this.props.actionType === "password") {
            return (
                <div>
                    <div className="modal">
                        <form className="admin-login__form" method="POST" action="/api/admin/password">
                            <fieldset>
                                <legend>Change Password</legend>
                                <input id="password" type="password" name="password" placeholder="New Password" value={password} onChange={this.changeHandler} />
                                <input id="password2" type="text" name="password2" placeholder="Confirm Password" value={password2} onChange={this.changeHandler} />
                            </fieldset>

                            <input type="submit" className="button" value="Send" onClick={this.submitHandler} />
                        </form>
                    </div>
                    <div className="bg" onClick={e => this.close(e)} />
                </div>
            );
        } else if (this.props.actionType === "information") {
            return (
                <div>
                    <div className="modal">
                        <form className="admin-login__form" method="POST" action="/api/admin/password">
                            <fieldset>
                                <legend>Change Information</legend>
                                <input id="email" type="email" name="email" placeholder="New Email" value={email} onChange={this.changeHandler} />
                                <input id="name" type="text" name="name" placeholder="New Name" value={name} onChange={this.changeHandler} />
                            </fieldset>

                            <input type="submit" className="button" value="Send" onClick={this.submitHandler} />
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
        this.setState({
            redirect: true
        })
    }
}

export default Modal