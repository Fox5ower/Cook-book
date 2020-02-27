import React, { Component } from 'react';
import { IconContext } from "react-icons";
import { FaPaperclip } from "react-icons/fa";
import { FormattedMessage } from 'react-intl';

interface MyProps {
    fileName: string,
    fileHandler: Function
}

class ImageInput extends Component<MyProps> {

    render() {
        return (
            <div className="image-input">
                <div className="form-group">
                    <label className="img-label">
                        <IconContext.Provider value={{ size: "1.5em" }}>
                            <FaPaperclip />
                        </IconContext.Provider>
                        <br />
                        <FormattedMessage id="admin.image.input.placeholder" defaultMessage="Load img...">
                            {
                                (placeholder: string) =>
                                    <span className="title">{this.props.fileName ? this.props.fileName : placeholder}</span>
                            }
                        </FormattedMessage>
                        <input type="file" name="image" id="image" onChange={e => { this.props.fileHandler(e) }} />
                    </label>
                </div>
            </div>
        )
    }
}


export default ImageInput;
