import React, { Component, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import tokenInterceptor from "../../middlewares/tokenInterceptor"
import IAdmin from "../../interfaces/IAdmin";
import Modal from "./Modal";

interface MyProps {
    id: string
}

interface MyState {
    admin: IAdmin,
    isModalOpen: boolean,
    actionType: string
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
            actionType: ""
        }
    }

    componentWillMount() {
        tokenInterceptor();
        axios.get(`http://localhost:3001/api/admin/${this.props.id}`)
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

    render() {
        return (
            <>
                <div className="pannel__header">
                    <div className="header__logo">
                        <Link to={"/"}>Coock-Book</Link>
                    </div>
                    <div className="header__pannel-name"><Link to="/admin">DASHBOARD</Link></div>
                    <div className="header__admin-actions">
                        <div className="miniature">{this.state.admin.name.toUpperCase()[0]}
                            <div className="actions">
                                <div className="info">{this.state.admin.name.toUpperCase()}<hr /></div>
                                <div className="action" onClick={() => this.openModal("logout")}>Logout</div>
                                <div className="action" onClick={() => this.openModal("password")}>Change Password</div>
                                <div className="action" onClick={() => this.openModal("information")}>Change Info</div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={this.state.isModalOpen}
                    onClose={() => this.closeModal()}
                    actionType={this.state.actionType}
                />
            </>
        )
    }
}


export default Header