import React, { Component, SyntheticEvent } from "react"
import axios from "axios";
import tokenInterceptor from "../../../middlewares/tokenInterceptor"
import { DEV_URL } from "../../App";
import { Redirect } from "react-router";

interface MyProps {
    isOpen: boolean
    onClose: any
    redirect: boolean
}

interface MyState {

}

class Logout extends Component<MyProps, MyState> {

    componentWillMount() {
        tokenInterceptor();
    }

    render() {
        if (this.props.isOpen === false) { return null };
        if (this.props.redirect === true) {
            localStorage.clear();
            return (
                <Redirect to="/" />
            )
        }
        return (
            <div>
                <div className="modal">
                    <button className="button" onClick={(e) => { this.logout(e) }}>Logout</button>
                </div>
                <div className="bg" onClick={e => this.close(e)} />
            </div>
        )
    }

    close(e: SyntheticEvent) {

        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    logout(e: SyntheticEvent) {
        e.preventDefault();
        let token: string = localStorage.getItem("token");
        axios.post(`${DEV_URL}api/admin/logout`, token)
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

export default Logout