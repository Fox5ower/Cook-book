import React, { Component } from 'react';
import axios from "axios";
import tokenInterceptor from '../../../middlewares/tokenInterceptor';
import { Redirect } from 'react-router';
import Input from './Input';
import ImageInput from './ImageInput';
import ICategory from '../../../interfaces/ICategory';
import { FaChevronDown } from "react-icons/fa"

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
        axios.get("http://localhost:3001/categories")
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
                        <span>Add New Dish</span>
                    </div>
                    <form id="form" method="POST" action="/api/panel/add" onSubmit={this.submitHandler} >
                        <fieldset className="row-fieldset">
                            <Input name="name" maxLength={20} onChange={(e: any) => this.changeHandler(e)}></Input>
                            <Input name="engreediants" maxLength={150} onChange={(e: any) => this.changeHandler(e)}></Input>
                        </fieldset>
                        <fieldset className="column-fieldset">
                            <Input name="description" maxLength={220} onChange={(e: any) => this.changeHandler(e)}></Input>
                            <Input name="method" maxLength={220} onChange={(e: any) => this.changeHandler(e)}></Input>
                            <div className="input-container">
                                <label htmlFor="category">Category</label>
                                <select form="form" name="category" id="category">
                                    {this.state.categories.map((category, i) => {
                                        return (
                                            <option key={category.key} value={category.key}>{category.name}</option>
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

                        <input type="submit" value="Submit Changes" />
                    </form>
                </div>
            </div>
        )
    }
}


export default AddPage;
