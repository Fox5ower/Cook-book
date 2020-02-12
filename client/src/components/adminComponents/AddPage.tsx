import React, { Component } from 'react';
import axios from "axios";
import { IconContext } from "react-icons";
import { FaPaperclip } from "react-icons/fa";
import tokenInterceptor from '../../middlewares/tokenInterceptor';

class AddPage extends Component {

    componentWillMount() {
        tokenInterceptor()
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
        axios.post(`http://localhost:3001/api/panel/add`, body)
            .then((res) => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div className="edit-form">
                <form id="form" method="POST" action="/api/panel/add" onSubmit={this.submitHandler} >
                    <label htmlFor="name">Name</label>
                    <textarea name="name" id="name" />
                    <label htmlFor="category">Category</label>
                    <textarea name="category" id="category" />
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" />
                    <label htmlFor="engreediants">Engreediants</label>
                    <textarea name="engreediants" id="engreediants" />
                    <label htmlFor="method">Method</label>
                    <textarea name="method" id="method" />

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


export default AddPage;
