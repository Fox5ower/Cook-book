import React, { Component, SyntheticEvent, ButtonHTMLAttributes } from 'react';
import axios from "axios";
import tokenInterceptor from '../../../middlewares/tokenInterceptor';
import { Redirect } from 'react-router';
import { DEV_URL } from "../../App";
import Input from './Input';
import ImageInput from './ImageInput';
import ICategory from '../../../interfaces/ICategory';
import { FaChevronDown } from "react-icons/fa"
import { FormattedMessage } from 'react-intl';
import { IconContext } from 'react-icons';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import localizeRoute from '../../../services/localize.route';

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
        axios.get(`${DEV_URL}/categories`)
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
        let body_en = new FormData();
        let body_ru = new FormData();

        let data = Array.prototype.filter.call(e.target.elements,
            (input: HTMLInputElement) => {
                if (input.nodeName === 'BUTTON') return false;
                return true;
            });
        Array.prototype.map.call(data, (input: any) => {
            if (input.id === "image") {
                body_en.append("image", input.files[0]);
                body_ru.append("image", input.files[0]);
                this.setState({
                    image: input.files[0].name
                })
            } else if (input.name.includes("_en")) {
                body_en.append(input.name.substr(0, input.name.length - 3), input.value);
            } else if (input.name.includes("_ru")) {
                body_ru.append(input.name.substr(0, input.name.length - 3), input.value);
            }
        });

        axios.post(`${DEV_URL}/api/panel/add`, body_en)
            .then(() => {
                axios.post(`${DEV_URL}/api/panel/add`, body_ru)
                    .then((res) => {
                        if (res.status === 200) {
                            this.setState({
                                redirect: true
                            })
                        }
                    })
            })
    }

    sliderHandler(e: SyntheticEvent) {
        e.preventDefault();
        document.querySelector(".ru-fieldset").classList.toggle("ru-showing");
        document.querySelector(".en-fieldset").classList.toggle("en-hiding");
        document.querySelector("#form").classList.toggle("maximize-form")
    }

    render() {
        if (this.state.redirect === true) {
            return (
                <Redirect to={localizeRoute("admin")}></Redirect>
            )
        }
        return (

            <div className="dish-form__container">
                <div className="dish-form">
                    <button id="goLeft" style={{ width: "7%" }} onClick={(e: SyntheticEvent) => this.sliderHandler(e)}>
                        <IconContext.Provider value={{ style: { fontSize: "2em" } }}>
                            <BsChevronCompactLeft />
                        </IconContext.Provider>
                    </button>
                    <button id="goRight" style={{ width: "7%" }} onClick={(e: SyntheticEvent) => this.sliderHandler(e)}>
                        <IconContext.Provider value={{ style: { fontSize: "2em" } }}>
                            <BsChevronCompactRight />
                        </IconContext.Provider>
                    </button>
                    <div className="dish-form__header">
                        <span>
                            <FormattedMessage id="admin.dish.header" defaultMessage="Add New Dish" />
                        </span>
                    </div>
                    <form id="form" method="POST" action="/api/getpanel/add" onSubmit={this.submitHandler} >

                        <fieldset className="en-fieldset">
                            <span>EN</span>
                            <fieldset className="row-fieldset">
                                <FormattedMessage id="admin.dish.name.placeholder" defaultMessage="Name">
                                    {(placeholder: string) =>
                                        <Input placeholder={placeholder} name="name_en" maxLength={20} onChange={(e: any) => this.changeHandler(e)}></Input>
                                    }
                                </FormattedMessage>

                                <FormattedMessage id="admin.dish.engreediants.placeholder" defaultMessage="Engreediants">
                                    {(placeholder: string) =>
                                        <Input placeholder={placeholder} name="engreediants_en" maxLength={150} onChange={(e: any) => this.changeHandler(e)}></Input>
                                    }
                                </FormattedMessage>
                            </fieldset>
                            <fieldset className="column-fieldset">

                                <FormattedMessage id="admin.dish.description.placeholder" defaultMessage="Description">
                                    {(placeholder: string) =>
                                        <Input placeholder={placeholder} name="description_en" maxLength={220} onChange={(e: any) => this.changeHandler(e)}></Input>
                                    }
                                </FormattedMessage>

                                <FormattedMessage id="admin.dish.method.placeholder" defaultMessage="Method">
                                    {(placeholder: string) =>
                                        <Input placeholder={placeholder} name="method_en" maxLength={220} onChange={(e: any) => this.changeHandler(e)}></Input>
                                    }
                                </FormattedMessage>

                                <div className="input-container">
                                    <label htmlFor="category">
                                        <FormattedMessage id="admin.dish.category.placeholder" defaultMessage="Category" />
                                    </label>
                                    <select form="form" name="category_en" id="category">
                                        {this.state.categories.map((category, i) => {
                                            return (
                                                <option key={category._id} value={category.name}>{category.name}</option>
                                            )
                                        })}
                                    </select>
                                    <FaChevronDown style={{ position: "absolute", top: "51%", left: "95%", pointerEvents: "none", opacity: "0.7" }} ></FaChevronDown>
                                </div>
                                <select disabled form="form" name="language_en" id="language">
                                    <option disabled hidden selected value="English">English</option>
                                </select>
                            </fieldset>
                        </fieldset>
                        <fieldset className="ru-fieldset">
                            <span>RU</span>
                            <fieldset className="row-fieldset">
                                <FormattedMessage id="admin.dish.name.placeholder" defaultMessage="Name">
                                    {(placeholder: string) =>
                                        <Input placeholder={placeholder} name="name_ru" maxLength={20} onChange={(e: any) => this.changeHandler(e)}></Input>
                                    }
                                </FormattedMessage>

                                <FormattedMessage id="admin.dish.engreediants.placeholder" defaultMessage="Engreediants">
                                    {(placeholder: string) =>
                                        <Input placeholder={placeholder} name="engreediants_ru" maxLength={150} onChange={(e: any) => this.changeHandler(e)}></Input>
                                    }
                                </FormattedMessage>
                            </fieldset>
                            <fieldset className="column-fieldset">

                                <FormattedMessage id="admin.dish.description.placeholder" defaultMessage="Description">
                                    {(placeholder: string) =>
                                        <Input placeholder={placeholder} name="description_ru" maxLength={220} onChange={(e: any) => this.changeHandler(e)}></Input>
                                    }
                                </FormattedMessage>

                                <FormattedMessage id="admin.dish.method.placeholder" defaultMessage="Method">
                                    {(placeholder: string) =>
                                        <Input placeholder={placeholder} name="method_ru" maxLength={220} onChange={(e: any) => this.changeHandler(e)}></Input>
                                    }
                                </FormattedMessage>

                                <div className="input-container">
                                    <label htmlFor="category">
                                        <FormattedMessage id="admin.dish.category.placeholder" defaultMessage="Category" />
                                    </label>
                                    <select form="form" name="category_ru" id="category">
                                        {this.state.categories.map((category, i) => {
                                            return (
                                                <option key={category._id} value={category.name}>{category.name}</option>
                                            )
                                        })}
                                    </select>
                                    <FaChevronDown style={{ position: "absolute", top: "51%", left: "95%", pointerEvents: "none", opacity: "0.7" }} ></FaChevronDown>
                                </div>
                                <select disabled form="form" name="language_ru" id="language">
                                    <option disabled hidden selected>Russian</option>
                                </select>
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
                        </fieldset>
                    </form>
                </div>
            </div>
        )
    }
}


export default AddPage;
