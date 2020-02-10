import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import DishTable from './DishTable';
import DefaultBody from './DefaultBody';


class Body extends Component {

    render() {
        return (
            <Switch>
                <Route path="/admin" component={DishTable}></Route>
                <Route path="/api/admin/pannel/" component={DefaultBody}></Route>
            </Switch>
        )
    }
}


export default Body