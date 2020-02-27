import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { IntlProvider } from 'react-intl';
import MainPage from "./MainPage";
import Menu from "./DishMenu";
import Login from "./adminComponents/Login";
import Pannel from "./adminComponents/Pannel";
import DishPage from "./DishPage";
import AddPage from "./adminComponents/adminDishComponents/AddPage";
import EditPage from "./adminComponents/adminDishComponents/EditPage";

import English from "../languages/en.json";
import Russian from "../languages/ru.json";

let locale = navigator.language;
export let DEV_URL = "";

let lang: any;

if (locale === "ru-RU") {
    lang = Russian;
} else {
    lang = English
}

if (process.env.NODE_ENV === "development") {
    DEV_URL = "http://localhost:3001/"
    console.log("DEV_URL: ", DEV_URL)
}

class App extends Component {
    render() {

        return (
            <IntlProvider locale={locale} messages={lang}>
                <div className="app">
                    <Switch >
                        <Route exact path="/home" component={MainPage}></Route>
                        <Route exact path="/dishes" component={Menu}></Route>
                        <Route path={`/dishes/:id`} component={DishPage} id={this.props.children}></Route>

                        <Route path="/login" component={Login}></Route>
                        <Route path="/admin" component={Pannel}></Route>
                        <Route path="/add" component={AddPage}></Route>
                        <Route path="/edit/:name" component={EditPage}></Route>

                        <Redirect from="/" to="/home" />
                    </Switch>
                </div>
            </IntlProvider>
        )
    }
}

export default withRouter(App as any);
