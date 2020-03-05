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
import localizeRoute from "../services/localize.route";
import toggleLocale from "../services/toggle.locale";
import "../styles/checkbox.scss";

import English from "../languages/en.json";
import Russian from "../languages/ru.json";


export let DEV_URL = "";

let browserLocale = navigator.language;
let locale = browserLocale.substr(0, 2);
let userLocale = localStorage.getItem("locale")
let lang: any;

if (locale === "ru") {
    lang = Russian;
} else {
    lang = English
}

if (process.env.NODE_ENV === "development") {
    DEV_URL = "http://localhost:3001"
    //console.log("DEV_URL: ", DEV_URL)
}


interface MyProps {
    checked: boolean
}


interface MyState {
    checked: boolean,
    location: string
}

class App extends Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props)

        this.state = ({
            checked: userLocale === "ru" ? false : true,
            location: ""
        })
    }
    toggleUserLocale = () => {
        toggleLocale()
        this.setState({
            checked: !this.state.checked
        })
    }

    render() {
        return (
            <IntlProvider locale={locale} messages={this.state.checked ? English : lang}>
                <p>TEST</p>
                <div className="app">
                    <div className="locale-switcher__container">
                        <label htmlFor="locale-switcher" className={`lang-en ${this.state.checked ? "checked" : ""}`}>En</label>
                        <input type="checkbox" className="locale-switcher" id="locale-switcher" checked={this.state.checked} onChange={this.toggleUserLocale}></input>
                        <label htmlFor="locale-switcher" className={`lang-ru ${this.state.checked ? "" : "checked"}`}>Ru</label>
                    </div>
                    <Switch>
                        <Route exact path={localizeRoute("home")} component={MainPage}></Route>
                        <Route exact path={localizeRoute("dishes")} component={Menu}></Route>
                        <Route path={localizeRoute("dishes/:id")} component={DishPage} id={this.props.children}></Route>

                        <Route path={localizeRoute("login")} component={Login}></Route>
                        <Route path={localizeRoute("admin")} component={Pannel}></Route>
                        <Route path={localizeRoute("add")} component={AddPage}></Route>
                        <Route path={localizeRoute("edit/:name")} component={EditPage}></Route>


                        <Redirect exact from={"/"} to={localizeRoute("home")} />
                        <Redirect exact from={localizeRoute("")} to={localizeRoute("home")} />
                    </Switch>
                </div>
            </IntlProvider >
        )
    }
}

export default withRouter(App as any);
