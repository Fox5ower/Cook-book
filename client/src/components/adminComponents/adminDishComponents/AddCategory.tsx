import React, { Component } from 'react'
import axios from 'axios'
import { DEV_URL } from '../../App'
import tokenInterceptor from '../../../middlewares/tokenInterceptor'
import { Redirect } from 'react-router'
import Input from './Input'
import ICategory from '../../../interfaces/ICategory'
import { FormattedMessage } from 'react-intl'

interface MyProps {}

interface MyState {
  redirect: boolean
  categories: Array<ICategory>
  name: string
}

class AddCategory extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props)

    this.state = {
      redirect: false,
      categories: [],
      name: '',
    }
  }

  UNSAFE_componentWillMount() {
    tokenInterceptor()
  }

  changeHandler = (e: any) => {
    if (e.target) {
      let target = e.target
      this.setState({
        name: target.value,
      })
    }
  }

  submitHandler = (e: any) => {
    e.preventDefault()

    axios
      .post(`${DEV_URL}/api/panel/add_category`, { name: this.state.name })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            redirect: true,
          })
        } else {
          alert(JSON.stringify(res.data))
        }
      })
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/admin"></Redirect>
    }
    const { name } = this.state
    return (
      <div className="dish-form__container">
        <div className="dish-form">
          <div className="dish-form__header">
            <span>
              <FormattedMessage
                id="admin.addCat.header"
                defaultMessage="Add New Category"
              />
            </span>
          </div>
          <form id="form" method="POST" onSubmit={this.submitHandler}>
            <fieldset className="row-fieldset">
              <FormattedMessage
                id="admin.category.input.placeholder"
                defaultMessage="Name"
              >
                {(placeholder: string) => (
                  <Input
                    placeholder={placeholder}
                    name="name"
                    maxLength={20}
                    value={name}
                    onChange={(e: any) => this.changeHandler(e)}
                  ></Input>
                )}
              </FormattedMessage>
            </fieldset>
            <FormattedMessage
              id="admin.submit.button"
              defaultMessage="Submit Changes"
            >
              {(value: string) => <input type="submit" value={value} />}
            </FormattedMessage>
          </form>
        </div>
      </div>
    )
  }
}

export default AddCategory
