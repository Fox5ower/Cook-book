import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import DishTable from './adminDishComponents/DishTable';
import AddPage from './adminDishComponents/AddPage';
import EditPage from './adminDishComponents/EditPage';
import AddCategory from './adminDishComponents/AddCategory';
import RemoveCategory from './adminDishComponents/RemoveCategory';
const jwt = require("jsonwebtoken");

interface IDecoded {
    id: string,
    name: string,
    exp: number;
}

interface MyProps {

}

interface MyState {
    id: string
}


class Pannel extends Component<MyProps, MyState> {

    constructor(props: MyProps) {
        super(props)

        this.state = {
            id: ""
        }
    }

    loggedIn(): string {
        const token = this.getToken()
        return this.isToken(token);
    }

    getToken() {
        return localStorage.getItem("token");
    }

    isToken(token: string) {
        const dec = jwt.verify(token, "AdminSecret", (err: Error, decoded: IDecoded) => {
            return decoded || undefined;
        })
        if (dec) {
            if (dec.exp < Date.now() / 1000) {
                return false;
            } else {
                console.log(dec.id)
                return dec.id
            }
        } else {
            return false;
        }
    }


    render() {
        if (typeof this.loggedIn() === "string") {
            const id = this.loggedIn()
            return (
                <div className="pannel-container">
                    <Header id={id} />
                    <Switch>
                        <Route path={"/admin/add"} component={AddPage} />
                        <Route path={"/admin/category"} component={AddCategory} />
                        <Route path={"/admin/edit/:name"} component={EditPage} />
                        <Route exact path={"/admin"} component={DishTable} />
                        <Route exact path={"/admin/remove_category"} component={RemoveCategory} />
                    </Switch>
                </div>
            )
        } else {
            return (
                <Redirect to="/login"></Redirect>
            )
        }
    }
}


export default Pannel