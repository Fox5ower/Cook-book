import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

    render() {
        return (
            <div className="pannel__header">
                <div className="header__nav">
                    <Link to="/api/admin/pannel/update_db" className="nav__item">Update Menu DB</Link>
                    {/* <a className="nav__item">Change Password</a>
                    <a className="nav__item">Change Your Info</a> */}
                </div>
                <div className="header__pannel-name"><Link to="/api/admin/pannel">DASHBOARD</Link></div>
                <div className="header__logout">Logout</div>
            </div>
        )
    }
}


export default Header