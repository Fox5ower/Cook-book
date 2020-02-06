import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import DishDB from './DishDB';
import DefaultBody from './DefaultBody';


class Body extends Component {

    render() {
        return (
            <Switch>
                <Route path="/" component={DishDB}></Route>
                <Route path="/api/admin/pannel/" component={DefaultBody}></Route>
            </Switch>
        )
    }
}


export default Body