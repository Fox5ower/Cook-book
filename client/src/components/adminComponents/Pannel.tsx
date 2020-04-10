import React, { Component } from 'react'
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom'
import Header from './Header'
import DishTable from './adminDishComponents/DishTable'
import AddPage from './adminDishComponents/AddPage'
import EditPage from './adminDishComponents/EditPage'
import AddCategory from './adminDishComponents/AddCategory'
import RemoveCategory from './adminDishComponents/RemoveCategory'
import localizeRoute from '../../services/localize.route'
import config from "../../services/static/default.json";
import axios from "axios";
import { DEV_URL } from '../App'
require("dotenv").config();
const jwt = require('jsonwebtoken')

interface IDecoded {
  id: string
  name: string
  exp: number
}

interface RouteParams {
  isToken: string
}

interface MyState {
  id: string,
  isToken: boolean
}

class Pannel extends Component<RouteComponentProps<RouteParams>, MyState> {
  constructor(props: RouteComponentProps<RouteParams>) {
    super(props)

    this.state = {
      id: '',
      isToken: false
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    let isToken: boolean = false;
    axios
      .post(`${DEV_URL}/admin/login/check`, { token })
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem('token', token)
          this.setState({
            isToken: true,
            id: res.data.id
          })
          isToken = true
        }
      })
  }

  render() {
    if (JSON.parse(new URLSearchParams(this.props.location.search).get("isToken")) === true) {
      const id = new URLSearchParams(this.props.location.search).get("id")
      return (
        <div className="pannel-container">
          <Header id={id} />
          <Switch>
            <Route path={localizeRoute('admin/add')} component={AddPage} />
            <Route
              path={localizeRoute('admin/category')}
              component={AddCategory}
            />
            <Route
              path={localizeRoute('admin/edit/:name')}
              component={EditPage}
            />
            <Route exact path={localizeRoute('admin')} component={DishTable} />
            <Route
              exact
              path={localizeRoute('admin/remove_category')}
              component={RemoveCategory}
            />
          </Switch>
        </div>
      )
    } else {
      return <Redirect to={localizeRoute('login')}></Redirect>
    }
  }
}

export default Pannel
