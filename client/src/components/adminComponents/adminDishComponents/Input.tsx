import React, { Component } from 'react'

interface MyProps {
  name: string
  placeholder?: string
  maxLength: number
  value?: string | Array<string>
  onChange?: Function
}

class Input extends Component<MyProps> {
  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  render() {
    return (
      <div className="input-container">
        <textarea
          maxLength={this.props.maxLength}
          name={this.props.name}
          id={this.props.name}
          value={this.props.value}
          onChange={(e: any) => this.props.onChange(e)}
          required
        />
        <label className="label" htmlFor={this.props.name}>
          {this.props.placeholder
            ? this.props.placeholder
            : this.capitalizeFirstLetter(this.props.name)}
        </label>
      </div>
    )
  }
}

export default Input
