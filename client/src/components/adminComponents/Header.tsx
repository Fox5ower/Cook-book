import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import tokenInterceptor from "../../middlewares/tokenInterceptor"
import { DEV_URL } from "../App";
import IAdmin from "../../interfaces/IAdmin";
import Modal from "./modalComponents/Modal";
import { FormattedMessage } from 'react-intl';
import localizeRoute from '../../services/localize.route';

interface MyProps {
    id: string
}

interface MyState {
    admin: IAdmin,
    isModalOpen: boolean,
    actionType: string,
    adminName: string
}


class Header extends Component<MyProps, MyState> {

    constructor(props: MyProps) {
        super(props)

        this.state = {
            admin: {
                name: "",
                email: "",
                password: ""
            },
            isModalOpen: false,
            actionType: "",
            adminName: ""
        }
    }

    componentWillMount() {
        tokenInterceptor();
        axios.get(`${DEV_URL}/api/admin/${this.props.id}`)
            .then((admin) => {
                this.setState({ admin: admin.data });
                console.log(this.state.admin);
            }).catch((err) => {
                console.log("Error: " + err);
            })
    }

    openModal(actionType: string) {
        this.setState({ isModalOpen: true, actionType });
    }

    closeModal() {
        this.setState({ isModalOpen: false });
    }

    changeName(name: string) {
        console.log(name);

        this.setState(prevState => ({
            admin: {
                ...prevState.admin,
                name: name
            }
        }))
    }

    render() {
        return (
            <>
                <div className="pannel__header">
                    <div className="header__logo">
                        <Link to={"/"}><FormattedMessage id="admin.header.link" defaultMessage="Cook-Book" /></Link>
                    </div>
                    <div className="header__pannel-name">
                        <Link to={localizeRoute("admin")}>
                            <FormattedMessage id="admin.header.logo" defaultMessage="DASHBOARD" />
                        </Link>
                    </div>
                    <div className="header__admin-actions">
                        <div className="miniature">{this.state.admin.name.toUpperCase()[0]}
                            <div className="actions">
                                <div className="info">{this.state.admin.name.toUpperCase()}<hr /></div>
                                <div className="action" onClick={() => this.openModal("logout")}>
                                    <FormattedMessage id="admin.modal.logout" defaultMessage="Logout" />
                                </div>
                                <div className="action" onClick={() => this.openModal("password")}>
                                    <FormattedMessage id="admin.modal.change.pass" defaultMessage="Change Password" />
                                </div>
                                <div className="action" onClick={() => this.openModal("information")}>
                                    <FormattedMessage id="admin.modal.change.info" defaultMessage="Change Info" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={this.state.isModalOpen}
                    onClose={() => this.closeModal()}
                    actionType={this.state.actionType}
                    changeName={this.changeName.bind(this)}
                />
            </>
        )
    }
}


export default Header