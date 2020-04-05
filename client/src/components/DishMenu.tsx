import React, { Component } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import IDish from '../interfaces/IDish'
import { DEV_URL } from './App'
import ToolBar from './ToolBar'
import MenuItem from './MenuItem'
import Slider from './Slider'
import SkeletonLoader from 'tiny-skeleton-loader-react'
import SkeletonStyles from '../services/static/preloader.style.json'
import getLocale from '../services/get.locale'
import localizeRoute from "../services/localize.route"
import '../styles/dish-menu.scss'
import AuthModal from './userAuthComponents/AuthModal'
import DishMenuUserActions from "./DishMenuUserActions"

interface MyProps {
  dishes: Array<IDish>
}

interface MyState {
  dishes: Array<IDish>,
  term: string,
  showSlider: boolean,
  index: number,
  showNav: boolean,
  mounting: boolean,
  isOpened: boolean,
  initiator: string,
  userName: string,
  token: string
}

class Menu extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props)

    this.initialData = []

    this.state = {
      dishes: [],
      term: '',
      showSlider: false,
      index: undefined,
      showNav: true,
      mounting: false,
      isOpened: false,
      initiator: '',
      userName: localStorage.getItem("user") || "",
      token: localStorage.getItem("token") || ""
    }
  }

  initialData: Array<IDish>

  updateData(config: MyState) {
    this.setState(config)
  }

  toggleSlider() {
    this.setState({
      showSlider: !this.state.showSlider,
    })
  }

  setIndex(index: number) {
    this.setState({
      index: index,
    })
  }

  toggleNav() {
    this.setState({
      showNav: !this.state.showNav,
    })
  }

  toggleModal(name: string | null) {
    if (name) {
      this.setState({
        isOpened: !this.state.isOpened,
        initiator: name
      })
    } else {
      this.setState({
        isOpened: !this.state.isOpened,
      })
    }
  }

  update(config: MyState) {
    this.setState(config);
  }

  UNSAFE_componentWillMount() {
    const userName = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (userName && localStorage.getItem("token")) {
      this.setState({
        userName: userName,
        token: token
      })
    }

    this.setState({
      mounting: true,
    })
    axios.get(`${DEV_URL}/getdishes/${getLocale()}`).then(dishes => {
      this.initialData = dishes.data.dish

      this.setState({
        dishes: this.initialData,
      })
    })
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.setState({
        mounting: false,
      })
    })
  }

  render() {
    const { dishes, isOpened } = this.state
    if (!this.state.showSlider) {
      return (
        <>
          <div className="menu-page-container">
            <div
              className="nav-wrapper"
              style={
                window.innerWidth > 1064
                  ? this.state.showNav
                    ? { margin: '0 0 0 0', visibility: 'visible' }
                    : {}
                  : this.state.showNav
                    ? { top: '0', visibility: 'visible', opacity: '1' }
                    : {}
              }
            >
              <span
                className={`close ${!this.state.showNav ? 'close-unshown' : ''}`}
                onClick={() => this.toggleNav()}
              ></span>
              <span
                className="open"
                style={
                  this.state.showNav ? { opacity: '0', visibility: 'hidden' } : {}
                }
                onClick={() => this.toggleNav()}
              ></span>
              <div className="navbar-container">
                <SkeletonLoader
                  style={
                    this.state.mounting
                      ? SkeletonStyles
                      : { display: 'none', opacity: '0', transition: 'all .3s' }
                  }
                  height="100%"
                />
                <ToolBar
                  term={this.state.term}
                  data={this.initialData}
                  update={this.updateData.bind(this)}
                  initialState={this.initialData}
                />
              </div>
            </div>
            <div className="menu__container">
              <DishMenuUserActions toggleModal={this.toggleModal.bind(this)} name={this.state.userName} token={this.state.token} />
              {dishes.map((dish, i) => (
                <MenuItem
                  key={dish._id}
                  _id={dish._id}
                  name={dish.name}
                  category={dish.category}
                  method={dish.method}
                  description={dish.description}
                  engreediants={dish.engreediants}
                  image={dish.image}
                  toggleSlider={this.toggleSlider.bind(this)}
                  counter={i + 1}
                  setIndex={this.setIndex.bind(this)}
                ></MenuItem>
              ))}
              <div className="menu-margin"></div>
            </div>
          </div>
          <AuthModal isOpened={isOpened} initiator={this.state.initiator} toggleModal={this.toggleModal.bind(this)} update={this.update.bind(this)}>
          </AuthModal>
        </>
      )
    } else if (this.state.showSlider && this.state.index) {
      return (
        <Slider
          initialData={this.state.dishes}
          toggleSlider={this.toggleSlider.bind(this)}
          index={this.state.index}
        ></Slider>
      )
    }
  }
}

export default Menu
