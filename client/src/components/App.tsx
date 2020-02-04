import React, { Component } from "react";

import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import MainPage from "./MainPage";
import Menu from "./Menu";
import Login from "./adminComponents/Login";
import Pannel from "./adminComponents/Pannel";

interface MyProps {
    history: History
}

class App extends Component<MyProps, {}> {
    render() {
        const { history } = this.props;

        return (
            <div className="app">
                <Switch>
                    <Route history={history} path="/home" component={MainPage}></Route>
                    <Route history={history} path="/dishes" component={Menu}></Route>

                    <Route history={history} path="/admin/login" component={Login}></Route>
                    <Route history={history} path="/admin/pannel" component={Pannel}></Route>

                    <Redirect from="/" to="/home" />
                </Switch>
            </div>
        )
    }
}

export default withRouter(App as any)
