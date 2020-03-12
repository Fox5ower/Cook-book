import React, { Component } from 'react'
import IDish from '../interfaces/IDish'
import DishPage from './DishPage'
import { BsChevronCompactLeft } from 'react-icons/bs'
import { BsChevronCompactRight } from 'react-icons/bs'
import { IconContext } from 'react-icons'

interface MyProps {
  initialData: Array<IDish>
  toggleSlider: Function
  index: number
}

interface MyState {
  x: number
  closeDescription: boolean
}

class Slider extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props)
    this.state = {
      x: (this.props.index - 1) * -100,
      closeDescription: false,
    }
  }

  UNSAFE_componentWillMount() {
    document.addEventListener('keydown', (e: any) => {
      if (e.keyCode === 37) {
        this.goLeft()
      } else if (e.keyCode === 39) {
        this.goRight()
      }
    })
  }

  goLeft() {
    new Promise(resolve => {
      resolve(
        this.setState({
          x:
            this.state.x === 0
              ? -100 * (this.props.initialData.length - 1)
              : this.state.x + 100,
          closeDescription: true,
        })
      )
    }).then(() => {
      this.setState({
        closeDescription: false,
      })
    })
  }

  goRight() {
    new Promise(resolve => {
      resolve(
        this.setState({
          x:
            this.state.x === -100 * (this.props.initialData.length - 1)
              ? 0
              : this.state.x - 100,
          closeDescription: true,
        })
      )
    }).then(() => {
      this.setState({
        closeDescription: false,
      })
    })
  }

  render() {
    return (
      <div className="slider">
        {this.props.initialData.map((dish: IDish, i: number) => {
          return (
            <div
              className="slide"
              key={i}
              style={{ transform: `translateX(${this.state.x}%)` }}
            >
              <DishPage
                closeDescription={this.state.closeDescription}
                dish={dish}
                toggleSlider={this.props.toggleSlider.bind(this)}
              ></DishPage>

              <button id="goLeft" onClick={this.goLeft.bind(this)}>
                <IconContext.Provider value={{ size: '3em' }}>
                  <BsChevronCompactLeft />
                </IconContext.Provider>
              </button>
              <button id="goRight" onClick={this.goRight.bind(this)}>
                <IconContext.Provider value={{ size: '3em' }}>
                  <BsChevronCompactRight />
                </IconContext.Provider>
              </button>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Slider
