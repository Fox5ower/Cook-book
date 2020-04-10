import React, { Component, SyntheticEvent } from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import setObject from '../services/localStorage/set.object'
import getObject from '../services/localStorage/get.object'
import StarRatings from 'react-star-ratings'
import axios from 'axios'
import localizeRoute from '../services/localize.route'
import { DEV_URL } from './App'
import tokenInterceptor from '../middlewares/tokenInterceptor'

interface MyProps {
  userName: string,
  token: string,
  name: string
  counter: number
  id: string
  updateLikes: Function
}

interface MyState {
  rating: Number
  action: boolean
  dish_id: string
  user_id: string
}

class DishActions extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props)

    this.state = {
      rating: 0,
      action: false,
      dish_id: this.props.id,
      user_id: localStorage.getItem("user_id") || "",
    }
  }

  async handleClick(e: SyntheticEvent) {
    let promise = new Promise(resolve => {
      resolve(
        this.setState({
          action: !this.state.action
        })
      )
    })
    await promise.then(() => {
      axios
        .post(`${DEV_URL}/api/user/like`, { action: this.state.action, dish_id: this.state.dish_id, user_id: this.state.user_id })
        .then(() => {
          this.props.updateLikes()
        })
    })
  }

  handleRating(newRating: Number) {
    this.setState({
      rating: newRating
    })
    axios
      .post(`${DEV_URL}/api/user/rating`, { rating: newRating, dish_id: this.state.dish_id, user_id: this.state.user_id })
  }

  UNSAFE_componentWillMount() {
    tokenInterceptor();
    axios
      .get(`${DEV_URL}/api/user/rating/${this.props.id}`)
      .then((data) => {
        this.setState({
          rating: data.data.rating || this.state.rating,
          user_id: data.data.user_id || this.state.user_id,
          dish_id: data.data.dish_id || this.state.dish_id
        })
      })
    axios
      .get(`${DEV_URL}/api/user/like/${this.props.id}`)
      .then((data) => {
        this.setState({
          action: data.data.action ? JSON.parse(data.data.action) : this.state.action,
          user_id: data.data.user_id || this.state.user_id,
          dish_id: data.data.dish_id || this.state.dish_id
        })
      })
  }

  render() {
    const { action, rating } = this.state;
    if (this.props.userName && this.props.token) {
      return (
        <div className="dish-actions__container">

          <StarRatings
            rating={rating}
            starRatedColor="rgb(209, 63, 63)"
            starDimension="25px"
            changeRating={this.handleRating.bind(this)}
            starSpacing="3px"
            numberOfStars={5}
            name='rating'
          />

          {action ? (
            <AiFillHeart
              className="favourite-btn-filled"
              onClick={(e: SyntheticEvent) => {
                this.handleClick(e)
              }}
            />
          ) : (
              <AiOutlineHeart
                className="favourite-btn"
                onClick={(e: SyntheticEvent) => {
                  this.handleClick(e)
                }}
              />
            )}
        </div>
      )
    } else {
      return (
        <>
        </>
      )
    }
  }
}

export default DishActions
