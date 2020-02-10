import React, { Component, SyntheticEvent } from "react"
import Modal__Form from "./Modal__Form";
import axios from "axios";
import tokenInterceptor from "../../middlewares/tokenInterceptor"
interface MyProps {
    isOpen: boolean
    onClose: any
    actionType: string
}

interface MyState {
    password: string,
    password2: string,
    email: string,
    name: string
}

class Modal extends Component<MyProps, MyState> {

    constructor(props: MyProps) {
        super(props)

        this.state = {
            password: "",
            password2: "",
            email: "",
            name: ""
        }
    }


    changeHandler = (e: any) => {
        if (e.target) {
            if (e.target.name === "password") {
                this.setState({ password: e.target.value })
            } else if (e.target.name === "password2") {
                this.setState({ password2: e.target.value })
            }
        }
    }

    submitHandler = (e: SyntheticEvent) => {

        e.preventDefault();
        console.log(this.state);
        axios.put(`http://localhost:3001/api/admin/${this.props.actionType}`, this.state)
            .then((res) => {
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            })

    }
    componentWillMount() {
        tokenInterceptor();
    }

    render() {
        const { password, password2, email, name } = this.state;
        if (this.props.isOpen === false) return null;
        if (this.props.actionType === "logout") {
            return (
                <div>
                    <div className="modal">
                        <button>Logout</button>
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
                                <input type="password" name="password" placeholder="New Password" value={password} onChange={this.changeHandler} />
                                <input type="text" name="password2" placeholder="Confirm Password" value={password2} onChange={this.changeHandler} />
                            </fieldset>

                            <input type="submit" value="Send" onClick={this.submitHandler} />
                        </form>
                    </div>
                    <div className="bg" onClick={e => this.close(e)} />
                </div>
            );
        }
    }

    close(e: SyntheticEvent) {
        e.preventDefault();

        if (this.props.onClose) {
            this.props.onClose();
        }
    }
}

export default Modal