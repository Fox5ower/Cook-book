import React, { Component } from 'react';
import { IconContext } from "react-icons";
import { FaPaperclip } from "react-icons/fa";

interface MyProps {
    fileName: string,
    fileHandler: Function
}

class ImageInput extends Component<MyProps> {

    constructor(props: MyProps) {
        super(props)

    }

    capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        return (
            <div className="image-input">
                <div className="form-group">
                    <label className="label">
                        <IconContext.Provider value={{ size: "1.5em" }}>
                            <FaPaperclip />
                        </IconContext.Provider>
                        <br />
                        <span className="title">{this.props.fileName ? this.props.fileName : "Load IMG..."}</span>
                        <input type="file" name="image" id="image" onChange={e => { this.props.fileHandler(e) }} />
                    </label>
                </div>
            </div>
        )
    }
}


export default ImageInput;
