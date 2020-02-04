import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';


class Pannel extends Component {

    render() {
        return (
            <div className="pannel__header">
                <div className="header__nav">
                    <a className="nav__item">Update Menu DB</a>
                    <a className="nav__item">Change Password</a>
                    <a className="nav__item">Change Your Info</a>
                </div>
                <div className="header__pannel-name">DASHBOARD</div>
                <div className="header__logout">Logout</div>
            </div>
        )
    }
}


export default Pannel