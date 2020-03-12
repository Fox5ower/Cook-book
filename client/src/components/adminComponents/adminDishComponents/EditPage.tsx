import React, { Component } from 'react'
import axios from 'axios'
import { DEV_URL } from '../../App'
import { RouteComponentProps, Redirect } from 'react-router'
import IDish from '../../../interfaces/IDish'
import tokenInterceptor from '../../../middlewares/tokenInterceptor'
import Input from './Input'
import ImageInput from './ImageInput'
import ICategory from '../../../interfaces/ICategory'
import { FaChevronDown } from 'react-icons/fa'
import { FormattedMessage } from 'react-intl'
import localizeRoute from '../../../services/localize.route'

interface MyState {
  dish: IDish
  fileName: string
  redirect: boolean
  categories: Array<ICategory>
}

class EditPage extends Component<RouteComponentProps<any>, MyState> {
  constructor(props: RouteComponentProps<any>) {
    super(props)

    this.state = {
      dish: {
        _id: '',
        name: '',
        category: '',
        method: '',
        description: '',
        engreediants: [],
        language: '',
        image: {},
      },
      fileName: '',
      redirect: false,
      categories: [],
    }
  }

  changeHandler = (e: any) => {
    if (e.target) {
      let target = e.target
      switch (target.name) {
        case 'name': {
          this.setState(prevState => ({
            dish: {
              ...prevState.dish,
              name: target.value,
            },
          }))
          break
        }
        case 'category': {
          this.setState(prevState => ({
            dish: {
              ...prevState.dish,
              category: target.value,
            },
          }))
          break
        }
        case 'description': {
          this.setState(prevState => ({
            dish: {
              ...prevState.dish,
              description: target.value,
            },
          }))
          break
        }
        case 'method': {
          this.setState(prevState => ({
            dish: {
              ...prevState.dish,
              method: target.value,
            },
          }))
          break
        }
        case 'engreediants': {
          this.setState(prevState => ({
            dish: {
              ...prevState.dish,
              engreediants: target.value,
            },
          }))
          break
        }
        case 'language': {
          this.setState(prevState => ({
            dish: {
              ...prevState.dish,
              language: target.value,
            },
          }))
          break
        }
        case 'image': {
          this.setState(prevState => ({
            dish: {
              ...prevState.dish,
              image: target.value,
            },
          }))
          break
        }
      }
    }
  }

  UNSAFE_componentWillMount() {
    tokenInterceptor()
    axios
      .get(`${DEV_URL}/api/panel/edit/${this.props.match.params.name}`)
      .then(dish => {
        this.setState({
          dish: dish.data,
        })
      })
      .then(() =>
        axios.get(`${DEV_URL}/categories`).then(category => {
          this.setState({
            categories: category.data.category,
          })
        })
      )
  }

  fileHandler(e: any) {
    this.setState({
      fileName: e.currentTarget.files[0].name,
    })
    document.querySelector('.label').classList.add('label-loaded')
    document
      .querySelector('.dish-img')
      .setAttribute('src', '/' + e.currentTarget.files[0].name)
  }

  submitHandler = (e: any) => {
    e.preventDefault()
    let body = new FormData()

    let data = Array.prototype.filter.call(
      e.target.elements,
      (input: HTMLInputElement) => {
        if (input.nodeName === 'BUTTON') return false
        return true
      }
    )
    Array.prototype.map.call(data, (input: HTMLInputElement) => {
      input.id !== 'image'
        ? body.append(input.name, input.value)
        : body.append('image', input.files[0])
    })
    axios
      .put(`${DEV_URL}/api/panel/update/${this.props.match.params.name}`, body)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            dish: {
              _id: '',
              name: '',
              category: '',
              method: '',
              description: '',
              engreediants: [],
              language: '',
              image: {},
            },
            redirect: true,
          })
        }
      })
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to={localizeRoute("admin")}></Redirect>
    }
    const {
      name,
      category,
      description,
      engreediants,
      language,
      method,
    } = this.state.dish
    return (
      <div className="dish-form__container">
        <div className="dish-form">
          <div className="dish-form__header">
            <span>{name}</span>
          </div>
          <form
            id="form"
            method="POST"
            action="/api/getpanel/update/:name"
            onSubmit={this.submitHandler}
          >
            <fieldset className="row-fieldset">
              <FormattedMessage
                id="admin.dish.name.placeholder"
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
              <FormattedMessage
                id="admin.dish.engreediants.placeholder"
                defaultMessage="Engredients"
              >
                {(placeholder: string) => (
                  <Input
                    placeholder={placeholder}
                    name="engreediants"
                    maxLength={150}
                    value={engreediants}
                    onChange={(e: any) => this.changeHandler(e)}
                  ></Input>
                )}
              </FormattedMessage>
            </fieldset>
            <fieldset className="column-fieldset">
              <FormattedMessage
                id="admin.dish.description.placeholder"
                defaultMessage="Description"
              >
                {(placeholder: string) => (
                  <Input
                    placeholder={placeholder}
                    name="description"
                    maxLength={220}
                    value={description}
                    onChange={(e: any) => this.changeHandler(e)}
                  ></Input>
                )}
              </FormattedMessage>
              <FormattedMessage
                id="admin.dish.method.placeholder"
                defaultMessage="Method"
              >
                {(placeholder: string) => (
                  <Input
                    placeholder={placeholder}
                    name="method"
                    maxLength={220}
                    value={method}
                    onChange={(e: any) => this.changeHandler(e)}
                  ></Input>
                )}
              </FormattedMessage>

              <div className="input-container">
                <label htmlFor="category">
                  <FormattedMessage
                    id="admin.dish.category.placeholder"
                    defaultMessage="Category"
                  />
                </label>
                <select form="form" name="category" id="category">
                  <option value="none" disabled hidden selected>
                    {category}
                  </option>
                  {this.state.categories.map(category => {
                    return (
                      <option key={category._id} value={category.name}>
                        {category.name}
                      </option>
                    )
                  })}
                </select>
                <FaChevronDown
                  style={{
                    position: 'absolute',
                    top: '51%',
                    left: '95%',
                    pointerEvents: 'none',
                    opacity: '0.7',
                  }}
                ></FaChevronDown>
              </div>
              <select disabled form="form" name="language" id="language">
                <option disabled hidden selected value={language}>
                  {language}
                </option>
              </select>
            </fieldset>

            <img className="dish-img" src={this.state.dish.image} alt="dish" />
            <ImageInput
              fileName={this.state.fileName}
              fileHandler={(e: any) => this.fileHandler(e)}
            ></ImageInput>

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

export default EditPage
