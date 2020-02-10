import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from './Header';
import Body from "./Body"
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
                    <Route path="/admin" component={Body}></Route>
                </div>
            )
        } else {
            return (
                <Redirect to="/"></Redirect>
            )
        }
    }
}


export default Pannel