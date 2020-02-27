import React, { Component } from 'react';
import axios from "axios";
import tokenInterceptor from '../../../middlewares/tokenInterceptor';
import { Redirect } from 'react-router';
import { DEV_URL } from "../../App";
import Input from './Input';
import ImageInput from './ImageInput';
import ICategory from '../../../interfaces/ICategory';
import { FaChevronDown } from "react-icons/fa"
import { FormattedMessage } from 'react-intl';

interface MyProps {

}

interface MyState {
    fileName: string,
    redirect: boolean,
    image: string,
    categories: Array<ICategory>
}

class AddPage extends Component<MyProps, MyState> {

    constructor(props: MyProps) {
        super(props)

        this.state = {
            fileName: "",
            redirect: false,
            image: "",
            categories: []
        }
    }

    componentWillMount() {
        tokenInterceptor()
        axios.get(`${DEV_URL}categories`)
            .then((category) => {
                this.setState({
                    categories: category.data.category
                })
            })
    }

    fileHandler(e: any) {
        this.setState({
            fileName: e.currentTarget.files[0].name
        });
        document.querySelector(".img-label").classList.add("img-label-loaded")
    }

    changeHandler(e: any) {
    }


    submitHandler = (e: any) => {

        e.preventDefault();
        let body = new FormData();

        let data = Array.prototype.filter.call(e.target.elements,
            (input: HTMLInputElement) => {
                if (input.nodeName === 'BUTTON') return false;
                return true;
            });
        Array.prototype.map.call(data, (input: any) => {
            if (input.id === "image") {
                body.append("image", input.files[0]);
                this.setState({
                    image: input.files[0].name
                })
            } else {
                body.append(input.name, input.value);
            }
        });
        axios.post(`http://localhost:3001/api/panel/add`, body)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        redirect: true
                    })
                }
            })
    }

    render() {
        if (this.state.redirect === true) {
            return (
                <Redirect to="/admin"></Redirect>
            )
        }
        return (

            <div className="dish-form__container">
                <div className="dish-form">
                    <div className="dish-form__header">
                        <span>
                            <FormattedMessage id="admin.addPage.header" defaultMessage="Add New Dish" />
                        </span>
                    </div>
                    <form id="form" method="POST" action="/api/panel/add" onSubmit={this.submitHandler} >
                        <fieldset className="row-fieldset">
                            <FormattedMessage id="admin.addPage.name.placeholder" defaultMessage="Name">
                                {(placeholder: string) =>
                                    <Input placeholder={placeholder} name="name" maxLength={20} onChange={(e: any) => this.changeHandler(e)}></Input>
                                }
                            </FormattedMessage>

                            <FormattedMessage id="admin.addPage.engreediants.placeholder" defaultMessage="Engreediants">
                                {(placeholder: string) =>
                                    <Input placeholder={placeholder} name="engreediants" maxLength={150} onChange={(e: any) => this.changeHandler(e)}></Input>
                                }
                            </FormattedMessage>
                        </fieldset>
                        <fieldset className="column-fieldset">

                            <FormattedMessage id="admin.addPage.description.placeholder" defaultMessage="Description">
                                {(placeholder: string) =>
                                    <Input placeholder={placeholder} name="description" maxLength={220} onChange={(e: any) => this.changeHandler(e)}></Input>
                                }
                            </FormattedMessage>

                            <FormattedMessage id="admin.addPage.method.placeholder" defaultMessage="Method">
                                {(placeholder: string) =>
                                    <Input placeholder={placeholder} name="method" maxLength={220} onChange={(e: any) => this.changeHandler(e)}></Input>
                                }
                            </FormattedMessage>

                            <div className="input-container">
                                <label htmlFor="category">
                                    <FormattedMessage id="admin.addPage.category.placeholder" defaultMessage="Category" />
                                </label>
                                <select form="form" name="category" id="category">
                                    {this.state.categories.map((category, i) => {
                                        return (
                                            <option key={category._id} value={category.name}>{category.name}</option>
                                        )
                                    })}
                                </select>
                                <FaChevronDown style={{ position: "absolute", top: "51%", left: "95%", pointerEvents: "none", opacity: "0.7" }} ></FaChevronDown>
                            </div>
                        </fieldset>

                        <div className="img-container">
                            {this.state.fileName ?
                                <img className="dish-img" src={"/" + this.state.fileName} alt="" />
                                : <div></div>
                            }
                        </div>
                        <ImageInput fileName={this.state.fileName} fileHandler={(e: any) => this.fileHandler(e)}></ImageInput>

                        <FormattedMessage id="admin.submit.button" defaultMessage="Submit Changes">
                            {(value: string) =>
                                <input type="submit" value={value} />
                            }
                        </FormattedMessage>
                    </form>
                </div>
            </div>
        )
    }
}


export default AddPage;
