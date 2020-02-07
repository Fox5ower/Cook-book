import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from './Header';
import Body from "./Body"
const jwt = require("jsonwebtoken");

interface IDecoded {
    exp: number;
}

class Pannel extends Component {

    loggedIn() {
        const token = this.getToken()
        return !!token && this.isToken(token);
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
                console.log("decoded exp < date should redir");
                return false;
            } else {
                console.log("decoded ok");
                return true
            }
        } else {
            return false;
        }

    }


    render() {
        if (this.loggedIn()) {
            return (
                <div className="pannel-container">
                    <Header />
                    <Route path="/admin" component={Body}></Route>
                </div>

            )
        } else {
            console.log("We are going home");
            return (

                <Redirect to="/"></Redirect>

            )

        }

    }
}


export default Pannel