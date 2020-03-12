import React, { Component } from 'react'
import SkeletonLoader from 'tiny-skeleton-loader-react'
import SkeletonStyles from '../services/static/preloader.style.json'
import DishActions from './DishActions'

interface MyProps {
  _id: string
  name: string
  category: string
  method: string
  description: string
  engreediants: Array<string>
  image: string
  toggleSlider: Function
  setIndex: Function
  counter: number
}

interface MyState {
  mounting: boolean
}

class MenuItem extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props)

    this.state = {
      mounting: false,
    }
  }

  dynamicBackground = {
    backgroundImage: 'url(' + this.props.image + ')',
  }

  UNSAFE_componentWillMount() {
    this.setState({
      mounting: true,
    })
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        mounting: false,
      })
    })
  }

  render() {
    return (
      <div className="menu__item" style={this.dynamicBackground}>
        <div
          className="clicker"
          style={{ height: '100%', zIndex: 2, cursor: 'pointer' }}
          onClick={() => {
            this.props.toggleSlider()
            this.props.setIndex(this.props.counter)
          }}
        >
          <SkeletonLoader
            style={
              this.state.mounting
                ? SkeletonStyles
                : { display: 'none', transition: 'all .3s' }
            }
          />
          <div className="menu__item__inner-container">
            <div className="memu__item__head-container">
              <span className="menu__item__name">{this.props.name}</span>
              <span className="menu__item__counter">{this.props.counter}</span>
            </div>
            <br />
            <hr />
            <span className="menu__item__description">
              {this.props.description}
            </span>
          </div>
        </div>
        <DishActions name={this.props.name} counter={this.props.counter} />
      </div>
    )
  }
}

export default MenuItem
