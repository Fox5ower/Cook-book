import React, { Component } from 'react';
import axios from "axios";
import { RouteComponentProps, Redirect } from "react-router";
import IDish from '../../../interfaces/IDish';
import tokenInterceptor from '../../../middlewares/tokenInterceptor';
import Input from './Input';
import ImageInput from './ImageInput';
import ICategory from '../../../interfaces/ICategory';

interface MyState {
    dish: IDish,
    fileName: string,
    redirect: boolean,
    categories: Array<ICategory>
}

class EditPage extends Component<RouteComponentProps<any>, MyState> {

    constructor(props: RouteComponentProps<any>) {
        super(props)

        this.state = {
            dish: {
                _id: "",
                name: "",
                category: "",
                method: "",
                description: "",
                engreediants: [],
                image: {}
            },
            fileName: "",
            redirect: false,
            categories: []
        }

    }

    changeHandler = (e: any) => {
        if (e.target) {
            let target = e.target;
            switch (target.name) {
                case "name": {
                    this.setState(prevState => ({
                        dish: {
                            ...prevState.dish,
                            name: target.value
                        }
                    }))
                    break;
                }
                case "category": {
                    this.setState(prevState => ({
                        dish: {
                            ...prevState.dish,
                            category: target.value
                        }
                    }))
                    break;
                }
                case "description": {
                    this.setState(prevState => ({
                        dish: {
                            ...prevState.dish,
                            description: target.value
                        }
                    }))
                    break;
                }
                case "method": {
                    this.setState(prevState => ({
                        dish: {
                            ...prevState.dish,
                            method: target.value
                        }
                    }))
                    break;
                }
                case "engreediants": {
                    this.setState(prevState => ({
                        dish: {
                            ...prevState.dish,
                            engreediants: target.value
                        }
                    }))
                    break;
                }
                case "image": {
                    this.setState(prevState => ({
                        dish: {
                            ...prevState.dish,
                            image: target.value
                        }
                    }))
                    break;
                }
            }
        }
    }

    componentWillMount() {
        tokenInterceptor()
        console.log(this.props.match.params.name);
        axios.get(`http://localhost:3001/api/panel/edit/${this.props.match.params.name}`)
            .then((dish) => {
                this.setState({
                    dish: dish.data
                })
            }).then(() => axios.get("http://localhost:3001/categories")
                .then((category) => {
                    this.setState({
                        categories: category.data.category
                    })
                }))
    }

    fileHandler(e: any) {
        this.setState({
            fileName: e.currentTarget.files[0].name
        });
        document.querySelector(".label").classList.add("label-loaded");
        document.querySelector(".dish-img").setAttribute("src", "/" + e.currentTarget.files[0].name);
    }

    submitHandler = (e: any) => {

        e.preventDefault();
        let body = new FormData();

        let data = Array.prototype.filter.call(e.target.elements,
            (input: HTMLInputElement) => {
                if (input.nodeName === 'BUTTON') return false;
                return true;
            });
        Array.prototype.map.call(data, (input: HTMLInputElement) => {
            input.id !== 'image' ? body.append(input.name, input.value)
                : body.append('image', input.files[0]);

        });
        axios.put(`http://localhost:3001/api/panel/update/${this.props.match.params.name}`, body)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        dish: {
                            _id: "",
                            name: "",
                            category: "",
                            method: "",
                            description: "",
                            engreediants: [],
                            image: {}
                        },
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
        const { name, category, description, engreediants, method } = this.state.dish
        return (
            <div className="edit-form">
                <span className="form-header">{name}</span>
                <form id="form" method="POST" action="/api/panel/update/:name" onSubmit={this.submitHandler} >
                    <fieldset>
                        <Input name="name" maxLength={20} value={name} onChange={(e: any) => this.changeHandler(e)}></Input>
                        <Input name="description" maxLength={220} value={description} onChange={(e: any) => this.changeHandler(e)}></Input>
                        <Input name="engreediants" maxLength={150} value={engreediants} onChange={(e: any) => this.changeHandler(e)}></Input>
                        <Input name="method" maxLength={220} value={method} onChange={(e: any) => this.changeHandler(e)}></Input>
                        <div className="input-container">
                            <label htmlFor="category">Category</label>
                            <select form="form" name="category" id="category">
                                <option value="" selected disabled hidden>{category}</option>
                                {this.state.categories.map((category, i) => {
                                    return (
                                        <option key={category.key} value={category.key}>{category.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <img className="dish-img" src={this.state.dish.image} alt="dish" />
                        <ImageInput fileName={this.state.fileName} fileHandler={(e: any) => this.fileHandler(e)}></ImageInput>
                    </fieldset>
                    <input type="submit" value="Submit Changes" />


                </form>
            </div>
        )
    }
}


export default EditPage;
