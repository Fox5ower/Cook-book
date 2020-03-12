import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import IDish from '../interfaces/IDish'
import ICategory from '../interfaces/ICategory'
import SearchBar from './SearchBar'
import { DEV_URL } from './App'
import axios from 'axios'
import {
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineFacebook,
  AiFillHeart,
} from 'react-icons/ai'
import { FaVk } from 'react-icons/fa'
import getLocale from '../services/get.locale'
import getObject from '../services/localStorage/get.object'

interface MyProps {
  term: string
  data: Array<IDish>
  update: Function
  initialState: Array<IDish>
}

interface MyState {
  categories: Array<ICategory>
  value: string
  filteredDish: Array<IDish>
  keys: Array<string>
}

class ToolBar extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props)

    this.state = {
      categories: [],
      value: '',
      filteredDish: [],
      keys: Object.keys(localStorage),
    }

    this.favDataSort = this.favDataSort.bind(this)
  }

  UNSAFE_componentWillMount() {
    axios.get(`${DEV_URL}/categories/${getLocale()}`).then(category => {
      this.setState({
        categories: category.data.category,
      })
    })
  }

  resetData(e: any) {
    e.preventDefault()
    this.props.update({
      dishes: this.props.initialState,
    })
    this.setState({
      filteredDish: [],
    })
    let unchoosedArr = document.querySelectorAll('.category')
    if (unchoosedArr) {
      unchoosedArr.forEach(el => {
        el.classList.remove('choosedCategory')
      })
      let favBtn = document.getElementById('favBtn')
      favBtn.classList.remove('choosedCategory')
    }
    this.props.update({
      term: '',
    })
  }

  dataSort = (e: any) => {
    e.preventDefault()
    const value = e.target.name
    const filter = this.props.data.filter((dish: IDish) => {
      return dish.category.includes(value)
    })
    this.setState({
      value: value,
      filteredDish: filter,
    })

    this.props.update({
      dishes: filter,
    })
    let choosedCategory = document.getElementById(e.target.id)

    if (choosedCategory) {
      let unchoosedArr = document.querySelectorAll('.category')
      unchoosedArr.forEach(el => {
        el.classList.remove('choosedCategory')
      })
      let favBtn = document.getElementById('favBtn')
      favBtn.classList.remove('choosedCategory')
      choosedCategory.classList.add('choosedCategory')
    }
  }

  favDataSort(e: any) {
    e.preventDefault()
    new Promise(resolve => {
      resolve(
        this.setState({
          keys: Object.keys(localStorage),
        })
      )
    }).then(() => {
      const filter = this.props.data.filter((dish: IDish) => {
        let storageObject = getObject(dish.name)
        if (storageObject) {
          if (
            storageObject['isFavourite'] !== null &&
            storageObject['isFavourite'] !== false
          )
            return this.state.keys.includes(dish.name) ? dish.name : undefined
        }
      })
      this.setState({
        filteredDish: filter,
      })

      this.props.update({
        dishes: filter,
      })

      let favBtn = document.getElementById('favBtn')

      if (favBtn) {
        let unchoosedArr = document.querySelectorAll('.category')
        unchoosedArr.forEach(el => {
          el.classList.remove('choosedCategory')
        })
        favBtn.classList.add('choosedCategory')
      }
    })
  }

  render() {
    return (
      <>
        <div className="navbar__header">
          <FormattedMessage id="dishes.header" defaultMessage="Dish List" />
        </div>
        <div className="nav-container">
          <div className="search">
            <SearchBar
              term={this.props.term}
              data={this.props.data}
              update={this.props.update}
              filteredDish={this.state.filteredDish}
            />
            <div className="line-divider"></div>
          </div>

          <div className="category-container">
            {this.state.categories.map((category: ICategory, i: number) => {
              return (
                <button
                  key={category._id}
                  className="category"
                  onClick={this.dataSort}
                  id={category._id}
                  name={category.name}
                >
                  {category.name}
                </button>
              )
            })}
          </div>
          <button
            id="favBtn"
            className="favourites"
            onClick={this.favDataSort}
            style={{
              borderTop: '1px solid white',
              borderBottom: '1px solid white',
            }}
          >
            <FormattedMessage
              id="dishes.favourite"
              defaultMessage="Favourites"
            />
            <AiFillHeart className="favourite-btn-filled" />
          </button>
          <button
            className="reset-button"
            onClick={(e: any) => this.resetData(e)}
          >
            <FormattedMessage
              id="dishes.reset.button"
              defaultMessage="Reset Filters"
            />
          </button>
        </div>
        <div className="socials-container">
          <AiOutlineInstagram></AiOutlineInstagram>
          <AiOutlineTwitter></AiOutlineTwitter>
          <AiOutlineFacebook></AiOutlineFacebook>
          <FaVk></FaVk>
        </div>
      </>
    )
  }
}

export default ToolBar
