import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import tokenInterceptor from "../../middlewares/tokenInterceptor";
import axios from "axios";
import isLoggedIn from "../../services/is.logged.in";
import getUser from "../../services/get.user";
import logout from "../../services/user.logout";
import { Redirect } from "react-router";
import localizeRoute from "../../services/localize.route";

interface MyState {
    name: string,
    token: string
}

interface MyProps {
    toggleModal: Function,
    name: string,
    token: string
}

class AuthMiniature extends Component<MyProps, MyState>{
    constructor(props: MyProps) {
        super(props)

        this.state = {
            name: "",
            token: ""
        }
    }

    logout() {
        logout();
        window.location.reload();
    }

    UNSAFE_componentWillMount() {
        if (isLoggedIn) {
            this.setState(getUser());
        }
    }

    render() {
        return (
            <div className="main__header__auth">
                <div className="header__admin-actions">
                    <div className="miniature">
                        {this.props.name ? this.props.name[0] : <FormattedMessage id="user.auth.login" defaultMessage="Login" />}
                        <div className="actions">
                            {
                                this.props.name && this.props.token ?
                                    <>
                                        <span>{this.props.name}</span>
                                        <div className="main__button auth-button" onClick={() => this.logout()}>
                                            <FormattedMessage id="user.auth.logout" defaultMessage="Logout" />
                                        </div>
                                    </>
                                    :
                                    <>
                                        <FormattedMessage id="user.auth.login.text" defaultMessage="You can login if you already have an account" />
                                        <div className="main__button auth-button" onClick={() => this.props.toggleModal("login")}>
                                            <FormattedMessage id="user.auth.login" defaultMessage="Login" />
                                        </div>
                                        <FormattedMessage id="user.auth.register.text" defaultMessage="Or register new account" />
                                        <div className="main__button auth-button" onClick={() => this.props.toggleModal("register")}>
                                            <FormattedMessage id="user.auth.register" defaultMessage="Register" />
                                        </div>
                                    </>
                            }

                        </div>
                    </div>
                </div>
                <div className="empty__half"></div>
            </div>
        )
    }
}

export default AuthMiniature;