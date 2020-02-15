import React, { Component } from 'react';
import axios from "axios";
import tokenInterceptor from '../../../middlewares/tokenInterceptor';
import { Redirect } from 'react-router';
import Input from './Input';
import ImageInput from './ImageInput';

interface MyProps {

}

interface MyState {
    fileName: string,
    redirect: boolean,
    image: string
}

class AddPage extends Component<MyProps, MyState> {

    constructor(props: MyProps) {
        super(props)

        this.state = {
            fileName: "",
            redirect: false,
            image: ""
        }
    }

    componentWillMount() {
        tokenInterceptor()
    }

    fileHandler(e: any) {
        this.setState({
            fileName: e.currentTarget.files[0].name
        });
        document.querySelector(".label").classList.add("label-loaded")
    }

    changeHandler(e: any) {
        if (e.target.value.length = e.target.value.maxLength) {
            e.target.classList.add("input-max-size")
        }
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
            if (input.id === "image") {
                body.append("image", input.files[0]);
                this.setState({
                    image: input.files[0].name
                })
            } else {
                body.append(input.name, input.value)
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
            <div className="edit-form">
                <span>Add New Dish</span>
                <form id="form" method="POST" action="/api/panel/add" onSubmit={this.submitHandler} >
                    <fieldset>
                        <Input name="name" maxLength={20}></Input>
                        <Input name="category" maxLength={15}></Input>
                        <Input name="description" maxLength={220}></Input>
                        <Input name="engreediants" maxLength={150}></Input>
                        <Input name="method" maxLength={220}></Input>

                        {this.state.fileName ?
                            <img className="dish-img" src={"/" + this.state.fileName} alt="" />
                            : <i />
                        }

                        <ImageInput fileName={this.state.fileName} fileHandler={(e: any) => this.fileHandler(e)}></ImageInput>

                        <input type="submit" value="Submit Changes" />
                    </fieldset>
                </form>
            </div>
        )
    }
}


export default AddPage;
