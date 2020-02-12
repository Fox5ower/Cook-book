import React, { Component } from 'react';
import axios from "axios";
import { RouteComponentProps } from "react-router";
import { FaPaperclip } from "react-icons/fa";
import { IconContext } from "react-icons";
import IDish from '../../interfaces/IDish';
import tokenInterceptor from '../../middlewares/tokenInterceptor';

interface MyState {
    dish: IDish,
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
            }
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
            })
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
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
    }

    render() {
        const { name, category, description, engreediants, method } = this.state.dish
        return (
            <div className="edit-form">
                <form id="form" method="POST" action="/api/panel/update/:name" onSubmit={this.submitHandler} >
                    <textarea name="name" id="name" value={name} onChange={this.changeHandler} />
                    <textarea name="category" id="category" value={category} onChange={this.changeHandler} />
                    <textarea name="description" id="description" value={description} onChange={this.changeHandler} />
                    <textarea name="engreediants" id="engreediants" value={engreediants} onChange={this.changeHandler} />
                    <textarea name="method" id="method" value={method} onChange={this.changeHandler} />
                    <div className="image-input">
                        <div className="form-group">
                            <label className="label">
                                <IconContext.Provider value={{ size: "1.5em" }}>
                                    <FaPaperclip />
                                </IconContext.Provider>
                                <br />
                                <span className="title">Load IMG...</span>
                                <input type="file" name="image" id="image" />
                            </label>
                        </div>
                    </div>

                    <input type="submit" value="Submit Changes" />
                </form>
            </div>
        )
    }
}


export default EditPage;
