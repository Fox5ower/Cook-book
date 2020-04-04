import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import tokenInterceptor from "../../middlewares/tokenInterceptor";
import axios from "axios";

interface MyState {

}

interface MyProps {
    toggleModal: Function,
    name: string
}

class AuthMiniature extends Component<MyProps, MyState>{
    constructor(props: MyProps) {
        super(props)

        this.state = {

        }
    }

    UNSAFE_componentWillMount() {
        tokenInterceptor()
    }

    render() {
        return (
            <div className="main__header__auth">
                <div className="header__admin-actions">
                    <div className="miniature">
                        {this.props.name ? this.props.name[0] : <FormattedMessage id="user.auth.login" defaultMessage="Login" />}
                        <div className="actions">
                            <FormattedMessage id="user.auth.login.text" defaultMessage="You can login if you already have an account" />
                            <div className="main__button auth-button" onClick={() => this.props.toggleModal("login")}>
                                <FormattedMessage id="user.auth.login" defaultMessage="Login" />
                            </div>
                            <FormattedMessage id="user.auth.register.text" defaultMessage="Or register new account" />
                            <div className="main__button auth-button" onClick={() => this.props.toggleModal("register")}>
                                <FormattedMessage id="user.auth.register" defaultMessage="Register" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="empty__half"></div>
            </div>
        )
    }
}

export default AuthMiniature;