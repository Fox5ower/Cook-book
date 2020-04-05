import React, { Component } from "react";
import { Link } from "react-router-dom"
import localizeRoute from "../services/localize.route";
import isLoggedIn from "../services/is.logged.in";
import getUser from "../services/get.user";
import logout from "../services/user.logout";
import { FormattedMessage } from "react-intl";



interface MyProps {
    toggleModal: Function
    name: string,
    token: string
}

interface MyState {
    name: string,
    token: string
}

class DishMenuUserActions extends Component<MyProps, MyState>{
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
        if (isLoggedIn()) {
            this.setState(getUser());
        }
    }

    render() {
        return (
            <div className="buttons__container">
                <div className="link-button">
                    <Link to={localizeRoute('')}>
                        <FormattedMessage id="user.action.main.page" defaultMessage="Main Page ⮌" />
                    </Link>
                </div>
                {
                    this.props.name && this.props.token ?
                        <>
                            <div className="auth-buttons">
                                <div className="register-btn">
                                    {this.props.name}
                                </div>
                            |
                            <div className="login-btn" onClick={() => this.logout()}>
                                    <FormattedMessage id="user.auth.logout" defaultMessage="Logout" />
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className="auth-buttons">
                                <div className="register-btn" onClick={() => this.props.toggleModal("register")}>
                                    <FormattedMessage id="user.auth.register" defaultMessage="Register" />
                                </div>
                        |
                            <div className="login-btn" onClick={() => this.props.toggleModal("login")}>
                                    <FormattedMessage id="user.auth.login" defaultMessage="Login" />
                                </div>
                            </div>
                        </>
                }
            </div>
        )
    }
}

export default DishMenuUserActions;