import React, { Component, ChangeEvent } from 'react';

interface MyProps {
    name: string,
    maxLength: number,
    value?: string | Array<string>,
    onChange?: any | null
}

class Input extends Component<MyProps> {

    constructor(props: MyProps) {
        super(props)

    }

    capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        return (
            <div className="input-container">
                <label htmlFor={this.props.name}>{this.capitalizeFirstLetter(this.props.name)}</label>
                <textarea maxLength={this.props.maxLength} name={this.props.name} id={this.props.name} value={this.props.value} onChange={e => this.props.onChange(e)} />
            </div>
        )
    }
}


export default Input;
