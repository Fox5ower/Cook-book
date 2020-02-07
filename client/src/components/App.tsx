import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import MainPage from "./MainPage";
import Menu from "./Menu";
import Login from "./adminComponents/Login";
import Pannel from "./adminComponents/Pannel";
import DishPage from "./DishPage";



class App extends Component {
    render() {

        return (
            <div className="app">
                <Switch >
                    <Route exact path="/home" component={MainPage}></Route>
                    <Route exact path="/dishes" component={Menu}></Route>
                    <Route path={`/dishes/:id`} component={DishPage} id={this.props.children}></Route>

                    <Route path="/login" component={Login}></Route>
                    <Route path="/admin" component={Pannel}></Route>

                    <Redirect from="/" to="/home" />
                </Switch>
            </div>
        )
    }
}

export default withRouter(App as any)
